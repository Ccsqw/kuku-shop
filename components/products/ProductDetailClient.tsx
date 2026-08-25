"use client";
import Image from "next/image";
import { Product, ProductDetail } from "@/types";
import { useState } from "react";
import { addCartItems } from "@/actions/cart";
import { useRouter } from "next/navigation";
import ProductAskEveryone from "@/components/products/ProductAskEveryone";
//mock数据
// const IMG_THUMB = [
//   "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80",
//   "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
//   "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
//   "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&q=80",
// ];

export default function ProductDetailClient({
  product,
  productDetail,
  qaList,
}: {
  product: Product;
  productDetail: ProductDetail[];
  qaList: any;
}) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [quality, setQuality] = useState(1);
  const router = useRouter();
  const addToCart = async () => {
    //判断用户是否登录，只看sessionStorage是否有userId
    if (!sessionStorage.getItem("userId")) {
      router.push("/login");
      return;
    }
    const result = await addCartItems(
      //暂时使用sessionStorage 的userId 作为购物车的userId

      product.id,
      quality,
      product.price || 0,
      product.category || "",
      product.name || "",
      product.images?.split(",")[selectedImg] || "",
    );
    if (!result.success) {
      alert(result.message);
      return;
    }
    alert("加购成功");
    router.push("/cart");
  };

  return (
    <div>
      {/* 商品详细信息 */}
      <div className="flex flex-col lg:flex-row gap-10 mb-10">
        <div className="lg:flex-1">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <Image
              //将images转换为数组，根据selectedImg角标获取当前选中的图片URL
              src={product.images?.split(",")[selectedImg] || ""}
              alt="商品图"
              fill
              sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,25vw"
            />
          </div>
          <div className="mt-4 flex gap-3">
            {product.images?.split(",").map((img, index) => (
              <div
                key={index}
                className={`relative aspect-square min-h-0 flex-1 overflow-hidden rounded-lg border-2 ${selectedImg === index ? `border-sky-600` : `border-transparent`}`}
                onClick={() => setSelectedImg(index)}
              >
                <Image
                  src={img}
                  loading="eager"
                  fill
                  alt="缩略图"
                  sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,25vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:flex-1 space-y-6">
          <div>
            <p className="text-sm font-medium text-sky-600">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              {product.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <span className="text-4xl font-bold text-red-600">
              ¥{product.price}
            </span>
            <span className="text-lg text-slate-400 line-through">
              ¥{product.originalPrice}
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-slate-600">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span className="font-medium text-slate-800">
                {product.rating}
              </span>
              <span className="text-slate-400">{product.reviewCount}</span>
            </div>
            <span>品牌 · {product.brand}</span>
            <span>库存 {product.stock}</span>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-5 text-slate-700 leading-relaxed">
            {product.description}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-700">数量</span>
            <div className="flex items-center rounded-lg border border-slate-200 bg-white">
              <div
                className="px-4 py-2 hover:bg-slate-50"
                onClick={() => setQuality(quality > 1 ? quality - 1 : 1)}
              >
                -
              </div>
              <span className="w-16 border-x border-slate-200 py-2 text-center text-sm">
                {quality}
              </span>
              <div
                className="px-4 py-2 hover:bg-slate-50"
                onClick={() => setQuality(quality + 1)}
              >
                +
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="flex-1 rounded-xl bg-sky-600 py-3.5 font-semibold text-white hover:bg-sky-700"
              onClick={addToCart}
            >
              加入购物车
            </button>
            <button className="flex-1 rounded-xl bg-red-600 py-3.5 font-semibold text-white hover:bg-red-700">
              立即购买
            </button>
          </div>

          <div className="flex flex-wrap gap-3 rounded-xl border border-slate-100 bg-white p-4 text-sm text-slate-600 sm:flex-nowrap">
            {["正品保证", "极速发货", "7天退换", "在线客服"].map((t) => (
              <div
                className="flex w-[calc(50%-0.375rem)] items-center gap-2"
                key={t}
              >
                {t}
              </div>
            ))}
          </div>

          <div className="space-y-5 border-t border-slate-100 pt-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">核心参数</h3>
              <p className="mt-1 text-xs text-slate-500">
                以下为演示占位，后续可对接商品 SKU 与规格库。
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {productDetail.map((item) => (
                  <span
                    key={item.id}
                    className="rounded border border-slate-200/80 bg-slate-50/90 px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    {item.tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 p-5 bg-white">
            <h3 className="text-sm font-semibold text-slate-900">规格摘要</h3>

            <div className="flex flex-wrap items-baseline justify-between py-3 mt-2"></div>
            {productDetail.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-baseline justify-between py-3 mt-2"
              >
                <div className="text-slate-500">{item.spec}</div>
                <div className="text-right font-medium text-slate-800">
                  {item.specValue}
                </div>
              </div>
            ))}
            {/* <div className="flex flex-wrap items-baseline justify-between py-3 mt-2">
              <div className="text-slate-500">存储</div>
              <div className="text-right font-medium text-slate-800">512GB</div>
            </div>
            <div className="flex flex-wrap items-baseline justify-between py-3 mt-2">
              <div className="text-slate-500">网络</div>
              <div className="text-right font-medium text-slate-800">
                5G 全网通
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* 商品详情组件 */}
      <ProductAskEveryone qaList={qaList} productId={Number(product.id)} />
    </div>
  );
}
