import styles from "../MyPageQuickStats/MyPageQuickStats.module.css"

type Tone = "default" | "success" | "warning" | "danger";

interface Props {
  label: string;
  value: number | string;
  subText?: string;
  tone?: Tone;
  onClick?: () => void;
}

export default function StatCard({
  label,
  value,
  subText,
  tone = "default",
  onClick,
}: Props) {
  const clickable = !!onClick;

  return (
    <button
      type="button"
      className={`${styles.card} ${styles[tone]} ${clickable ? styles.clickable : ""}`}
      onClick={onClick}
      disabled={!clickable}
      aria-disabled={!clickable}
    >
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      {subText ? <div className={styles.subText}>{subText}</div> : <div className={styles.subTextPlaceholder} />}
    </button>
  );
}
