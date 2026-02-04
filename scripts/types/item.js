export class Item {
    constructor(name, price, quantity, auto = false) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.auto = auto;
    }

    init() {
        if (!this.auto) {
            return; // auto incremente game
        }
    }

    toJson() {
        return {
            name: this.name,
            price: this.price,
            quantity: this.quantity,
            auto: this.auto
        };
    }

    static fromJson(item) {
        return new Item(
            item.name,
            item.price,
            item.quantity,
            item.auto
        )
    }
}