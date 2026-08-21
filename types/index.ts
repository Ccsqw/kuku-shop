export interface Category {
    id: number;
    name: string;
    slug: string;
    iconUrl: string
}
//商品类型
export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number | null;
    originalPrice: number | null;
    image: string | null;
    images: string | null;
    category: string | null;
    categoryId: string | null;
    stock: string | null;
    rating: number | null;
    reviewCount: number | null;
    brand: string | null;
    createdAt: string | null;
}
//商品详情
export interface ProductDetail {
    id: number;
    name: string;
    tag: string;
    spec: string;
    productId: number;
    specValue: string;
}

//购物车商品
export interface CartType {
    name: string;
    id: number;
    productId: number;
    count: number;
    price: number;
    category: string;
    userId: number;
    image: string;
}