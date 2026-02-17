import {items} from "../datas/items-default.js";

export class View {
    constructor() {
        this.game = null
    }

    #formatNumber(num) {
        return num.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }

    render() {
        this.#renderUser()
        this.#renderShop()
        this.#renderError()
        this.#renderParmesan()
        this.#renderFromoton()
        this.#renderChat()
    }

    #renderUser() {
        const userName = document.getElementById("user-name")
        if (this.game.user.name) {
            userName.innerText = `👤 ${this.game.user.name}`
        }
    }

    #renderChat() {
        const chatContainer = document.getElementById("ia-messages")
        chatContainer.innerHTML = ""
        if (!this.game.chat.messages) {
            this.game.chat.messages = []
        }
        if (this.game.chat.messages.length === 0) {
            const noMessageDiv = document.createElement("div")
            noMessageDiv.className = "text-amber-600/70 italic text-center py-4"
            noMessageDiv.innerText = "🧀 Posez une question sur le fromage !"
            chatContainer.appendChild(noMessageDiv)
            return
        }

        this.game.chat.messages.forEach(message => {
            const messageDiv = document.createElement("div")
            if (message.role === "user") {
                messageDiv.className = "ml-auto max-w-[80%] p-3 bg-amber-500 text-white rounded-xl rounded-br-sm text-sm"
            } else {
                messageDiv.className = "mr-auto max-w-[80%] p-3 bg-amber-700 text-white rounded-xl rounded-bl-sm text-sm"
            }
            messageDiv.innerText = message.content
            chatContainer.appendChild(messageDiv)
        })

        chatContainer.scrollTop = chatContainer.scrollHeight
    }

    #renderFromoton() {
        const container = document.querySelector('#cheese-container');
        const numberOfCheeses = this.game.autoParmesanPerSecond / 10;
        const radius = 150;

        const displayedCheeses = Math.min(
            Math.floor(Math.log10(numberOfCheeses + 1) * 5),
            30
        );

        container.innerHTML = '';

        for (let i = 0; i < displayedCheeses; i++) {
            const angle = (360 / displayedCheeses) * i;
            const img = document.createElement('img');
            img.src = './assets/img/small_cheese.png';
            img.className = 'absolute w-12 h-12 top-1/2 left-1/2';

            const scale = 0.8 + (displayedCheeses / 30) * 0.4;
            img.style.transform = `rotate(${angle}deg) translateY(-${radius}px) scale(${scale})`;

            container.appendChild(img);
        }
    }


    #renderParmesan() {
        const parmesanTotal = document.getElementById("cheese-total")
        parmesanTotal.innerText = `${this.#formatNumber(this.game.parmesan)} 🧀`

        const parmesanPerSecond = document.getElementById("cheese-per-second")
        parmesanPerSecond.innerText = `${this.#formatNumber(this.game.autoParmesanPerSecond)} 🧀/s`

        const parmesanByClick = document.getElementById("cheese-click")
        parmesanByClick.innerText = `1 click = ${this.#formatNumber(this.game.parmesanByClick)} 🧀`
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
            itemDiv.className = "bg-white p-5 rounded-xl m-2 h-58 shadow-md flex flex-col justify-between border border-amber-200 hover:shadow-lg hover:border-amber-300 transition-all"

            const name = document.createElement("h3")
            name.innerText = item.name
            name.className = "text-xl font-bold mb-2 text-amber-800"
            itemDiv.appendChild(name)

            const description = document.createElement("p")
            description.innerText = item.description
            description.className = "text-xs mb-2 text-amber-700/80"
            itemDiv.appendChild(description)

            const price = document.createElement("p")
            price.innerText = `💰 Prix: ${this.#formatNumber(itemShop.price)} 🧀`
            price.className = "text-orange-700 font-semibold"
            itemDiv.appendChild(price)

            const quantity = document.createElement("p")
            quantity.innerText = `📦 Quantité: ${itemShop.quantity}`
            quantity.className = "text-amber-700"
            itemDiv.appendChild(quantity)

            const clicksInfo = document.createElement("p")
            if (item.auto) {
                clicksInfo.innerText = `⚡ Génère ${this.#formatNumber(itemShop.clicks)} 🧀 /s`
            } else {
                clicksInfo.innerText = `🖱️ Ajoute ${this.#formatNumber(itemShop.clicks)} 🧀 /click`
            }
            clicksInfo.className = "text-amber-600 font-medium"
            itemDiv.appendChild(clicksInfo)

            const buyButton = document.createElement("button")
            buyButton.innerText = "🛒 Acheter"
            if (this.game.parmesan < itemShop.price) {
                buyButton.disabled = true
                buyButton.className = "bg-gray-300 text-gray-500 px-4 py-2.5 rounded-lg mt-4 w-full cursor-not-allowed font-semibold"
            } else {
                buyButton.disabled = false
                buyButton.className = "bg-amber-500 text-white px-4 py-2.5 rounded-lg mt-4 w-full hover:bg-amber-600 hover:scale-105 active:scale-95 transition font-semibold"
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