import {items} from "../datas/items-default.js";

export class Shop {
    constructor(game, items) {
        this.items = items ?? []
        this.game = game
    }

    init() {
        console.log("init shop")
    }

    buy(itemId) {
        let shopItem = this.items.find((i) => i.id === itemId)

        if (!shopItem) {
            const item = items.find((i) => i.id === itemId)

            if (!item) {
                console.error("Item not found", itemId)
                return
            }

            this.items.push(item)
            shopItem = this.items.find((i) => i.id === itemId)
        }

        console.log("Buying item", shopItem)
        if (this.game.parmesan < shopItem.price) {
            console.error("Not enough parmesan")
            this.game.error = "Not enough parmesan to buy this item."
            this.game.view.render()
            return
        }

        shopItem.quantity += 1
        this.game.removeParmesan(shopItem.price)

        shopItem.price = (shopItem.price * 1.15).toFixed(2)

        if (shopItem.auto) {
            this.game.autoParmesanPerSecond += shopItem.clicks
        } else {
            this.game.parmesanByClick += shopItem.clicks
        }

        this.game.error = null
        this.game.view.render()
    }

    toJson() {
        return {
            ...this.items.map((item) => item.toJson())
        };
    }
}