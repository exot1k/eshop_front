import axios from "axios";
import {customerProfileType} from "../types/types";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    withCredentials: true,
});

export const api = {
    getShoes(filterParams = {}) {

        const params = {
            ...filterParams
        }

        return instance.get('shoes/', {params}).then(response => response)
    },
    getShoesType() {
        return instance.get('shoes-type/').then(response => response)
    },
    getShoesBrand() {
        return instance.get('shoes-brand/').then(response => response)
    },
    getCustomerProfile() {
        return instance.get('customer/').then(response => response)
    },
    changeCustomerProfile(customerProfileData: customerProfileType) {
        return instance.patch('customer/', customerProfileData).then(response => response)
    }
}