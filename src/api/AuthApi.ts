import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/auth-api/',
    withCredentials: true,
});

export const authApi = {
    login(phone: string, password: string) {
        return instance.post('login/', {password, phone}).then(response => response)
    },
    logout() {
        return instance.post('logout/').then(response => response.status)
    },
    checkAuth() {
        return instance.get('check-auth/').then(response => response.data)
    },
    register(phone: string, password: string) {
        return instance.post('register/', {password: password, phone: phone}).then(response => response)
    }
}