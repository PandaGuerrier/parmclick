export default class ErrorsView {
    constructor(errors) {
        this.errors = errors; // comme: { 'field': 'error message' }
    }

    render() {
        for (const error of this.errors) {
            const errorElement = document.getElementById("error-" + error.field);
            if (errorElement) {
                errorElement.textContent = error.message;
                errorElement.style.display = 'block';
            }
        }
    }
}