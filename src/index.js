document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

// local environment:
baseURL = "http://localhost:3000"

// heroku deployed app:
// baseURL = "https://young-mountain-89222.herokuapp.com"

const itemUrl = baseURL + "/items"
const cartUrl = baseURL + "/create-or-return-cart"
let cA = new cartsAdapter(baseURL + '/create-or-return-cart')
let iA = new itemsAdapter(baseURL + '/items')
let newCart



const loader = document.querySelector('.preload');
const emoji = loader.querySelector('.emoji');
const emojis = ["🕑", "🕐", "🕜","🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢",  "🕗", "🕣", "🕘", "🕤", "🕙",  "🕥", "🕚", "🕦",  "🕛", "🕧"];
const interval = 500;

const loadEmojis = (arr) => {
    setInterval(() => {
      emoji.innerText = arr[Math.floor(Math.random() * arr.length)];
      //console.log(Math.floor(Math.random() * arr.length))
    }, interval);
}
const init = () => {
    loadEmojis(emojis);
}
  
init();


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

// let sortButtonDiv = document.createElement('div')
// sortButtonDiv.id = "sort-button-div"
// sortButtonDiv.innerHTML += '<button class="sort-button">'
// main.appendChild(sortButtonDiv) 


// let seePromiseFromFetch = fetch(itemUrl)

document.addEventListener('DOMContentLoaded', () => {
//    debugger
    iA.fetchAllItems()
    fetchCurrentCart()
})
// document.addEventListener('DOMContentLoaded', fetchCurrentCart)
// function newSortedItems () {

//     fetch(cartURL)
//     // response
//     .then(response => response.json())
//     // what to do with json
//     .then(json => {
//         debugger
//     })
// }



function fetchCurrentCart () {
    fetch(cartUrl)
        .then(resp => resp.json())
        // debugger
        // .then(json => (json))
        .then(function(json) {
            shoppingCartCounter.innerText = `${json.items.length}`
            shoppingCartId = json.id
            cartArrayOfItems = json.items
            newCart = new Cart(json)
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
        e.target.innerText = "Item Added To Cart"
        let itemPath = baseURL + `/items/${e.target.dataset.item}`
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
   
        let removeItemPath = baseURL + `/items/${targetItemId}`

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
            // .then(json => console.log(json))
            // .then(function(e) {
            //     return
            // })
            .then(() => {
                // debugger
                document.querySelector('#cart-total-element').firstElementChild.innerText = (parseInt(document.querySelector('#cart-total-element').firstElementChild.innerText) - parseInt(e.target.parentElement.parentElement.querySelector('.td-price').firstElementChild.innerText))
                e.target.parentElement.parentElement.remove()
            })
            // .then(newCart.renderTotal())

            .catch(() => alert("Can’t access " + removeItemPath + " response."))
            
    }
    // newCart.renderTotal() 
    
})

document.addEventListener('click', function(e) {
    if (e.target.className === "return-to-shop") {
        iA.fetchAllItems()
        fetchCurrentCart()
        showCart = !showCart
        if (showCart != true) {
            document.getElementById('item-table').innerHTML = ""
            shoppingContainerDiv.style.display = "block";
            cartContainerDiv.style.display = "none";
        }
    }
})


// chose:

// 1.  thru a fetch request 
// grab all items 
// sort by name
// delete all items on the DOM
// render this fetch

// 2. search bar
// event listener reads value 
// name = exact name of item
// whole name
// fetch all items
// return only item that has exact name
// delete all DOM
// push onto DOM

// if no entry in search bar = return all

// not allowed to use stack overflow

