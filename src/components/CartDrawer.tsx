import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, total, itemCount } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="cart-overlay active"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="cart-drawer active"
                        initial={{ right: -450 }}
                        animate={{ right: 0 }}
                        exit={{ right: -450 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="cart-header">
                            <h2>My Cart ({itemCount})</h2>
                            <X className="close-cart" onClick={onClose} />
                        </div>

                        <div className="cart-items">
                            {cart.length === 0 ? (
                                <div className="empty-cart">
                                    <p>Your cart is empty</p>
                                    <button className="btn btn-primary" onClick={onClose}>Start Shopping</button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <img src={item.image} alt={item.name} />
                                        <div className="cart-item-details">
                                            <h4>{item.name}</h4>
                                            <p className="cart-item-price">₹{(item.salePrice || item.price).toLocaleString()}</p>
                                            <div className="cart-item-controls">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                    <Minus size={14} />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                    <Plus size={14} />
                                                </button>
                                                <Trash2
                                                    size={18}
                                                    className="remove-btn"
                                                    onClick={() => removeFromCart(item.id)}
                                                    style={{ marginLeft: 'auto', cursor: 'pointer', color: '#ff4d4d' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-total">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <button className="btn btn-primary" style={{ width: '100%' }}>Checkout Now</button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
