export class Options {
    constructor() {
        this.tab = "auto" // or "click"
    }

    switchTab(tabName) {
        this.tab = tabName
    }
}