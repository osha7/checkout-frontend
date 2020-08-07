document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

const itemUrl = "http://localhost:3000/items"
const cartUrl = "http://localhost:3000/create-or-return-cart"
let cA = new cartsAdapter('http://localhost:3000/create-or-return-cart')
let iA = new itemsAdapter('http://localhost:3000/items')

const main = document.querySelector('#main')

let itemCardContainerDiv = document.getElementById('item-card-container')
let shoppingCartCounter = document.getElementsByClassName('cart-counter')[0] 
let addToCartButton = document.getElementsByClassName('add-to-cart')[0]

let showCart = false
// show this if showCart is false
let shoppingContainerDiv = document.getElementById('shopping-container')
// show this if showCart is true
let cartContainerDiv = document.getElementById('cart-container')

let shoppingCartId = 0
let cartArrayOfItems = []

// let seePromiseFromFetch = fetch(itemUrl)

document.addEventListener('DOMContentLoaded', iA.fetchAllItems)
document.addEventListener('DOMContentLoaded', fetchCurrentCart)


document.addEventListener('click', function(e) {
    e.preventDefault()
    if (e.target.className === "add-to-cart") {
        newArray = cartArrayOfItems.map (item => item.id)
        if (newArray.includes(parseInt(e.target.dataset.item))) {
            alert("You already have this item in your cart!")
        } else {
        // debugger
        e.target.disabled = true
        e.target.innerText = "Item Added To Cart"
        let itemPath = `http://localhost:3000/items/${e.target.dataset.item}`
        // debugger
        const bodyData = {item: {
            cart_id: shoppingCartId
            }
          }
            fetch(itemPath, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                body: JSON.stringify(bodyData)
            })
            .then(response => response.json())
    // optimistically change the shopping bag tally 
            .then(function(e) {
                let i = document.getElementsByClassName('card').length
                let counterTally = parseInt(shoppingCartCounter.innerText)
                // if e.cart_id != true
                // debugger
                if (counterTally < i) {
                    counterTally++
                    shoppingCartCounter.innerText = `${counterTally}`
                } else {
                    alert("That was all of the items available for sale!")
                }
            })
            // .catch(err => {
            //     console.log(`Error: ${err}`)
            // })
            .catch(() => alert("Can’t access " + itemPath + " response."))
        }
    }
})

document.addEventListener('click', function(e) {
    if (e.target.className === "fas fa-shopping-bag" || e.target.className === "cart-counter") {
        showCart = !showCart
        if (showCart) {
            shoppingContainerDiv.style.display = "none";
            cA.showCurrentCart()
            cartContainerDiv.style.display = "block";
        }
    }
})

document.addEventListener('click', function(e) {
    e.preventDefault()
    if (e.target.id === "remove-button") {
        // debugger
        let counterTally = parseInt(shoppingCartCounter.innerText)
        counterTally--
        shoppingCartCounter.innerText = `${counterTally}`
        targetItemId = parseInt((e.target.dataset.description).split('-')[1])
        let removeItemPath = `http://localhost:3000/items/${targetItemId}`

        const bodyData = {item: {
            cart_id: null
            }
          }

            fetch(removeItemPath, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                body: JSON.stringify(bodyData)
            })

            .then(response => response.json())
            // .then(function(e) {
            //     return
            // })
            .then(e.target.parentElement.parentElement.remove())

            .catch(() => alert("Can’t access " + removeItemPath + " response."))
    }
})

document.addEventListener('click', function(e) {
    if (e.target.className === "return-to-shop") {
        // debugger
        showCart = !showCart
        if (showCart != true) {
            document.getElementById('item-table').innerHTML = ""
            shoppingContainerDiv.style.display = "block";
            cartContainerDiv.style.display = "none";
        }
    }
})
