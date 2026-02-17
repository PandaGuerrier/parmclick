export default class ApiManager {
    constructor(headers = {}) {
        this.baseUrl = "http://localhost:8000";
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...headers
            }
        });
    }
}