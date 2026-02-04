import {Shop} from "./shop.js";
import {syncFromLocal} from "./sync.js";
import { View } from "./view.js"

export class Game {
    constructor() {
        this.shop = new Shop()
        this.view = new View()
        this.parmesan = 0 // points game name
        this.autoParmesanPerSecond = 0
        this.parmesanByClick = 1
        this.items = []
        this.error = null
        this.intervalId = null
    }

    init() {
        console.log("Started init game")
        syncFromLocal()
        this.shop.game = this
        this.view.game = this
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
}