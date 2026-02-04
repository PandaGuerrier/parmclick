import {cheese_total} from "../index.js"

const KEY = "parmesan"

function getStorage(game) {
    game.fromJson(JSON.parse(localStorage.getItem(KEY)))
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
    localStorage.setItem(KEY, JSON.stringify(game.toJson()));
}


export {getStorage, syncFromLocal, saveToLocalStorage, resetLocalStorage}