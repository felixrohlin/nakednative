import ProductCard from "@/components/commerce/ProductCard";
import styles from "./ProductGrid.module.css";

const PRODUCTS = [
  {
    image: "/images/products/product-poncho-green-front.jpg",
    name: "Fjord Poncho",
    colorway: "Moss Green",
    price: "$128",
  },
  {
    image: "/images/products/product-poncho-grey-side.jpg",
    name: "Fjord Poncho",
    colorway: "Heather Grey",
    price: "$128",
  },
  {
    image: "/images/products/product-poncho-navy-side.jpg",
    name: "Fjord Poncho",
    colorway: "Midnight Navy",
    price: "$128",
  },
];

export default function ProductGrid() {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.title}>The Fjord Poncho</div>
        <div className={styles.eyebrow}>3 colorways</div>
      </div>
      <div className={styles.grid}>
        {PRODUCTS.map((product) => (
          <ProductCard key={product.colorway} {...product} />
        ))}
      </div>
    </div>
  );
}
