import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import sagas from "./sagas";
import apiClientMiddleware from "./middlewares/ApiClientMiddleware";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "react-router-redux";
import ApiClient from "../services/ApiClient";


const composeEnhancers = composeWithDevTools({
  name: "MyApp",
  actionsBlacklist: ["REDUX_STORAGE_SAVE"]
});

const sagaMiddleware = createSagaMiddleware();
const apiClient = new ApiClient();

export function configureStore(history) {
  // console.log(routerMiddleware(history));
  const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(
        apiClientMiddleware(apiClient),
        routerMiddleware(history),
        sagaMiddleware
      )
    )
  );
  sagaMiddleware.run(sagas);
  return store;
}
