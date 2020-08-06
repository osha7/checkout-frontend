document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

const itemUrl = "http://localhost:3000/items"
const cartUrl = "http://localhost:3000/create-or-return-cart"

const main = document.querySelector('#main')
    main.innerHTML += `
        <div id="shopping-container">
            <div id="header-div">
                <h1>Ware</h1>
            </div>
            <div class="shopping-cart-counter">
                <div class="shopping-cart-image">
                    <i class="fas fa-shopping-bag" style='font-size:36px'></i>
                </div>
                <div class="cart-counter"></div>
            </div>
            <div id="add-new-item"></div>
            <div id="item-card-container"></div>
        </div>
        <div id="cart-container">
            <h1>Cart</h1>
            <div id="container" class="cart-card-container">
                <div id="card" class="cart-card">
                    <div class="cart-items">
                        <table id="item-table-headers" style="width:100%">
                            <tr style="font-size: 22px; text-decoration: underline;">
                                <th>Item Name</th>
                                <th>#</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </table>
                        <table id="item-table" style="width:100%">
                            <tr style="font-size: 22px; text-decoration: underline;">
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div id="button" class="shop-return">
            <button class="return-to-shop">Shop</button>
            </div>
        </div>
    `

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

document.addEventListener('DOMContentLoaded', fetchAllItems)
document.addEventListener('DOMContentLoaded', fetchCurrentCart)

    // debugger

function fetchAllItems() {
    fetch(itemUrl)
        .then(function(resp) {
            return resp.json()
        })
        // .then(console.log)
        
        .then(function(json) {
            json.forEach(function(item){
                itemCardContainerDiv.innerHTML += addItemCard(item)
              })
        })
        .catch(() => alert("Can’t access " + itemUrl + " response. Blocked by browser?"))
}

// destructuring ES6:

// let itemObj = { 
//     name: "Jeff",
// }

// let {name} = itemObj

// using destructuring ES6:

function addItemCard({id, img_source, name, price, item_count, description, cart_id}) {
    return `
        <div id=item-${id}-card class="card">
            <img src=${img_source} class="item-image"/>
            <h2>${name}</h2>
            <p>Price: $${price} - Availability: ${item_count} <br>
                ${description}</p>
            <button class="add-to-cart" data-item=${id}>Add Item To Cart</button>
            <p hidden id="item-cart-id">${cart_id}</p>
        </div>
    `
}

function fetchCurrentCart () {
    fetch(cartUrl)
        .then(resp => resp.json())
        // debugger
        // .then(json => (json))
        .then(function(json) {
            shoppingCartCounter.innerText = `${json.items.length}`
            shoppingCartId = json.id
            cartArrayOfItems = json.items
        })
        .catch(() => alert("Can’t access " + cartUrl + " response."))
}

document.addEventListener('click', function(e) {
    e.preventDefault()
    if (e.target.className === "add-to-cart") {
        newArray = cartArrayOfItems.map (item => item.id)
        if (newArray.includes(parseInt(e.target.dataset.item))) {
            alert("You already have this item in your cart!")
        } else {
        // debugger
        e.target.disabled = true
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
    if (e.target.className === "fas fa-shopping-bag") {
        showCart = !showCart
        if (showCart) {
            shoppingContainerDiv.style.display = "none";
            showCurrentCart()
            cartContainerDiv.style.display = "block";
        }
    }
})

const showCurrentCart = function() {
    fetch(cartUrl)
        .then(resp => resp.json())
        .then(json => renderCartPage(json))
        .catch(() => alert("Can’t access " + cartUrl + " response."))
}

function renderCartPage(cart) {
    // debugger
    let itemsTable = document.getElementById('item-table')
    let cartItemsArray = cart.items
    cartItemsArray.map( item => {
        itemsTable.innerHTML += `
            <br></br>
            <tr>
                <td>${item.name}</td>
                <td>${item.item_count}</td>
                <td>$${item.price}</td>
                <td><button id="remove-button" data-description="item-${item.id}" style="font-size: 6px; height: 8px;">X</button></td>
            </tr>
        `
    })
}

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
