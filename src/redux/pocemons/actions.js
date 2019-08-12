import {
  GET_ALL_FROM_CARD,
  GET_POCEMON_FAIL,
  GET_POCEMON_REQUEST,
  GET_POCEMON_SUCCESS,
  GET_POCEMONS_FAIL,
  GET_POCEMONS_REQUEST,
  GET_POCEMONS_SUCCESS,
  GET_CARD_POCEMON_FAIL,
  GET_CARD_POCEMON_REQUEST,
  GET_CARD_POCEMON_SUCCESS,
  CLEARSTATE
} from "./actionTypes";

export const getPocemons =(offset, limit, loadMore) => {
  return {
    types: [GET_POCEMONS_REQUEST, GET_POCEMONS_SUCCESS, GET_POCEMONS_FAIL],
    promise: apiClient => apiClient.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`),
    loadMore
  };
};
export const clearState = () => {
  return {
    type: CLEARSTATE,
  };
};
export const getOnePokemon = url => {
  return {
    types: [GET_POCEMON_REQUEST, GET_POCEMON_SUCCESS, GET_POCEMON_FAIL],
    promise: apiClient => apiClient.get(`${url}`),
  };
};
export const getCardPokemonData = name => {
  return {
    types: [GET_CARD_POCEMON_REQUEST, GET_CARD_POCEMON_SUCCESS, GET_CARD_POCEMON_FAIL],
    promise: apiClient => apiClient.get(`https://pokeapi.co/api/v2/pokemon/${name}`),
  };
};

export const getAllFromCollection = () => {
  return {
    type: GET_ALL_FROM_CARD
  }
}






