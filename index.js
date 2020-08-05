document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
const itemUrl = "http://localhost:3000/items"
const cartUrl = "http://localhost:3000/create-or-return-cart"

const main = document.querySelector('#main')
    main.innerHTML += `
    <div id='shopping-container'>
        <div id="header-div">
            <h1>Ware</h1>
        </div>
        <div class="shopping-cart-counter">
            <div class='shopping-cart-image'>
                <i class='fas fa-shopping-bag' style='font-size:36px'></i>
            </div>
            <div class='cart-counter'>1</div>
        </div>
        <div id="add-new-item"></div>
        <div id="item-card-container"></div>
    </div>
    `

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
            json.forEach(addItemCard)
            // addItemCard(json);
            // need to .map on this json object
        })
        .catch(() => alert("Can’t access " + itemUrl + " response. Blocked by browser?"))
}

function addItemCard(item) {
    let cardContainer = document.getElementById('item-card-container')
    cardContainer.innerHTML += `
        <div id=item-${item.id}-card class="card">
            <img src=${item.img_source} class="item-image"/>
            <h2>${item.name}</h2>
            <p>Price: $${item.price} - Availability: ${item['item_count']} <br>
                ${item.description}</p>
            <button class="add-to-cart" data-item=${item.id}>Add Item To Cart</button>
            <p hidden id="item-cart-id">${item.cart_id}</p>
        </div>
    `
}
let shoppingCartId = 0

function fetchCurrentCart () {
    fetch(cartUrl)
        .then(resp => resp.json())
        // debugger
        // .then(json => (json))
        .then(function(json) {
            let shoppingCartCounter = document.getElementsByClassName('cart-counter')[0]
            shoppingCartCounter.innerText = `${json.items.length}`
            shoppingCartId = json.id
        })
        .catch(() => alert("Can’t access " + cartUrl + " response."))
}



document.addEventListener('click', function(e) {
    e.preventDefault()
    if (e.target.className == "add-to-cart") {
        // debugger
        // console.log(e.target.dataset.item)
        // let itemCardDiv = document.getElementById(`item-${e.target.dataset.item}-card`)
        // console.log(itemCardDiv)
        // let cartId = document.getElementById('item-cart-id').innerText
        let itemPath = `http://localhost:3000/items/${e.target.dataset.item}`
        // debugger
        const bodyData = {item: {
            cart_id: shoppingCartId
            }
          }
            fetch(itemPath, {
                // credentials: 'include',
                // mode: 'cors',
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                body: JSON.stringify(bodyData)
            })
            .then(response => response.json())

            .then(console.log)
            
            // .catch(err => {
            //     console.log(`Error: ${err}`)
            // })
            .catch(() => alert("Can’t access " + itemPath + " response."))

       
// !!!!!!!!!!! need to optimistically change the shopping bag tally 
    }
})



document.addEventListener('click', function(e) {
    if (e.target.className == "fas fa-shopping-bag") {
    let shoppingArea = document.getElementById('shopping-container')
    shoppingArea.innerHTML = " "
    showCurrentCart()
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
    cartItemsArray.map( item => {
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

document.addEventListener('click', function(e) {
    if (e.target.className == "return-to-shop") {
        // debugger
        let cartArea = document.getElementsByClassName('cart-container')[0]
        cartArea.innerHTML = " "
        
        fetchAllItems()
    }
})





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

