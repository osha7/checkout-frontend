class Item {
    constructor({id, name, price, description, img_source, available, item_count, cart_id}) {
        this.id = id
        this.name = name
        this.price = price
        this.description = description
        this.img_source = img_source
        this.available = available
        this.item_count = item_count
        this.cart_id = cart_id

        this.element = document.createElement('div')
        this.element.id = `item-${this.id}-card`
        this.element.className = "card"

    }

    render() {
        // debugger
        this.element.innerHTML = `
                <div class="item-image-container">
                    <img src="${this.img_source}" class="item-image"/>
                </div>
                <div class="content-div">
                    <h2>${this.name}</h2>
                    <p>Price: $${this.price} - Availability: ${this.item_count}</p>
                    <p>${this.description}</p>
                </div>
                <div class="add-item-button">
                    <button class="add-to-cart" data-item=${this.id}>Add Item To Cart</button>
                </div>
                <p hidden id="item-cart-id">${this.cart_id}</p>
        `
        return this.element
    }
}
