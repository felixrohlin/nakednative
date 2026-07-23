import Image from "next/image";
import Button from "@/components/ui/Button";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <Image
        src="/images/hero/photo-lifestyle-mountain.jpg"
        alt="Naked Native lifestyle photography in the mountains"
        fill
        sizes="100vw"
        priority
        className={styles.media}
      />
      <div className={styles.scrim} />
      <div className={styles.copy}>
        <div className={styles.eyebrow}>Fair Trade · Eco Lifestyle</div>
        <div className={styles.headline}>Naked Native</div>
        <p className={styles.description}>
          Quality goods sewn from an ethical thread — for the surf, the mountains, and everywhere between.
        </p>
        <Button variant="accent" size="lg">
          Shop the Collection
        </Button>
      </div>
    </div>
  );
}
