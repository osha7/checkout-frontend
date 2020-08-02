

const main = document.querySelector('#main')

const divAddItem = document.createElement('div')
    divAddItem.id = 'add-new-item'
    main.appendChild(divAddItem)

const divAddHeader = document.createElement('div')
    divAddHeader.id = 'header-div'
    main.appendChild(divAddHeader)
const addHeader = document.createElement('h1')
    addHeader.innerText = 'Ware'
    divAddHeader.appendChild(addHeader)

const divItemCard = document.createElement('div')
    divItemCard.id = 'item-card-container'
    main.appendChild(divItemCard)

// function addItemDiv(e) {
//     divAddItem.innerHTML = `
//     <inn
//     `
// }

document.addEventListener('DOMContentLoaded', function(e) {
    fetch("http://localhost:3000/items")
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            addItemCard(json);
        })
})

function addItemCard(item) {
    let cardContainer = document.getElementById('item-card-container')
    cardContainer.innerHTML += `
        <div class="card">
        <img src=${item['img_source']} class="item-image" />
        <h2 id=${item['id']}></h2>
        <p>Price: $${item['price']}</p>
        <p>Availability: ${item['item_count']}</p>
        <p>${item['description']}</p>
        <button class="add-to-cart">Add Item To Cart</button>
        </div>
    `
}



