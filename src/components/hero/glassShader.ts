/*
 * 히어로 전체를 그리는 셰이더 하나: 뒤의 오로라와, 그 앞에 떠 있는 유리 로고.
 *
 * 로고는 메시가 아니라 거리장(SDF)입니다. 그래서 "I"에서 "iN"으로 펼쳐지는 동안에도
 * 부품끼리 둥글게 녹아 붙고, 접히거나 이음매가 생기지 않습니다.
 * 유리는 같은 셰이더 안에서 오로라를 직접 굴절시키므로, 유리 너머로 실제 배경이 비칩니다.
 *
 * 2D 로고 좌표는 SVG와 같이 512 기준, y축이 아래로 향합니다.
 */

export const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform vec2 uResolution;
  uniform float uTanHalfFov;
  uniform vec3 uCamPos;
  uniform float uPlaneZ;
  uniform float uPlaneH;

  uniform float uTime;
  uniform float uFade;
  uniform vec3 uPaper;
  uniform vec3 uColors[4];

  uniform mat4 uModel;
  uniform mat4 uInvModel;
  uniform float uScale;
  uniform float uHigh;

  // 모프 상태 (JS에서 미리 계산한 값)
  uniform float uLx;
  uniform float uRx;
  uniform float uTop;
  uniform vec2 uMc;
  uniform vec2 uMrot;
  uniform float uMhl;
  uniform float uMr;
  uniform float uDc;
  uniform vec2 uDot;
  uniform float uKj;
  uniform float uKl;
  uniform float uKd;

  uniform vec2 uFilm;
  uniform float uFilmRot;

  const float KB = 47.0;   // 위아래 끝 모서리 (반지름 약 40)
  const float KC = 54.0;   // 점 둘레 곡선이 기둥과 만나는 모서리 (약 46)
  const float DEPTH = 72.0; // 두께의 절반
  const float BEVEL = 30.0; // 앞뒤 가장자리 둥글기
  const float IOR = 1.5;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  // ── 오로라 ─────────────────────────────────────────────

  // 네 색 사이를 부드럽게 오가는 고리 팔레트. 가중치의 합은 항상 1입니다.
  vec3 palette(float t) {
    t = fract(t) * 4.0;
    vec3 c = vec3(0.0);
    for (int k = 0; k < 4; k++) {
      float d = abs(t - float(k));
      d = min(d, 4.0 - d);
      c += uColors[k] * smoothstep(1.0, 0.0, d);
    }
    return c;
  }

  // 아래쪽은 또렷하고 위로는 길게 번지는 오로라 커튼 한 줄
  float curtain(float d, float lower, float upper) {
    return d < 0.0 ? exp(-d * d / (lower * lower)) : exp(-d / upper);
  }

  // p: 오로라 판 위의 좌표 (화면 높이가 1). detail이 낮으면 빛줄기가 흐려져 유리 너머가 부드러워집니다.
  vec3 aurora(vec2 p, float detail) {
    float aspect = uResolution.x / uResolution.y;
    float t = uTime;

    float w1 = 0.07 * sin(p.x * 2.6 + t * 0.12)
      + 0.03 * sin(p.x * 5.3 - t * 0.09 + 1.7)
      + 0.08 * (fbm(vec2(p.x * 1.2 + t * 0.02, t * 0.013)) - 0.5);
    float d1 = p.y - (0.04 - p.x * 0.16 + w1);
    float rays1 = mix(0.72, 0.45 + 0.55 * fbm(vec2(p.x * 7.0 + t * 0.05, d1 * 1.2 - t * 0.04)), detail);
    float band1 = curtain(d1, 0.05, 0.11) * rays1;

    float w2 = 0.04 * sin(p.x * 2.9 - t * 0.1 + 2.3)
      + 0.06 * (fbm(vec2(p.x * 1.5 - t * 0.017, 4.0 + t * 0.011)) - 0.5);
    float d2 = p.y - (-0.12 + p.x * 0.12 + w2);
    float rays2 = mix(0.7, 0.4 + 0.6 * fbm(vec2(p.x * 8.0 - t * 0.04 + 11.0, d2 * 1.4 - t * 0.05)), detail);
    float band2 = curtain(d2, 0.04, 0.08) * rays2;

    vec2 q = p / vec2(0.62, 0.34);
    float wash = exp(-dot(q, q) * 1.6);

    float cycle = t * 0.016;
    vec3 c1 = palette(cycle + p.x * 0.16);
    vec3 c2 = palette(cycle + 0.45 - p.x * 0.12);
    // 로고 뒤 빛은 비스듬히 흐르는 여러 색이라, 유리 속이 홀로그램처럼 갈립니다.
    vec3 c3 = palette(cycle + 0.22 + p.x * 0.55 - p.y * 0.4);

    // 바깥으로 갈수록 0, 화면 가장자리에서는 정확히 종이색이 됩니다.
    float e = length(p / vec2(aspect * 0.5, 0.5));
    float edge = 1.0 - smoothstep(0.3, 1.0, e);
    float sideFade = 1.0 - smoothstep(0.2, 0.9, abs(p.x) / (aspect * 0.5));

    vec3 glow = (c1 * band1 * 0.38 + c2 * band2 * 0.26) * sideFade + c3 * wash * 0.2;
    return glow * edge * uFade;
  }

  // 시선(또는 굴절된 빛)이 오로라 판에 닿는 자리
  vec3 background(vec3 ro, vec3 rd, float detail) {
    if (rd.z > -1e-3) return uPaper;
    float t = (uPlaneZ - ro.z) / rd.z;
    vec2 p = (ro + rd * t).xy / uPlaneH;
    return uPaper + aurora(p, detail);
  }

  // ── 로고 거리장 ─────────────────────────────────────────

  float smin(float a, float b, float k) {
    k = max(k, 1e-4);
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
  }

  float smax(float a, float b, float k) {
    return -smin(-a, -b, k);
  }

  float sdBox(vec2 p, vec2 c, vec2 h) {
    vec2 q = abs(p - c) - h;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
  }

  float sdRoundBox(vec2 p, vec2 h, float r) {
    vec2 q = abs(p) - h + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  /*
   * 왼쪽 기둥(L), 대각선(M), 오른쪽 기둥(R), 점(dot).
   * 위아래 끝은 부품마다 먼저 잘라 둥글리고(KB), 안쪽 모서리만 부드럽게 이어 붙입니다(uKj).
   * 점 둘레 곡선은 Lottie처럼 큰 원으로 L과 M만 도려냅니다.
   */
  float logo2(vec2 q) {
    float slab = abs(q.y - 256.0) - 256.0;

    float L = smax(sdBox(q, vec2(uLx, 250.0), vec2(64.0, 550.0)), slab, KB);

    vec2 m = q - uMc;
    m = vec2(uMrot.x * m.x - uMrot.y * m.y, uMrot.y * m.x + uMrot.x * m.y);
    float M = sdRoundBox(m, vec2(64.0, uMhl), uMr);
    M = smax(M, slab, KB);
    M = smax(M, q.x - (uRx + 64.0), KB);
    M = smax(M, -q.x, KB);

    float R = smax(sdBox(q, vec2(uRx, 250.0), vec2(64.0, 550.0)), slab, KB);

    // 위아래 끝 가까이에서는 이어 붙이지 않습니다. 대각선 끝이 기둥 끝선과 겹치는 곳이라,
    // 부드럽게 붙이면 Lottie의 트랙매트가 가리던 대각선 끝이 불룩 튀어나옵니다.
    float kj = uKj * clamp((440.0 - q.y) / 40.0, 0.0, 1.0) * clamp((q.y - uTop - 60.0) / 40.0, 0.0, 1.0);

    float lm = smin(L, M, kj);
    lm = smax(lm, uTop - q.y, uKl);
    lm = smax(lm, 128.0 - length(q - vec2(uDc)), KC);

    float body = smin(lm, R, kj);
    float dot2 = length(q - uDot) - 64.0;
    return smin(body, dot2, uKd);
  }

  // 물체 공간(로고 한 변이 1)에서 둥근 모서리로 압출한 거리장
  float sdf(vec3 p) {
    vec2 q = vec2(p.x * 512.0 + 256.0, 256.0 - p.y * 512.0);
    float d = logo2(q);
    vec2 w = vec2(d + BEVEL, abs(p.z) * 512.0 - DEPTH + BEVEL);
    return (min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - BEVEL) / 512.0;
  }

  vec3 normalAt(vec3 p) {
    const vec2 k = vec2(1.0, -1.0);
    const float h = 0.0015;
    return normalize(
      k.xyy * sdf(p + k.xyy * h) +
      k.yyx * sdf(p + k.yyx * h) +
      k.yxy * sdf(p + k.yxy * h) +
      k.xxx * sdf(p + k.xxx * h)
    );
  }

  // ── 조명: 어두운 스튜디오의 넓고 흐린 판 조명들 ──────────────

  // 원점을 바라보는 판 조명. pos 방향 평면 위에서 판 모양을 부드럽게 잽니다.
  float panel(vec3 d, vec3 pos, vec2 size, float shape, float feather) {
    vec3 c = normalize(pos);
    float dc = dot(d, c);
    if (dc <= 0.0) return 0.0;
    vec3 local = d * (length(pos) / dc) - pos;
    vec3 x = normalize(cross(vec3(0.0, 1.0, 0.0), -c));
    vec3 y = cross(-c, x);
    vec2 uv = vec2(dot(local, x), dot(local, y));
    float sd;
    if (shape < 0.5) {
      vec2 q = abs(uv) - size * 0.5;
      sd = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
    } else if (shape < 1.5) {
      sd = length(uv) - size.x;
    } else {
      sd = abs(length(uv) - (size.x + size.y) * 0.5) - (size.y - size.x) * 0.5;
    }
    return 1.0 - smoothstep(-feather, feather, sd);
  }

  // 위가 조금 밝은 옅은 바탕빛이 있어서, 비스듬한 옆면이 새까만 크롬처럼 보이지 않습니다.
  vec3 env(vec3 d) {
    vec3 c = mix(vec3(0.014, 0.016, 0.024), vec3(0.05, 0.055, 0.07), d.y * 0.5 + 0.5);
    c += vec3(1.3) * panel(d, vec3(0.0, 5.0, 1.0), vec2(10.0, 2.5), 0.0, 1.3);
    c += vec3(1.2) * panel(d, vec3(-4.5, 0.6, 1.5), vec2(1.6, 7.0), 0.0, 0.9);
    c += vec3(0.7) * panel(d, vec3(4.5, -0.4, 1.5), vec2(1.4, 7.0), 0.0, 1.0);
    c += vec3(1.0) * panel(d, vec3(0.0, 2.6, 5.0), vec2(6.0, 1.2), 0.0, 0.8);
    c += vec3(0.55) * panel(d, vec3(1.2, 1.6, 6.0), vec2(3.0, 0.0), 1.0, 1.4);
    c += vec3(0.21, 0.89, 0.62) * 2.2 * panel(d, vec3(-3.0, -2.5, 2.5), vec2(0.55, 1.1), 2.0, 0.5);
    c += vec3(0.91, 0.26, 0.67) * 2.0 * panel(d, vec3(3.2, 2.4, 2.0), vec2(1.0, 0.0), 1.0, 0.6);
    c += vec3(0.34, 0.26, 1.0) * 1.6 * panel(d, vec3(2.6, -3.0, 2.5), vec2(4.0, 1.0), 0.0, 0.6);
    return c;
  }

  // ── 박막(홀로그램) ─────────────────────────────────────

  // 겉면 박막 두께: 굽이치는 넓은 띠라 반사광이 지나가는 자리마다 색이 천천히 바뀝니다.
  float filmThickness(vec2 uv) {
    vec2 c = uv - 0.5;
    float cs = cos(uFilmRot);
    float sn = sin(uFilmRot);
    uv = vec2(cs * c.x - sn * c.y, sn * c.x + cs * c.y) + 0.5 + uFilm;
    float warp = 0.22 * sin(6.2831853 * (0.6 * uv.x - 0.9 * uv.y) + 0.7);
    float band = 0.5 + 0.5 * sin(6.2831853 * (0.85 * uv.x + 0.55 * uv.y + warp));
    return mix(240.0, 520.0, band);
  }

  // 굴절률 2인 얇은 막의 간섭색 (빨강, 초록, 파랑 파장마다 위상이 다릅니다)
  vec3 thinFilm(float cosI, float thickness) {
    float n = 2.0;
    float cosT = sqrt(1.0 - (1.0 - cosI * cosI) / (n * n));
    float opd = 2.0 * n * thickness * cosT;
    vec3 phase = 6.2831853 * opd / vec3(650.0, 532.0, 450.0);
    return 0.5 + 0.5 * cos(phase);
  }

  float fresnel(float cosI) {
    return 0.04 + 0.96 * pow(1.0 - clamp(cosI, 0.0, 1.0), 5.0);
  }

  vec3 knee(vec3 c) {
    float m = max(c.r, max(c.g, c.b));
    if (m <= 0.75) return c;
    float k = 0.75 + 0.25 * (1.0 - exp(-(m - 0.75) / 0.25));
    return c * (k / m);
  }

  // ── 유리 ───────────────────────────────────────────────

  // 유리 안에서 나와 뒤의 오로라로 가는 빛. 빠져나가지 못하면(전반사) 안에서 조명을 비춥니다.
  vec3 transmit(vec3 tW, vec3 n2, vec3 qW, float eta) {
    vec3 o = refract(tW, -n2, eta);
    if (dot(o, o) < 1e-4) return uPaper + env(reflect(tW, -n2)) * 0.35;
    return background(qW, o, 0.45);
  }

  vec3 shade(vec3 pO, vec3 rd) {
    vec3 nO = normalAt(pO);
    vec3 n = normalize(mat3(uModel) * nO);
    vec3 pW = (uModel * vec4(pO, 1.0)).xyz;
    float cosI = clamp(dot(n, -rd), 0.0, 1.0);
    float F = fresnel(cosI);

    // 겉면 반사: 투명 코팅 한 겹과 박막 한 겹
    vec3 refl = env(reflect(rd, n));
    vec3 film = thinFilm(cosI, filmThickness(pO.xy + 0.5));
    vec3 spec = refl * F * (0.45 + 1.4 * film);

    // 들어가며 꺾이고, 안을 지나, 나오며 다시 꺾입니다.
    vec3 tW = refract(rd, n, 1.0 / IOR);
    vec3 tO = normalize(mat3(uInvModel) * tW);
    float s = 0.004;
    int steps = uHigh > 0.5 ? 28 : 16;
    for (int i = 0; i < 28; i++) {
      if (i >= steps) break;
      float d = -sdf(pO + tO * s);
      if (d < 0.0006) break;
      s += max(d, 0.0015) * 0.9;
    }
    vec3 qO = pO + tO * s;
    vec3 n2 = normalize(mat3(uModel) * normalAt(qO));
    vec3 qW = (uModel * vec4(qO, 1.0)).xyz;
    float path = s * uScale;

    // 나오는 쪽 분산: 빨강, 초록, 파랑이 조금씩 다르게 꺾여 가장자리에 무지개 테가 생깁니다.
    vec3 green = transmit(tW, n2, qW, IOR);
    vec3 trans = green;
    if (uHigh > 0.5) {
      trans = vec3(transmit(tW, n2, qW, 1.47).r, green.g, transmit(tW, n2, qW, 1.535).b);
    }

    // 아주 옅은 물빛: 두꺼운 곳일수록 조금 더 푸르게
    trans *= exp(-path * vec3(0.32, 0.12, 0.08));

    // 뒷면에서 안으로 비치는 반사 한 번
    float F2 = fresnel(clamp(dot(-tW, n2), 0.0, 1.0));
    vec3 inner = env(reflect(tW, -n2)) * F2 * 0.35;

    return trans * (1.0 - F) + knee(spec + inner);
  }

  // 물체 공간 상자와 광선의 교차 구간
  vec2 boxHit(vec3 ro, vec3 rd, vec3 h) {
    vec3 inv = 1.0 / rd;
    vec3 t0 = (-h - ro) * inv;
    vec3 t1 = (h - ro) * inv;
    vec3 tmin = min(t0, t1);
    vec3 tmax = max(t0, t1);
    return vec2(max(max(tmin.x, tmin.y), tmin.z), min(min(tmax.x, tmax.y), tmax.z));
  }

  void main() {
    vec2 ndc = gl_FragCoord.xy / uResolution * 2.0 - 1.0;
    float aspect = uResolution.x / uResolution.y;
    vec3 rd = normalize(vec3(ndc.x * uTanHalfFov * aspect, ndc.y * uTanHalfFov, -1.0));
    vec3 ro = uCamPos;

    vec3 bg = background(ro, rd, 1.0);
    vec3 glow = bg - uPaper;
    vec3 color = bg;

    vec3 roO = (uInvModel * vec4(ro, 1.0)).xyz;
    vec3 rdO = normalize(mat3(uInvModel) * rd);
    vec2 span = boxHit(roO, rdO, vec3(0.58, 0.58, 0.17));

    if (span.x < span.y && span.y > 0.0) {
      // 한 화소가 물체 공간에서 차지하는 각도. 윤곽을 화소 단위로 부드럽게 덮는 데 씁니다.
      float pixel = 2.0 * uTanHalfFov / uResolution.y;
      float t = max(span.x, 0.0);
      float best = 1e9;
      float bestT = t;
      bool hit = false;
      int steps = uHigh > 0.5 ? 72 : 44;
      for (int i = 0; i < 72; i++) {
        if (i >= steps) break;
        float d = sdf(roO + rdO * t);
        float ratio = d / (t * pixel);
        if (ratio < best) {
          best = ratio;
          bestT = t;
        }
        if (d < 0.0003 * t) {
          hit = true;
          break;
        }
        t += d * 0.9;
        if (t > span.y) break;
      }

      float cover = hit ? 1.0 : 1.0 - smoothstep(0.0, 1.0, best);
      if (cover > 0.0) {
        vec3 glass = shade(roO + rdO * (hit ? t : bestT), rd);
        color = mix(color, glass, cover);
      }
    }

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>

    // 어두운 그러데이션의 계단을 지우는 아주 약한 디더. 빛이 없는 배경에는 넣지 않습니다.
    float lit = step(0.0005, max(glow.r, max(glow.g, glow.b))) + step(0.001, distance(color, bg));
    gl_FragColor.rgb += (hash(gl_FragCoord.xy) - 0.5) / 255.0 * min(lit, 1.0);
  }
`;
