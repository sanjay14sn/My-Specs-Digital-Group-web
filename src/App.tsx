import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CollectionPage from './pages/CollectionPage';
import FavoritesPage from './pages/FavoritesPage';
import ProductDetail from './pages/ProductDetail';
import BrandPage from './pages/BrandPage';
import StoresPage from './pages/StoresPage';
import ProfilePage from './pages/ProfilePage';
import LensSelection from './pages/LensSelection';
import HospitalBooking from './pages/HospitalBooking';
import HomeTryOn from './pages/HomeTryOn';
import SupportPage from './pages/SupportPage';
import LensesPage from './pages/LensesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useCart } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

function App() {
  const { isDrawerOpen, setIsDrawerOpen } = useCart();
  const location = useLocation();

  const isStandaloneFlow = (location.pathname.includes('/lenses') && location.pathname.includes('/product/'));

  return (
    <div className="app-container">
      {!isStandaloneFlow && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eyeglasses" element={<CollectionPage />} />
          <Route path="/sunglasses" element={<CollectionPage />} />
          <Route path="/sale" element={<CollectionPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/brands" element={<BrandPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/product/:id/lenses" element={<LensSelection />} />
          <Route path="/find-hospital" element={<HospitalBooking />} />
          <Route path="/home-try-on" element={<HomeTryOn />} />
          <Route path="/connect" element={<SupportPage />} />
          <Route path="/lenses" element={<LensesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Add more routes here */}
        </Routes>
      </main>
      {!isStandaloneFlow && <Footer />}
      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}

export default App;
