import ErrorsView from "./entities/errors-view.js";
import ApiManager from "./entities/api_manager.js";

const form = document.getElementById('register-form');
const apiManager = new ApiManager();

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const error = new ErrorsView([]);

    console.log('Form submitted');
    const email = e.target.email.value;
    const password = e.target.password.value;

    const body = {
        email: email,
        password: password,
    };

    console.log('Sending registration data:', body);

    const response = await apiManager.axiosInstance.post('/login', body).catch(err => {
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
        const token = response.data.token;
        localStorage.setItem('token', token);

        console.log('Token stored in localStorage:', token);
    //    window.location.href = '/';
    }
});

