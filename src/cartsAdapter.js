// this file should handle DOM logic + functionality
// selectedElements
// eventListeners
// fetch requests

class cartsAdapter {
    constructor(cartUrl) {
        this.cartUrl = cartUrl
    }

    showCurrentCart = () => {
        fetch(this.cartUrl)
            .then(resp => resp.json())
            .then(json => {
                // debugger
                let newCart = new Cart(json)
                newCart.renderCartPage()
                // renderCartPage(json)
            })
            
            .catch(() => alert("Can’t access " + this.cartUrl + " response."))
    }
}
