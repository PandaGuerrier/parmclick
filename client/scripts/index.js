import { Game } from "./types/game.js";
import {getStorage, resetLocalStorage, saveToLocalStorage} from "./types/sync.js";

const game = new Game()

window.addEventListener('load', () => {
    game.init()

    getStorage(game)
    game.view.render()

    // Définir le tab par défaut (click)
    autoUpgrade_button.classList.add("bg-amber-500", "text-white")
})


setInterval(() => {
    saveToLocalStorage(game)
    console.log("Game saved automatically.")
}, 5000);


export const cheese_total = document.getElementById("cheese-total")
export const cheese_to_click_img = document.getElementById("cheese_to_click")
export const save_button = document.getElementById("save-button")
export const reset_button = document.getElementById("reset-button")
export const clickUpgrade_button = document.getElementById("clicks-upgrades-button")
export const autoUpgrade_button = document.getElementById("auto-upgrades-button")
export const iaInput = document.getElementById("ia-input")
export const iaSendButton = document.getElementById("ia-send")

iaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        iaSendButton.click()
    }
})

iaSendButton.addEventListener('click', () => {
    const message = iaInput.value.trim()
    if (message.length === 0) return
    game.chat.send(message)
    iaInput.value = ""
})



save_button.addEventListener('click', () => {
    saveToLocalStorage(game)
})

autoUpgrade_button.addEventListener('click', () => {
    game.options.switchTab("auto")
    autoUpgrade_button.classList.add("bg-amber-500", "text-white")
    clickUpgrade_button.classList.remove("bg-amber-500", "text-white")
    game.view.render()
})

clickUpgrade_button.addEventListener('click', () => {
    game.options.switchTab("click")
    clickUpgrade_button.classList.add("bg-amber-500", "text-white")
    autoUpgrade_button.classList.remove("bg-amber-500", "text-white")
    game.view.render()
})


cheese_to_click_img.addEventListener('click', () => {
    game.addParmesan(game.parmesanByClick)
})


reset_button.addEventListener('click', () => {
    resetLocalStorage(game)
})