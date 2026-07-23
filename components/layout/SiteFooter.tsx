import Image from "next/image";
import Input from "@/components/ui/Input";
import styles from "./SiteFooter.module.css";

const LINKS = ["Shipping", "Returns", "Contact"];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Image
        src="/images/brand/logo-mark.png"
        alt="Naked Native"
        height={56}
        width={60}
        className={styles.mark}
      />

      <div className={styles.newsletter}>
        <div className={styles.newsletterLabel}>Join the tribe</div>
        <Input type="email" placeholder="you@example.com" />
      </div>

      <div className={styles.links}>
        {LINKS.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </footer>
  );
}
