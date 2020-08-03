

const main = document.querySelector('#main')

const divAddItem = document.createElement('div')
    divAddItem.id = 'add-new-item'
    main.appendChild(divAddItem)

// const divAddHeader = document.createElement('div')
//     divAddHeader.id = 'header-div'
//     main.appendChild(divAddHeader)
const addHeader = document.createElement('h1')
    addHeader.innerText = 'Ware'
    main.appendChild(addHeader)

const divItemCard = document.createElement('div')
    divItemCard.id = 'item-card-container'
    main.appendChild(divItemCard)

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
    // cardContainer.innerHTML += `
    //     <div id=${item['id']} class="card">
    //     <img src=${item['img_source']} class="item-image"/>
    //     <h2>${item['name']}</h2>
    //     <p>Price: $${item['price']} - Availability: ${item['item_count']} <br>
    //     ${item['description']}</p>
    //     <button class="add-to-cart" data-item=${item.id}>Add Item To Cart</button>
    //     </div>
    // `
    cardContainer.innerHTML += `
        <div id=${item.id} class="card">
        <img src=${item.img_source} class="item-image"/>
        <h2>${item.name}</h2>
        <p>Price: $${item.price} - Availability: ${item['item_count']} <br>
        ${item.description}</p>
        <button class="add-to-cart" data-item=${item.id}>Add Item To Cart</button>
        </div>
        
    `
}





