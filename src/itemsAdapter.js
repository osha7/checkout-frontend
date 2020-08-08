// this file should handle DOM logic + functionality
// selectedElements
// eventListeners
// fetch requests

class itemsAdapter {
    constructor(baseURL) {
        this.baseURL = baseURL

        this.itemCardContainerDiv = document.getElementById('item-card-container')
        this.addToCartButton = document.getElementsByClassName('add-to-cart')[0]
        this.shoppingContainerDiv = document.getElementById('shopping-container')

        // this.document.addEventListener('click', this.addToCart)
        this.items = []
    }

    fetchAllItems = () => {
        fetch(this.baseURL)
            .then(function(resp) {
                
                return resp.json()
            })
            // .then(console.log)
            
            .then( json => {
                // debugger
                this.itemCardContainerDiv.innerHTML = ""
                json.forEach(itemObj => {
                    let item = new Item(itemObj)
                    this.items.push(item)
                    // debugger
                    
                    this.itemCardContainerDiv.appendChild(item.render())
                })
            })
            .catch(() => alert("Can’t access " + this.baseURL + " response. Blocked by browser?"))
    }

    // addItemCard({id, img_source, name, price, item_count, description, cart_id}) {
    //     return `
    //         <div id=item-${id}-card class="card">
    //             <img src=${img_source} class="item-image"/>
    //             <h2>${name}</h2>
    //             <p>Price: $${price} - Availability: ${item_count} <br>
    //                 ${description}</p>
    //             <button class="add-to-cart" data-item=${id}>Add Item To Cart</button>
    //             <p hidden id="item-cart-id">${cart_id}</p>
    //         </div>
    //     `
    // }

    // addToCart(e) {
    //     e.preventDefault()
    //     if (e.target.className === "add-to-cart") {
    //         newArray = cartArrayOfItems.map (item => item.id)
    //         if (newArray.includes(parseInt(e.target.dataset.item))) {
    //             alert("You already have this item in your cart!")
    //         } else {
    //         // debugger
    //         e.target.disabled = true
    //         e.target.innerText = "Item Added To Cart"
    //         let itemPath = `http://localhost:3000/items/${e.target.dataset.item}`
    //         // debugger
    //         const bodyData = {item: {
    //             cart_id: shoppingCartId
    //             }
    //           }
    //             fetch(itemPath, {
    //                 method: 'PATCH',
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Accept": "application/json"
    //                   },
    //                 body: JSON.stringify(bodyData)
    //             })
    //             .then(response => response.json())
    //     // optimistically change the shopping bag tally 
    //             .then(function(e) {
    //                 let i = document.getElementsByClassName('card').length
    //                 let counterTally = parseInt(shoppingCartCounter.innerText)
    //                 // if e.cart_id != true
    //                 // debugger
    //                 if (counterTally < i) {
    //                     counterTally++
    //                     shoppingCartCounter.innerText = `${counterTally}`
    //                 } else {
    //                     alert("That was all of the items available for sale!")
    //                 }
    //             })
    //             // .catch(err => {
    //             //     console.log(`Error: ${err}`)
    //             // })
    //             .catch(() => alert("Can’t access " + itemPath + " response."))
    //         }
    //     }
    // }

    
}
