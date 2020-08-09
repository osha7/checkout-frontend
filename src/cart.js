class Cart {
    constructor({id, items, quantity, total, sales_tax}) {
        this.id = id
        this.items = items
        this.quantity = quantity
        this.total = total
        this.sales_tax = sales_tax

        this.element = document.getElementById('item-table')
        this.priceArray = []
        this.reducer = (accumulator, currentValue) => accumulator + currentValue

        this.element2 = document.getElementById('cart-total')
        
    }

    renderCartPage() {
        let cartItemsArray = this.items
        // debugger
        
        cartItemsArray.map( item => {
            // this.element.innerHTML = ""
            this.element.innerHTML += `
                <br></br>
                <tr>
                    <td class="td-name">${item.name}</td>
                    <td class="td-count">${item.item_count}</td>
                    <td class="td-price">$<span>${item.price}</span></td>
                    <td><button id="remove-button" class="remove-item" data-description="item-${item.id}" style="font-size: 6px; height: 8px;">X</button></td>
                </tr>
            `
            this.priceArray.push(parseInt(`${item.price}`))
            // return this.element
        })
    
        this.renderTotal()
    }


    renderTotal = () => {
        //  debugger
        if (this.priceArray.length === 0) {
            this.total = 0
            this.element2.innerHTML = ""
            this.element2.innerHTML += `
                <p>Cart Total: $0.00</p>
            ` 
        } else {
            // console.log((this.priceArray).reduce(this.reducer));
            this.priceReduced = (this.priceArray).reduce(this.reducer) 
        
        this.element2.innerHTML = ""
        this.element2.innerHTML += `
            <p id="cart-total-element">Cart Total: $<span>${this.priceReduced}</span>.00</p>
        `
        this.total = this.priceReduced
        // debugger
        }
    }

}


        // (`${item.price}`)
       