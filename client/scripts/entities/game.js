import {Shop} from "./shop.js";
import {View} from "./view.js"
import {Options} from "./options.js";
import {Chat} from "./chat.js";
import ApiManager from "../auth/entities/api_manager.js";

export class Game {
    constructor() {

        this.user = {
            uuid: null,
            name: null,
            email: null,
            createdAt: null
        }
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
        this.apiManager = new ApiManager({
            Authorization: `Bearer ${localStorage.getItem("token")}`
        })
    }

    init() {
        console.log("Started init game")
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
        const gameData = JSON.parse(json.data)
        console.log("Game data from server:", gameData)
        this.user = {
            uuid: json.uuid || null,
            name: json.name || null,
            email: json?.email || null,
            createdAt: json?.createdAt || null
        }
        this.parmesan = gameData.parmesan || 0
        this.autoParmesanPerSecond = gameData.autoParmesanPerSecond || 0
        this.parmesanByClick = gameData.parmesanByClick || 1
        this.shop.items = (gameData.items || []).map(itemJson => {
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
        this.chat.fromJson(gameData.chat || [])
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