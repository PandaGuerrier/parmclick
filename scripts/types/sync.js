import {cheese_total} from "../index.js"
import {Game} from "./game.js"

const KEY = "cheese_total"
const KEY2 = "cheese_click"
const KEY3 = "cheese_per_second"

function getStorage() {
    if (!localStorage.getItem(KEY) || !localStorage.getItem(KEY2) || !localStorage.getItem(KEY3)) {
        localStorage.setItem(KEY, "0")
        localStorage.setItem(KEY2, "1")
        localStorage.setItem(KEY3, "0")
    }
    JSON.parse(localStorage.getItem(KEY)) // string to JSON
    JSON.parse(localStorage.getItem(KEY2))
    JSON.parse(localStorage.getItem(KEY3))
}

function syncFromLocal(game) {
    // todo localStorage to front
    game.parmesan = 0
    game.parmesanByClick = 1
    game.autoParmesanPerSecond = 0
}

function resetLocalStorage() {
    localStorage.setItem(KEY, JSON.stringify(0));
    localStorage.setItem(KEY2, JSON.stringify(1));
    localStorage.setItem(KEY3, JSON.stringify(0));

    window.location.reload()
}

function saveToLocalStorage(game) {
    localStorage.setItem(KEY, JSON.stringify(game.parmesan));
    localStorage.setItem(KEY2, JSON.stringify(game.parmesanByClick));
    localStorage.setItem(KEY3, JSON.stringify(game.autoParmesanPerSecond));

    window.location.reload()
}


export {getStorage, syncFromLocal, saveToLocalStorage, resetLocalStorage}