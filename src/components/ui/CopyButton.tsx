'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './CopyButton.module.scss';

interface Props {
  value: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}

/** 누르면 값을 복사하고 잠깐 "복사됨"을 띄웁니다. */
export default function CopyButton({
  value,
  label,
  className,
  children,
}: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      className={clsx(styles.button, className)}
      aria-label={label}
      title={value}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          window.prompt(label, value);
        }
      }}
    >
      {children}
      <span
        className={styles.toast}
        data-show={copied || undefined}
        role="status"
      >
        {copied ? `${value} 복사됨` : ''}
      </span>
    </button>
  );
}
