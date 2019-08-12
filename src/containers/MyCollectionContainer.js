import React, {Component} from "react";
import "../assets/css/sass/uiComponents/notify.scss";
import PocemonCard from "./pocemons/pocemonCard";
import LocalStorage from "../services/LocalStorage";
import Loader from "../components/ui/Loader";
import {withRouter} from "react-router-dom";
import {sortingArray} from "../util/Utils";
import {Input} from "reactstrap";


class MyCollectionContainer extends Component {
    state = {
        getPocemonsData: [],
        loading: true,
        filter: ''
    }

    componentDidMount() {
        this.getCollectionItems();
    }

    onChange = (e) => {
        console.log(e.target.value);
        this.setState({filter: e.target.value}, this.sortData)
    }
    sortData = () => {
        let arr = [];
        const {filter, getPocemonsData} = this.state;
        switch (filter) {
            case 'lowFirst':
                arr = sortingArray(getPocemonsData, 'asc', 'id');
                break;
            case 'highFirst':
                arr = sortingArray(getPocemonsData, 'desc', 'id');
                break;
            case 'az':
                arr = sortingArray(getPocemonsData, 'asc', 'name');
                break;
            case 'za':
                arr = sortingArray(getPocemonsData, 'desc', 'name');
                break;
            default:
                arr = getPocemonsData;
        }
        this.setState({getPocemonsData: arr});
    }


    getCollectionItems = () => {
        let items = LocalStorage.getAll();
        this.setState({getPocemonsData: items, loading: false});
    }

    render() {
        const {getPocemonsData, loading} = this.state;
        if (loading) {
            return <Loader/>
        }
        if (!loading && !getPocemonsData.length) {
            return <div className='alert alert-outline-warning'> You have no Pokemons! {" "}
                <span className='d-inline-block ml-2 kt-link pointer'
                      onClick={() => this.props.history.push('/pocemons')}>  Add Pockemon to Collection  </span>
            </div>
        }
        return (
            <div className='col-12'>
                <div className='d-flex justify-content-end'>
                    <div style={{width: 250, marginRight: 50}}>
                        <Input
                            type={'select'} onChange={this.onChange}>
                            <option value='choose' >Choose filter</option>
                            <option value='lowFirst'>Lowest number (First)</option>
                            <option value='highFirst'>Highest number (First)</option>
                            <option value='az'>A-Z</option>
                            <option value='za'>Z-A</option>
                        </Input>
                    </div>
                </div>
                <div className='col-12 '>
                    <div className='row p-3' style={{justifyContent: 'center'}}>
                        {!!getPocemonsData.length &&
                        getPocemonsData.map(item => (
                            <PocemonCard
                                key={item.name + Math.random()}
                                pocemon={item}
                                withRemove
                                getCollectionItems={this.getCollectionItems}/>)
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MyCollectionContainer);
