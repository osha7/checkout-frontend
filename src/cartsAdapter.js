// this file should handle DOM logic + functionality
// selectedElements
// eventListeners
// fetch requests

class cartsAdapter {
    constructor(cartUrl) {
        this.cartUrl = cartUrl
        // this.showCart = showCart

        // this.shoppingContainerDiv = document.getElementById('shopping-container')
        // this.cartContainerDiv = document.getElementById('cart-container')

        // this.shoppingContainerDiv.addEventListener('click', this.showCartWithShoppingBagClick)
    }

    // showCartWithShoppingBagClick(e) {
    //     if (e.target.className === "fas fa-shopping-bag" || e.target.className === "cart-counter") {
    //         this.showCart = !this.showCart
    //         if (this.showCart) {
    //             this.shoppingContainerDiv.style.display = "none";
    //             showCurrentCart()
    //             this.cartContainerDiv.style.display = "block";
    //         }
    //     }
    // }

    // get showCurrentCart() {
    //     this.showCurrentCart = this.showCurrentCart
    // }

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

// let cA = new cartsAdapter('http://localhost:3000/create-or-return-cart')
// cA.showCurrentCart()