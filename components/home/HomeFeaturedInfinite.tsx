"use client";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import getFeaturedProducts from "@/acitons/featured";
function isNearPageBottom(gap: number) {
  //找到滚动元素的对象
  const root = document.scrollingElement ?? document.documentElement;
  return root.scrollTop + window.innerHeight >= root.scrollHeight - gap;
}

export default function HomeFeaturedInfinite({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(12);

  useEffect(() => {
    //  console.log("无限滚动组件",initialProducts)

    const loadNext = () => {
      console.log("page", page);

      if (!hasMore) return; //如果没有更多数据了，直接退出
      console.log("触底加载中。。。");
      getFeaturedProducts(page).then((more) => {
        //判断数据是否够12条，如果不够，证明没有更多数据了
        if (more.length < 12) {
          setHasMore(false);
          console.log("没有更多数据了");
        }
        setProducts([...products, ...more]);
        setPage(page + 12);
      });
    };

    const tick = () => {
      const bottom = isNearPageBottom(50);
      if (bottom) {
        // console.log("触底了")
        //加载更多的数据
        loadNext();
      }
    };

    window.addEventListener("scroll", tick);
    return () => window.removeEventListener("scroll", tick);
  }, [page, hasMore]);

  return (
    <div className="flex flex-wrap gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="min-w-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
