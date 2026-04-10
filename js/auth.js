// Auth State Management
class Auth {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.listeners = [];
    }

    register(email, password, name) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'User already exists' };
        }
        const newUser = { email, password, name, id: Date.now() };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        this.login(email, password);
        return { success: true };
    }

    login(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            this.user = { id: user.id, email: user.email, name: user.name };
            localStorage.setItem('currentUser', JSON.stringify(this.user));
            this.notify();
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    }

    logout() {
        this.user = null;
        localStorage.removeItem('currentUser');
        this.notify();
        window.location.href = '/index.html';
    }

    getCurrentUserOrders() {
        if (!this.user) return [];
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        return orders.filter(o => o.userId === this.user.id);
    }

    getWishlistCount() {
        if (!window.appFavorites) return 0;
        return window.appFavorites.getFavorites().length;
    }

    getAddresses() {
        // Mock addresses for demonstration
        return [
            { id: 1, type: 'Home', address: '123 Luxury Ave, Suite 400', city: 'Mumbai', state: 'Maharashtra', zip: '400001', isDefault: true },
            { id: 2, type: 'Office', address: '456 Business Park, Build 5', city: 'Delhi', state: 'Delhi', zip: '110001', isDefault: false }
        ];
    }

    isAuthenticated() {
        return this.user !== null;
    }

    getCurrentUser() {
        return this.user;
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    notify() {
        this.listeners.forEach(callback => callback(this.user));
        window.dispatchEvent(new CustomEvent('auth-updated', { detail: this.user }));
    }
}

const auth = new Auth();
window.appAuth = auth;
