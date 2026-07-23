import Image from "next/image";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  image: string;
  name: string;
  price: string;
  colorway?: string;
};

export default function ProductCard({ image, name, price, colorway }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={colorway ? `${name} — ${colorway}` : name}
          fill
          // 599/960 mirror --bp-mobile/--bp-tablet (styles/tokens/breakpoints.css).
          // The `sizes` attribute is a plain HTML string with no var() support,
          // so — same as every @media rule in this codebase — the literal is
          // repeated here rather than computed.
          // eslint-disable-next-line no-restricted-syntax
          sizes="(max-width: 599px) 100vw, (max-width: 960px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.row}>
        <div>
          <div className={styles.name}>{name}</div>
          {colorway ? <div className={styles.colorway}>{colorway}</div> : null}
        </div>
        <div className={styles.price}>{price}</div>
      </div>
    </div>
  );
}
