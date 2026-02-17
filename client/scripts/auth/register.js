import ErrorsView from "./entities/errors-view.js";
import ApiManager from "./entities/api_manager.js";

const form = document.getElementById('register-form');
const apiManager = new ApiManager();

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const error = new ErrorsView([]);

    console.log('Form submitted');

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
        error.errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
        error.render();
        return;
    }

    const body = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    };

    console.log('Sending registration data:', body);

    const response = await apiManager.axiosInstance.post('/register', body).catch(err => {
        if (err.response && err.response.data) {
            const apiErrors = err.response.data;

            console.error('API errors:', apiErrors);
            for (const field in apiErrors) {
                error.errors.push({ field, message: apiErrors[field] });
            }
            error.render();
        } else {
            console.error('An unexpected error occurred:', err);
        }
    });

    console.log('API response:', response);

    if (response && response.status === 201) {
        console.log('Registration successful:', response.data);
    }
});

