import styles from "../styles/components/Button.module.scss";
import { ReactNode } from "react";
import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<{}> {
    className?: string;
    children?: ReactNode;
    link?: boolean;
}

export default function Button({ className, children, link, ...props }: Props) {
    return (
        <button className={clsx(styles.button, className, link && styles.link)} {...props}>
            {children}
        </button>
    );
}
