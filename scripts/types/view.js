import {items} from "../datas/items-default.js";

export class View {
    constructor() {
        this.game = null
    }

    render() {
        this.#renderShop()
        this.#renderError()
        this.#renderParmesan()
        this.#renderFromoton()
    }

    #renderFromoton() {
        const container = document.querySelector('#cheese-container');
        const numberOfCheeses = this.game.autoParmesanPerSecond / 10;
        const radius = 150;

        // Scaling logarithmique pour les grands nombres
        const displayedCheeses = Math.min(
            Math.floor(Math.log10(numberOfCheeses + 1) * 5),
            30
        );

        // Ou progression par paliers
        // const displayedCheeses = Math.min(Math.ceil(Math.sqrt(numberOfCheeses)), 25);

        container.innerHTML = '';

        for (let i = 0; i < displayedCheeses; i++) {
            const angle = (360 / displayedCheeses) * i;
            const img = document.createElement('img');
            img.src = './assets/img/small_cheese.png';
            img.className = 'absolute w-12 h-12 top-1/2 left-1/2';

            // Option: varier la taille selon le niveau
            const scale = 0.8 + (displayedCheeses / 30) * 0.4;
            img.style.transform = `rotate(${angle}deg) translateY(-${radius}px) scale(${scale})`;

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
        const tabOption = this.game.options.tab
        items.forEach(item => {
            let itemShop = this.game.shop.items.find(i => i.id === item.id)
            if (!itemShop) {
                this.game.shop.items.push(item)
                itemShop = this.game.shop.items.find(i => i.id === item.id)
            }

            if (tabOption === "auto" && !item.auto) return
            if (tabOption === "click" && item.auto) return

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