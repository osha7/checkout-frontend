class Cart {
    constructor(id, items, quantity, total, sales_tax) {
        this.id = id
        this.items = items
        this.quantity = quantity
        this.total = total
        this.sales_tax = sales_tax

        this.element = document.getElementById('item-table')

    }

    renderCartPage() {
        let cartItemsArray = this.items
        cartItemsArray.map( item => {
            this.element.innerHTML += `
                <br></br>
                <tr>
                    <td>${item.name}</td>
                    <td>${item.item_count}</td>
                    <td>$${item.price}</td>
                    <td><button id="remove-button" data-description="item-${item.id}" style="font-size: 6px; height: 8px;">X</button></td>
                </tr>
            `
            return this.element
        })
    }

}