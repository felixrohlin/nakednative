"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";

const NAV_ITEMS = ["Shop", "Journal", "Our Story"];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // --bp-tablet lives in styles/tokens/breakpoints.css; read at runtime so
    // this stays in sync with the token instead of repeating the literal.
    const bpTablet = getComputedStyle(document.documentElement).getPropertyValue("--bp-tablet").trim();
    const query = window.matchMedia(`(max-width: ${bpTablet})`);
    const handleChange = (event: MediaQueryListEvent) => {
      if (!event.matches) setMobileOpen(false);
    };
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/images/brand/logo-wordmark.png"
            alt="Naked Native"
            height={22}
            width={117}
            className={styles.logo}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <span key={item} className={styles.navLink}>
              {item}
            </span>
          ))}
          <span className={styles.cart}>Cart (2)</span>
        </nav>

        <button
          type="button"
          className={styles.hamburger}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div id="mobile-nav" className={styles.mobileNav} data-open={mobileOpen}>
        {NAV_ITEMS.map((item) => (
          <span key={item}>{item}</span>
        ))}
        <span>Cart (2)</span>
      </div>
    </header>
  );
}
