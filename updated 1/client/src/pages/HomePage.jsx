import React, { useMemo } from "react";
import HeroCarousel from "../components/HeroCarousel";
import CategorySection from "../components/CategorySection";
import TopSelling from "../components/TopSelling";
import Comments from "../components/Comments";

export default function HomePage({ products, categories, comments }) {
  const topSellers = useMemo(
    () => products.filter((p) => p.topSeller).slice(0, 4),
    [products]
  );

  return (
    <>
      <HeroCarousel categories={categories} />
      <CategorySection categories={categories} />
      <TopSelling products={topSellers} />
      <Comments comments={comments} />
    </>
  );
}
