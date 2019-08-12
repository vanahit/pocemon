export const getResponseErrors = (response) => {
    if (!response) return {};
    if (!response.data.errors) return response.data;
    return response.data.errors;
};

export const isTouchDevice = () => {
    return (('ontouchstart' in window)
        || (navigator.MaxTouchPoints > 0)
        || (navigator.msMaxTouchPoints > 0));
};

export const firstLaterUppercase = (string = '') => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const IsJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};


export const getStatName = (string = '') => {
    let changedString = ''
    if (!string) return '';
    switch (string) {
        case 'special-defense':
            changedString = 'special defense';
            break;
        case 'special-attack':
            changedString = 'special attack';
            break;
        default:
            changedString = string;
    }
    return changedString.charAt(0).toUpperCase() + changedString.slice(1);
};

export const sortingArray = (array, method, arrayKey) => {
    if (typeof array[0][arrayKey] === 'number') {
        return array.sort((a, b) => method === 'asc' ? a[arrayKey] - b[arrayKey] : b[arrayKey] - a[arrayKey])
    }
    if (typeof array[0][arrayKey] === 'string'
    ) {
        return array.sort((a, b) => method === 'asc' ? a[arrayKey] > b[arrayKey] ? 1 : -1 : a[arrayKey] < b[arrayKey] ? 1 : -1)
    }
};