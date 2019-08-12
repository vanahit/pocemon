import {
    GET_POCEMONS_REQUEST,
    GET_POCEMONS_SUCCESS,
    GET_POCEMONS_FAIL,
    GET_POCEMON_REQUEST,
    GET_POCEMON_SUCCESS,
    GET_POCEMON_FAIL,
    GET_ALL_FROM_CARD,
    GET_CARD_POCEMON_FAIL,
    GET_CARD_POCEMON_REQUEST,
    GET_CARD_POCEMON_SUCCESS, CLEARSTATE
} from "./actionTypes";
import {getResponseErrors} from "../../util/Utils";
import LocalStorage from "../../services/LocalStorage";

const INIT_STATE = {
    pocemonsData: [],
    collectionPocemons: [],
    cardPocemonData: {
        loading: false,
        success: false,
        fail: false,
        data: null,
    },
    pocemons: {
        loadMore: false,
        loading: false,
        success: false,
        fail: false,
        data: [],
    },
    pocemon: {
        loading: false,
        success: false,
        fail: false,
        data: null,
    },

};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_POCEMONS_REQUEST:
            return {
                ...state,
                pocemons: {
                    ...state.pocemons,
                    loading: !action.loadMore,
                    loadMore: action.loadMore,
                    success: false,
                    fail: false,
                    errors: {},
                }
            };
        case GET_POCEMONS_SUCCESS:
            return {
                ...state,
                pocemons: {
                    ...state.pocemons,
                    loading: false,
                    loadMore: false,
                    success: true,
                    fail: false,
                    errors: {},
                    data: [...state.pocemons.data, ...action.result.results],
                }
            };
        case GET_POCEMONS_FAIL:
            return {
                ...state,
                pocemons: {
                    ...state.pocemons,
                    loading: false,
                    loadMore: false,
                    success: false,
                    fail: true,
                    data: [],
                    errors: getResponseErrors(action.error.response),
                }
            };
        case GET_POCEMON_REQUEST:
            return {
                ...state,
                pocemon: {
                    ...state.pocemon,
                    loading: true,
                    success: false,
                    fail: false,
                    errors: {},
                }
            };
        case GET_POCEMON_SUCCESS:
            return {
                ...state,
                pocemonsData: [...state.pocemonsData, action.result],
                pocemon: {
                    ...state.pocemon,
                    loading: false,
                    success: true,
                    fail: false,
                    errors: {},
                    data: action.result.results,
                }
            };
        case GET_POCEMON_FAIL:
            return {
                ...state,
                pocemon: {
                    ...state.pocemon,
                    loading: false,
                    success: false,
                    fail: true,
                    data: [],
                    errors: getResponseErrors(action.error.response),
                }
            };
        case GET_CARD_POCEMON_REQUEST:
            return {
                ...state,
                cardPocemonData: {
                    ...state.cardPocemonData,
                    loading: true,
                    success: false,
                    fail: false,
                    errors: {},
                    data: {}
                }
            };
        case GET_CARD_POCEMON_SUCCESS:
            return {
                ...state,
                cardPocemonData: {
                    ...state.cardPocemonData,
                    loading: false,
                    success: true,
                    fail: false,
                    errors: {},
                    data: action.result,
                }
            };
        case GET_CARD_POCEMON_FAIL:
            return {
                ...state,
                cardPocemonData: {
                    ...state.cardPocemonData,
                    loading: false,
                    success: false,
                    fail: true,
                    data: [],
                    errors: getResponseErrors(action.error.response),
                }
            };
        case  GET_ALL_FROM_CARD:
            let pocemons = LocalStorage.getAll();
            return {
                ...state,
                collectionPocemons: pocemons,
            };
        case  CLEARSTATE:
            return {
                ...state,
                pocemonsData: [],
                pocemons: {
                    loadMore: false,
                    loading: false,
                    success: false,
                    fail: false,
                    data: [],
                },
            };
        default:
            return {...state};
    }
};

