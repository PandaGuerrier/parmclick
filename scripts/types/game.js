import {Shop} from "./shop.js";
import {syncFromLocal} from "./sync.js";
import { View } from "./view.js"
import {Options} from "./options.js";
import {Chat} from "./chat.js";

export class Game {
    constructor() {
        this.shop = new Shop()
        this.view = new View()
        this.options = new Options()
        this.chat = new Chat()
        this.parmesan = 0 // points game name
        this.autoParmesanPerSecond = 0
        this.parmesanByClick = 1
        this.items = []
        this.error = null
        this.intervalId = null
    }

    init() {
        console.log("Started init game")
        syncFromLocal(this)
        this.shop.game = this
        this.view.game = this
        this.chat.game = this
        this.shop.init()
        this.view.render()

        this.intervalId = setInterval(() => {
            this.addParmesan(this.autoParmesanPerSecond)
        }, 1000);
    }

    addParmesan(num) {
        this.parmesan += num;
        this.view.render()
    }

    removeParmesan(num) {
        this.parmesan -= num;
        if (this.parmesan < 0) this.parmesan = 0
        this.view.render()
    }

    toJson() {
        return {
            parmesan: this.parmesan,
            autoParmesanPerSecond: this.autoParmesanPerSecond,
            parmesanByClick: this.parmesanByClick,
            items: [...this.shop.toJson()],
            chat: this.chat.toJson()
        }
    }

    fromJson(json) {
        this.parmesan = json.parmesan
        this.autoParmesanPerSecond = json.autoParmesanPerSecond
        this.parmesanByClick = json.parmesanByClick
        this.shop.items = json.items.map(itemJson => {
            const item = this.shop.items.find(i => i.id === itemJson.id)
            if (item) {
                item.quantity = itemJson.quantity
                item.price = itemJson.price
                item.clicks = itemJson.clicks
                item.auto = itemJson.auto
                item.name = itemJson.name
                item.description = itemJson.description
            }
            return item
        })
        this.chat.fromJson(json.chat)
        this.view.render()
    }

    reset() {
        this.parmesan = 0
        this.autoParmesanPerSecond = 0
        this.parmesanByClick = 1
        this.shop.items = []
        this.error = null
        this.chat.messages = []
    }
}