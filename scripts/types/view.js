import {items} from "../datas/items-default.js";

export class View {
    constructor() {
        this.game = null
    }

    render() {
        console.log("rendering")
        this.#renderShop()
        this.#renderError()
        this.#renderParmesan()
        this.#renderFromoton()
    }

    #renderFromoton() {
        const container = document.querySelector('#cheese-container');
        const numberOfCheeses = this.game.autoParmesanPerSecond / 10;
        const radius = 150;

        for (let i = 0; i < numberOfCheeses; i++) {
            const angle = (360 / numberOfCheeses) * i;
            const img = document.createElement('img');
            img.src = './assets/img/small_cheese.png';
            img.className = 'absolute w-12 h-12 top-1/2 left-1/2';
            img.style.transform = `rotate(${angle}deg) translateY(-${radius}px)`;
            container.appendChild(img);
        }
    }


    #renderParmesan() {
        const parmesanTotal = document.getElementById("cheese-total")
        parmesanTotal.innerText = `${this.game.parmesan.toFixed(2)} 🧀`

        const parmesanPerSecond = document.getElementById("cheese-per-second")
        parmesanPerSecond.innerText = `${this.game.autoParmesanPerSecond.toFixed(2)} 🧀/s`

        const parmesanByClick = document.getElementById("cheese-click")
        parmesanByClick.innerText = `1 click = ${this.game.parmesanByClick.toFixed(2)} 🧀`
    }

    #renderError() {
        const errorDiv = document.getElementById("error-message")
        if (this.game.error) {
            errorDiv.innerText = this.game.error
            errorDiv.style.display = "block"
        } else {
            errorDiv.innerText = ""
            errorDiv.style.display = "none"
        }
    }

    #renderShop() {
        const shop = document.getElementById("items-shop")
        shop.innerHTML = ""
        items.forEach(item => {
            let itemShop = this.game.shop.items.find(i => i.id === item.id)
            if (!itemShop) {
                this.game.shop.items.push(item)
                itemShop = this.game.shop.items.find(i => i.id === item.id)
            }

            const itemDiv = document.createElement("div")
            itemDiv.className = "bg-blue-100 p-4 rounded-lg m-2 h-58 shadow-md flex flex-col justify-between"

            const name = document.createElement("h3")
            name.innerText = item.name
            name.className = "text-2xl font-bold mb-2 underline"
            itemDiv.appendChild(name)

            const description = document.createElement("p")
            description.innerText = item.description
            description.className = "text-xs mb-2"
            itemDiv.appendChild(description)

            const price = document.createElement("p")
            price.innerText = `Prix: ${itemShop.price} 🧀`
            price.className = ""
            itemDiv.appendChild(price)

            const quantity = document.createElement("p")
            quantity.innerText = `Quantité: ${itemShop.quantity}`
            quantity.className = ""
            itemDiv.appendChild(quantity)

            const clicksInfo = document.createElement("p")
            if (item.auto) {
                clicksInfo.innerText = `Génère ${itemShop.clicks} 🧀 /s`
            } else {
                clicksInfo.innerText = `Ajoute ${itemShop.clicks} 🧀 /click`
            }
            clicksInfo.className = ""
            itemDiv.appendChild(clicksInfo)

            const buyButton = document.createElement("button")
            buyButton.innerText = "Acheter"
            console.log("Comparing parmesan", this.game.parmesan, "with price", itemShop.price)
            if (this.game.parmesan < itemShop.price) {
                buyButton.disabled = true
                buyButton.className = "bg-gray-400 text-white px-4 py-2 rounded mt-5 w-full cursor-not-allowed"
            } else {
                buyButton.disabled = false
                buyButton.className = "bg-green-500 text-white px-4 py-2 rounded mt-5 w-full active:scale-95"
            }

            buyButton.onclick = () => {
                this.game.shop.buy(item.id)
                this.render()
            }
            itemDiv.appendChild(buyButton)

            shop.appendChild(itemDiv)
        })
    }
}