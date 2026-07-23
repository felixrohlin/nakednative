import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/BrandStory";
import ProductGrid from "@/components/sections/ProductGrid";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <BrandStory />
        <ProductGrid />
      </main>
      <SiteFooter />
    </>
  );
}
