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


}
