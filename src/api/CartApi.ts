import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/cart/',
    withCredentials: true,
});


export const cartApi = {
    getCurrentCart() {
        return instance.get('current_customer_cart/').then(response => response)
    },
    addProductToCart(productId: number) {
        return instance.put('current_customer_cart/add_to_cart/', {productId}).then(response => response)
    },
    changeQty(productId: number, qty: number) {
        return instance.patch('current_customer_cart/change_qty/', {productId, qty}).then(response => response)
    }
}
