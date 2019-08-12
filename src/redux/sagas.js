import {all} from "redux-saga/effects";
import pokemonsSagas from "./pocemons/sagas";
export default function* rootSaga() {
  yield all([
    pokemonsSagas,
]);
}
