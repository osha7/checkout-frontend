// document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

const main = document.querySelector('#main')
    main.innerHTML += `
    <div id='shopping-container'><div>
    `
const shoppingContainer = document.getElementById('shopping-container')

const divAddHeader = document.createElement('div')
    divAddHeader.id = 'header-div'
    shoppingContainer.appendChild(divAddHeader)
const addHeader = document.createElement('h1')
    addHeader.innerText = 'Ware'
    divAddHeader.appendChild(addHeader)

const cartImageContainer = document.createElement('div')
    cartImageContainer.className = 'shopping-cart-counter'
    shoppingContainer.appendChild(cartImageContainer)
    cartImageContainer.innerHTML += `
    <div class='shopping-cart-image'></div>
    <div class='cart-counter'>1</div>
    `
const cartImage = document.getElementsByClassName('shopping-cart-image')[0]
    cartImage.innerHTML += `
    <i class='fas fa-shopping-bag' style='font-size:36px'></i>
    `

const divAddItem = document.createElement('div')
    divAddItem.id = 'add-new-item'
    shoppingContainer.appendChild(divAddItem)

const divItemCard = document.createElement('div')
    divItemCard.id = 'item-card-container'
    shoppingContainer.appendChild(divItemCard)

// function addItemDiv(e) {
//     divAddItem.innerHTML = `
//     <inn
//     `
// }
const itemUrl = "http://localhost:3000/items"
// let seePromiseFromFetch = fetch(itemUrl)

document.addEventListener('DOMContentLoaded', function(e) {
    // debugger
    fetch(itemUrl)
        .then(function(resp) {
            return resp.json()
        })
        // .then(console.log)
        
        .then(function(json) {
            json.forEach(addItemCard)
            // addItemCard(json);
            // need to .map on this json object
        })
        .catch(() => alert("Can’t access " + itemUrl + " response. Blocked by browser?"))
})

function addItemCard(item) {
    let cardContainer = document.getElementById('item-card-container')
    cardContainer.innerHTML += `
        <div id=item-${item.id}-card class="card">
            <img src=${item.img_source} class="item-image"/>
            <h2>${item.name}</h2>
            <p>Price: $${item.price} - Availability: ${item['item_count']} <br>
                ${item.description}</p>
            <button class="add-to-cart" data-item=${item.id}>Add Item To Cart</button>
        </div>
    `
}

// let itemCard = document.querySelector('.card')

divItemCard.addEventListener('click', function(e) {
    if (e.target.className == "add-to-cart") {
        // console.log(e.target.dataset.item)
        let itemCard = document.getElementById(`item-${e.target.dataset.item}-card`)
        console.log(itemCard)
    }

})

cartImageContainer.addEventListener('click', function(e) {
    if (e.target.className == "fas fa-shopping-bag") {
    let shoppingArea = document.getElementById('shopping-container')
    shoppingArea.innerHTML = " "
    showCurrentCart()
    }
})

const cartUrl = "http://localhost:3000/create-or-return-cart"
const showCurrentCart = function() {
    fetch(cartUrl)
        .then(resp => resp.json())
        .then(json => renderCartPage(json))
}

function renderCartPage(cart) {
    // debugger
    main.innerHTML += `
    <div id=cart-${cart.id} class="cart-container">
    <h1>Cart</h1>
        <div id="container" class="cart-card-container">
            <div id="card" class="cart-card">
                <div class="cart-items">
                    <table id="item-table" style="width:100%">
                        <tr style="font-size: 22px; text-decoration: underline;">
                            <th>Item Name</th>
                            <th>#</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div id="button" class="shop-return">
        <button class="return-to-shop">Shop</button>
    </div>
    `
    let itemsTable = document.getElementById('item-table')
    let cartItemsArray = cart.items
    cartItemsArray.forEach( item => {
        itemsTable.innerHTML += `
            <br></br>
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
                <td><button id="remove-button" data-description="item-${item.id}" style="font-size: 6px; height: 8px;">X</button></td>
            </tr>
        `
    })
}







// ADDING TASKS (task lister lite)
//event listener (for adding list items):

// function createNewTask(e) {
//     e.preventDefault()
//     let input = taskDescription;
//     tasks.innerHTML += `<li>${input.value} <button id="remove-button" data-description="${input.value}">X</button></li>`;
//     event.target.reset()
//   }
// function removeTaskButton(e) {
//     if ( e.target.id == "remove-button") {
//       e.target.parentElement.remove();
//     }
//   }

document.addEventListener('click', )