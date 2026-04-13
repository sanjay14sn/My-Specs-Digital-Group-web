export interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    salePrice?: number;
    image: string;
    description: string;
    gender: string;
    shape: string;
    color: string;
    material: string;
    size: string;
}

export const PRODUCTS: Product[] = [
    { id: 1, name: "Classic Midnight", category: "Eyeglasses", brand: "Muse", price: 8134, salePrice: 6500, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto:eco/ms/media/catalog_product/1/000407_f_3.jpg/w=400,h=200,fit=fill,bg=fff", description: "Includes Basic Rx Lenses. Timeless black frames for a sophisticated look.", gender: "Men", shape: "Rectangle", color: "Black", material: "Metal", size: "Medium" },
    { id: 2, name: "Amber Fade", category: "Sunglasses", brand: "Ottoto", price: 9545, salePrice: 7600, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/ms/media/catalog_product/1/32-000224_f_3.jpg", description: "Includes Premium Lenses. Stylish tortoise shell pattern with a modern twist.", gender: "Women", shape: "Cat Eye", color: "Tortoise", material: "Acetate", size: "Medium" },
    { id: 3, name: "Modern Scholar", category: "Eyeglasses", brand: "Muse", price: 7387, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto:eco/ms/media/catalog_product/1/35-000913_f.jpg/w=400,h=200,fit=fill,bg=fff", description: "Clean lines and lightweight comfort for daily wear.", gender: "Men", shape: "Square", color: "Black", material: "Metal", size: "Large" },
    { id: 4, name: "Coastal Breeze", category: "Sunglasses", brand: "Ray-Ban", price: 10707, salePrice: 8500, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto:eco/ms/media/catalog_product/1/32-7674_f_1.jpg/w=400,h=200,fit=fill,bg=fff", description: "Polarized lenses for maximum clarity and eye protection.", gender: "Men", shape: "Aviator", color: "Gold", material: "Metal", size: "Large" },
    { id: 5, name: "Amelia E Nettle", category: "Eyeglasses", brand: "Amelia E", price: 6500, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto:eco/ms/media/catalog_product/1/10736_f.jpg/w=400,h=200,fit=fill,bg=fff", description: "Elegant tortoise design with a comfortable fit.", gender: "Women", shape: "Round", color: "Tortoise", material: "Acetate", size: "Small" },
    { id: 6, name: "Amelia E Pam Purple", category: "Eyeglasses", brand: "Amelia E", price: 7200, salePrice: 5800, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto:eco/ms/media/catalog_product/1/35-001783_f.jpg/w=400,h=200,fit=fill,bg=fff", description: "Vibrant purple frames for a bold statement.", gender: "Women", shape: "Cat Eye", color: "Purple", material: "Acetate", size: "Medium" },
    { id: 7, name: "Muse Karri Shiny Black", category: "Eyeglasses", brand: "Muse", price: 8900, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/media/catalog/product/cache/1/thumbnail/398x200/9df78eab33525d08d6e5fb8d27136e95/3/5/35-002537_f.jpg", description: "Sleek and professional shiny black frames.", gender: "Men", shape: "Rectangle", color: "Shiny Black", material: "Metal", size: "Large" },
    { id: 8, name: "Ray-Ban 6363 Black Gold", category: "Eyeglasses", brand: "Ray-Ban", price: 12500, salePrice: 10000, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto:eco/ms/media/catalog_product/1/35-002510_f.jpg/w=400,h=200,fit=fill,bg=fff", description: "Iconic Ray-Ban quality with a luxurious aesthetic.", gender: "Men", shape: "Rectangle", color: "Gold", material: "Metal", size: "Large" },
    { id: 9, name: "Oakley Meta Mbappe", category: "Sunglasses", brand: "Oakley", price: 15000, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto:eco/ms/media/catalog_product/1/32-001893_f.jpg/w=400,h=200,fit=fill,bg=fff", description: "Sporty and high-performance sunglasses by Oakley.", gender: "Men", shape: "Wrap", color: "Black", material: "Plastic", size: "Large" },
    { id: 10, name: "Ray-Ban Meta Smart", category: "Sunglasses", brand: "Ray-Ban", price: 25000, salePrice: 19000, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto:eco/ms/media/catalog_product/1/32-000226_f.jpg/w=400,h=200,fit=fill,bg=fff", description: "Next-gen smart sunglasses with built-in camera and audio.", gender: "Unisex", shape: "Square", color: "Black", material: "Mixed", size: "Medium" },
    { id: 11, name: "Oakley Holbrook", category: "Sunglasses", brand: "Oakley", price: 13000, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto:eco/ms/media/catalog_product/1/32-p9146_f_1.jpg/w=400,h=200,fit=fill,bg=fff", description: "A classic design fused with modern Oakley technology.", gender: "Men", shape: "Square", color: "Brown", material: "Plastic", size: "Large" },
    { id: 12, name: "Ottoto Bellona", category: "Eyeglasses", brand: "Ottoto", price: 9900, image: "https://images.unsplash.com/photo-1505085458920-f5a63901c05d?auto=format&fit=crop&q=80&w=600", description: "Elegant cat-eye frames for a chic look.", gender: "Women", shape: "Cat Eye", color: "Brown", material: "Acetate", size: "Medium" },
    { id: 13, name: "Ocean Vista", category: "Sunglasses", brand: "Muse", price: 11200, salePrice: 8900, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto:eco/ms/media/catalog_product/1/46-003300_f.jpg/w=400,h=200,fit=fill,bg=fff", description: "Sophisticated blue lenses for a beach-ready style.", gender: "Unisex", shape: "Round", color: "Blue", material: "Acetate", size: "Medium" },
    { id: 14, name: "Desert Mirage", category: "Sunglasses", brand: "Ottoto", price: 12500, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto:eco/ms/media/catalog_product/1/32-001843_f.jpg/w=400,h=200,fit=fill,bg=fff", description: "Modern gold frames with a sleek desert-inspired aesthetic.", gender: "Men", shape: "Square", color: "Gold", material: "Metal", size: "Large" },
    { id: 15, name: "Urban Night", category: "Sunglasses", brand: "Ray-Ban", price: 14000, salePrice: 11500, image: "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto:eco/ms/media/catalog_product/1/32-001634_f.jpg/w=400,h=200,fit=fill,bg=fff", description: "Stealthy black sunglasses for a bold urban look.", gender: "Men", shape: "Rectangle", color: "Black", material: "Mixed", size: "Large" }
];

// Utility to get unique values for filtering
export const getUniqueValues = (key: keyof Product): string[] => {
    const values = PRODUCTS.map(p => p[key]).filter(v => typeof v === 'string' && v !== '');
    return Array.from(new Set(values as string[]));
};

export const Genders = getUniqueValues('gender');
export const Shapes = getUniqueValues('shape');
export const Sizes = getUniqueValues('size');
export const Brands = getUniqueValues('brand');
export const Colors = getUniqueValues('color');
export const Materials = getUniqueValues('material');
