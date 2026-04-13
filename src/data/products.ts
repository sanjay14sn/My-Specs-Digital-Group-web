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
    { id: 1, name: "Classic Midnight", category: "Eyeglasses", brand: "Muse", price: 8134, salePrice: 6500, image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600", description: "Includes Basic Rx Lenses. Timeless black frames for a sophisticated look.", gender: "Men", shape: "Rectangle", color: "Black", material: "Metal", size: "Medium" },
    { id: 2, name: "Amber Fade", category: "Sunglasses", brand: "Ottoto", price: 9545, salePrice: 7600, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600", description: "Includes Premium Lenses. Stylish tortoise shell pattern with a modern twist.", gender: "Women", shape: "Cat Eye", color: "Tortoise", material: "Acetate", size: "Medium" },
    { id: 3, name: "Modern Scholar", category: "Eyeglasses", brand: "Muse", price: 7387, image: "https://images.unsplash.com/photo-1511499767390-94677f138e04?auto=format&fit=crop&q=80&w=600", description: "Clean lines and lightweight comfort for daily wear.", gender: "Men", shape: "Square", color: "Black", material: "Metal", size: "Large" },
    { id: 4, name: "Coastal Breeze", category: "Sunglasses", brand: "Ray-Ban", price: 10707, salePrice: 8500, image: "https://images.unsplash.com/photo-1577744486770-020ab4ca191e?auto=format&fit=crop&q=80&w=600", description: "Polarized lenses for maximum clarity and eye protection.", gender: "Men", shape: "Aviator", color: "Gold", material: "Metal", size: "Large" },
    { id: 5, name: "Amelia E Nettle", category: "Eyeglasses", brand: "Amelia E", price: 6500, image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=600", description: "Elegant tortoise design with a comfortable fit.", gender: "Women", shape: "Round", color: "Tortoise", material: "Acetate", size: "Small" },
    { id: 6, name: "Amelia E Pam Purple", category: "Eyeglasses", brand: "Amelia E", price: 7200, salePrice: 5800, image: "https://images.unsplash.com/photo-1614715838608-dd527c46231d?auto=format&fit=crop&q=80&w=600", description: "Vibrant purple frames for a bold statement.", gender: "Women", shape: "Cat Eye", color: "Purple", material: "Acetate", size: "Medium" },
    { id: 7, name: "Muse Karri Shiny Black", category: "Eyeglasses", brand: "Muse", price: 8900, image: "https://images.unsplash.com/photo-1574258495973-f320df52f0b8?auto=format&fit=crop&q=80&w=600", description: "Sleek and professional shiny black frames.", gender: "Men", shape: "Rectangle", color: "Shiny Black", material: "Metal", size: "Large" },
    { id: 8, name: "Ray-Ban 6363 Black Gold", category: "Eyeglasses", brand: "Ray-Ban", price: 12500, salePrice: 10000, image: "https://images.unsplash.com/photo-1534073737927-85f1ebff1f5d?auto=format&fit=crop&q=80&w=600", description: "Iconic Ray-Ban quality with a luxurious aesthetic.", gender: "Men", shape: "Rectangle", color: "Gold", material: "Metal", size: "Large" },
    { id: 9, name: "Oakley Meta Mbappe", category: "Sunglasses", brand: "Oakley", price: 15000, image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=600", description: "Sporty and high-performance sunglasses by Oakley.", gender: "Men", shape: "Wrap", color: "Black", material: "Plastic", size: "Large" },
    { id: 10, name: "Ray-Ban Meta Smart", category: "Sunglasses", brand: "Ray-Ban", price: 25000, salePrice: 19000, image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600", description: "Next-gen smart sunglasses with built-in camera and audio.", gender: "Unisex", shape: "Square", color: "Black", material: "Mixed", size: "Medium" },
    { id: 11, name: "Oakley Holbrook", category: "Sunglasses", brand: "Oakley", price: 13000, image: "https://images.unsplash.com/photo-1508243529287-e219147131bf?auto=format&fit=crop&q=80&w=600", description: "A classic design fused with modern Oakley technology.", gender: "Men", shape: "Square", color: "Brown", material: "Plastic", size: "Large" },
    { id: 12, name: "Ottoto Bellona", category: "Eyeglasses", brand: "Ottoto", price: 9900, image: "https://images.unsplash.com/photo-1505085458920-f5a63901c05d?auto=format&fit=crop&q=80&w=600", description: "Elegant cat-eye frames for a chic look.", gender: "Women", shape: "Cat Eye", color: "Brown", material: "Acetate", size: "Medium" }
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
