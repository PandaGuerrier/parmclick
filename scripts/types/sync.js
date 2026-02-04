import {cheese_total} from "../index.js"

const KEY = "parmesan"

function getStorage(game) {
    const localData = localStorage.getItem(KEY)
    if (!localData) {
        console.log("No local storage found, initializing...")
        localStorage.setItem(KEY, JSON.stringify(game.toJson()));
        return
    }

    game.fromJson(JSON.parse(localData))
    game.view.render()
}

function syncFromLocal(game) {
    // todo localStorage to front
    game.parmesan = 0
    game.parmesanByClick = 1
    game.autoParmesanPerSecond = 0
}

function resetLocalStorage(game) {
    game.reset()
    localStorage.setItem(KEY, JSON.stringify(game.toJson()));
    window.location.reload()
}

function saveToLocalStorage(game) {
    localStorage.setItem(KEY, JSON.stringify(game.toJson()));
}


export {getStorage, syncFromLocal, saveToLocalStorage, resetLocalStorage}