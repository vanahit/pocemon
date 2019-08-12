import React from "react";
import {Provider} from "react-redux";
import {Route, Router, Switch} from "react-router-dom";

import App from "./containers/App";
import "./App.scss";
import createHistory from "history/createBrowserHistory";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {configureStore} from "./redux/store";

const history = createHistory();

const theme = createMuiTheme({
  palette: {
    primary: { main: '#02c4cc' }, // Purple and green play nicely together.
  },
  typography: { useNextVariants: true },
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: '12px 14px',
      }
    },
    MuiInputLabel:{
      outlined:{
        transform:'translate(14px, 12px) scale(1)'
      }
    }
  }
});

export const storeConfig = configureStore(history);

const MainApp = () => (
    <Provider store={storeConfig}>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>
);

export default MainApp;
