import styles from "./BrandStory.module.css";

export default function BrandStory() {
  return (
    <div className={styles.section}>
      <div className={styles.heading}>Brought to you by Scandinavian frothers</div>
      <p className={styles.body}>
        Inspired by our native heritage, we bring you quality goods sewn from an ethical thread.
        Committed to transparent supply chains and grass-root social development — a new way of
        doing business.
      </p>
    </div>
  );
}
