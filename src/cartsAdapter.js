// this file should handle DOM logic + functionality
// selectedElements
// eventListeners
// fetch requests

class cartsAdapter {
    constructor(cartUrl) {
        this.cartUrl = cartUrl
        this.arrayOfCartItems = []
        this.newCartItemArray = []
    }

    showCurrentCart = () => {
        fetch(this.cartUrl)
            .then(resp => resp.json())
            .then(json => {
                this.arrayOfCartItems.push(cartArrayOfItems)
                // debugger
                let newCart = new Cart(json)
                newCart.renderCartPage()
                // renderCartPage(json)
            })
            
            .catch(() => alert("Can’t access " + this.cartUrl + " response."))
    }

    cartTotal() {
    
        // this.arrayOfCartItems[[0]].map( item => {
            debugger
            // this.newCartItemArray.push(item.price)
        // })
    }
}
