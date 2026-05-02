import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.title}>Nitya Satva</div>
          <div className={styles.subTitle}>Eternally pure</div>
        </div>
        <div className={styles.body}> Launching soon...</div>
      </main>
      <footer className={styles.footer}>
        Copyright © 2026 Nitya Satva - Eternally pure - All Rights Reserved.
      </footer>
    </div>
  );
}
