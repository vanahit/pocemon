import {all, put, takeLatest} from "redux-saga/effects";
import {GET_POCEMONS_SUCCESS} from "./actionTypes";
import {getOnePokemon} from "./actions";

function* afterGetPokemonsSuccess(action) {
    let pokemons = action.result.results;
    for (let i = 0; i < pokemons.length; i++) {
        yield put(getOnePokemon(pokemons[i].url))
    }
}

const pokemonsSagas = all([
    takeLatest(GET_POCEMONS_SUCCESS, afterGetPokemonsSuccess),
]);

export default pokemonsSagas;

