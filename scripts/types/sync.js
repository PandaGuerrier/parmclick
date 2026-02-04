import {cheese_total} from "../index.js"

const KEY = "cheese_total"
const KEY2 = "cheese_click"
const KEY3 = "cheese_per_second"

function getStorage() {
    if (!localStorage.getItem(KEY) || !localStorage.getItem(KEY2) || !localStorage.getItem(KEY3)) {
        localStorage.setItem(KEY, JSON.stringify(0))
        localStorage.setItem(KEY2, JSON.stringify(1))
        localStorage.setItem(KEY3, JSON.stringify(0))
    }
    JSON.parse(localStorage.getItem(KEY)) // string to JSON
    JSON.parse(localStorage.getItem(KEY2))
    JSON.parse(localStorage.getItem(KEY3))
}

function syncFromLocal() {
    // todo
}

function resetLocalStorage() {
    localStorage.setItem(KEY, JSON.stringify(0));
    localStorage.setItem(KEY2, JSON.stringify(1));
    localStorage.setItem(KEY3, JSON.stringify(0));
    getStorage()
}

function saveToLocalStorage(game) {
    localStorage.setItem(KEY, JSON.stringify(game));
}


export {getStorage, syncFromLocal, saveToLocalStorage, resetLocalStorage}