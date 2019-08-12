import {IsJsonString} from "../util/Utils";


export default class LocalStorage {
    static get(key) {
        const value = localStorage.getItem(key);
        if (IsJsonString(value)) {
            return JSON.parse(value)
        }
        return value;
    }


    static set(key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
    }

    static remove(key) {
        return localStorage.removeItem(key);
    }

    static getAll() {
        let localItems = [];
        for (var i = 0; i < localStorage.length; i++) {
            const item = JSON.parse(localStorage.getItem(localStorage.key(i)));
            localItems = [...localItems, item];
        }
        return localItems;
    }
}
