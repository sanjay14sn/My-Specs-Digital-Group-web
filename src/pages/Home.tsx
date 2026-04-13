import React from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ProductGrid from '../components/ProductGrid';
import BrandMarquee from '../components/BrandMarquee';
import FreeCheckupSection from '../components/FreeCheckupSection';
import QuizSection from '../components/QuizSection';
import ReviewsSection from '../components/ReviewsSection';
import StoresBanner from '../components/StoresBanner';
import FeaturedCategories from '../components/FeaturedCategories';
import { PRODUCTS } from '../data/products';

const Home: React.FC = () => {
    const topSelling = PRODUCTS.slice(0, 4);
    const trendingNow = PRODUCTS.slice(4, 8);

    return (
        <div className="home-page">
            <Hero />
            <TrustBar />
            <FeaturedCategories />
            <ProductGrid
                title="Our Top Selling Frames"
                products={topSelling}
                subtitle="The styles everyone's loving right now"
            />
            <BrandMarquee />
            <ProductGrid
                title="Trending Now"
                products={trendingNow}
            />
            <FreeCheckupSection />

            <QuizSection />
            <ReviewsSection />
            <StoresBanner />
        </div>
    );
};

export default Home;
