import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
export default function ProductCard({ product }: { product: Product }) {
    const imageSrc = product.image ?? "/file.svg"
    const price = product.price ?? 0
    const description = product.description ?? "暂无描述"
    const rating = product.rating ?? 0;
    const reviewCount = product.reviewCount ?? 0

    return (
        <Link href={`/products/${product.id}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* 商品图片 */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="eager"
                    />
                    {
                        product.originalPrice != null &&
                        product.originalPrice > price && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">特价</div>
                        )
                    }
                </div>
                {/* 商品信息 */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-sky-600 transition">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{description}</p>

                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-red-600">￥{price.toLocaleString()}</span>
                        {product.originalPrice != null && product.originalPrice > price && (
                            <span className="text-sm text-gray-400 line-through">￥{product.originalPrice.toLocaleString()}</span>
                        )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span>{rating}</span>
                            <span className="text-gray-400">{reviewCount}</span>
                        </div>
                        {
                            product.brand&&<span className="text-gray-400">{product.brand}</span>
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}