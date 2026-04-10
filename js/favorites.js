// Favorites State Management
class Favorites {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('favorites')) || [];
        this.listeners = [];
    }

    toggleFavorite(product) {
        const index = this.items.findIndex(item => item.id === product.id);
        if (index > -1) {
            this.items.splice(index, 1);
        } else {
            this.items.push(product);
        }
        this.save();
        this.notify();
    }

    isFavorite(productId) {
        return this.items.some(item => item.id === productId);
    }

    getFavorites() {
        return this.items;
    }

    save() {
        localStorage.setItem('favorites', JSON.stringify(this.items));
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    notify() {
        this.listeners.forEach(callback => callback(this.items));
        window.dispatchEvent(new CustomEvent('favorites-updated', { detail: this.items }));
    }
}

const favorites = new Favorites();
window.appFavorites = favorites;
