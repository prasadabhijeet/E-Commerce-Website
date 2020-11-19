class Cart {
    constructor() {
        this.data = {};
        this.data.items = [];
        this.data.totals = 0;
    }

    inCart(productID = 0) {
        let found = false;
        this.data.items.forEach(item => {
            if(item.id === productID) {
                found = true;
            }
        });
        return found;
    }

    calculateTotals() {
        this.data.totals = 0;
        this.data.items.forEach(item => {
            let price = item.price;
            let qty = item.qty;
            let amount = price * qty;

            this.data.totals += amount;
        });

    }

    addToCart(product = null, qty = 1) {
        if(!this.inCart(product.id)) {
            let prod = {
                id: product.id,
                title: product.title,
                price: product.price,
                qty: qty,
                imagePath: product.imagePath,
                seller: product.seller
            };
            this.data.items.push(prod);
            this.calculateTotals();
        }
    }

    saveCart(request) {
        if(request.session) {
            request.session.cart = this.data;
        }
    }

    removeFromCart(id = 0) {
        for(let i = 0; i < this.data.items.length; i++) {
            let item = this.data.items[i];
            if(item.id === id) {
                this.data.items.splice(i, 1);
                this.calculateTotals();
            }
        }

    }

    clear(request) {
        this.data.items = [];
        this.data.totals = 0;
        if(request.session) {
            request.session.cart.items = [];
            request.session.cart.totals = 0;
        }

    }

}

module.exports = new Cart();
