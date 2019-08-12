import React, {Component, Fragment} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import connect from "react-redux/es/connect/connect";
import Header from "../components/layout/Header";
import PocemonsContainer from "./pocemons/PocemonsContainer";
import MyCollectionContainer from "./MyCollectionContainer";
import "../assets/css/sass/uiComponents/notify.scss";
import 'react-toastify/dist/ReactToastify.css';
import PocemonDataCard from "./pocemons/PocemonDataCard";

const moo = () => {};
console.log  = moo;

class App extends Component {
    render() {
        const {location} = this.props;
        if (location.pathname === '/' || location.pathname === '') {
            return (<Redirect to='/pocemons'/>);
        }

        return (
            <Fragment>
                <ToastContainer hideProgressBar position={'top-right'}/>
                <Header/>
                <div className='container-body '>
                    <Switch>
                        <Route path="/pocemons" exact component={PocemonsContainer}/>
                        <Route path="/my-collection" component={MyCollectionContainer}/>
                        <Route path="/pokemon/:name" component={PocemonDataCard}/>
                    </Switch>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = () => {
    return {}
};

export default connect(mapStateToProps, null)(App);
