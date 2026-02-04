import { Game } from "./types/game.js";
import {getStorage, resetLocalStorage} from "./types/sync.js";

const game = new Game()

window.addEventListener('load', () => {
    game.init()
})

export const cheese_total = document.getElementById("cheese-total")
export const cheese_click = document.getElementById("cheese-click")
export const cheese_per_second = document.getElementById("cheese-per-second")
export const cheese_to_click_img = document.getElementById("cheese_to_click")
export const load_button = document.getElementById("load-button")
export const save_button = document.getElementById("save-button")
export const reset_button = document.getElementById("reset-button")

cheese_to_click_img.addEventListener('click', (e) => {
    game.addParmesan(game.parmesanByClick)
})

load_button.addEventListener('click', (e) => {
    getStorage()
})

reset_button.addEventListener('click', (e) => {
    resetLocalStorage()
})