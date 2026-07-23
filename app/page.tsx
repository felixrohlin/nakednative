import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main style={{ padding: "var(--space-8)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)" }}>
          Naked Native
        </div>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}>
          Scaffold stage 2 — header and footer wired. Sections land in stage 3.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
