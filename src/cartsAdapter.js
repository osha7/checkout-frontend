// this file should handle DOM logic + functionality
// selectedElements
// eventListeners
// fetch requests

class CartsAdapter {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    showCurrentCart() {
        fetch(this.baseURL)
            .then(resp => resp.json())
            .then(json => renderCartPage(json))
            .catch(() => alert("Can’t access " + this.baseURL + " response."))
    }
}

let cartsAdapter = new cartsAdapter('http://localhost:3000/create-or-return-cart')
cartsAdapter.showCurrentCart()