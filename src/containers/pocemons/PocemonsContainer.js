import React, {Component} from "react";
import "../../assets/css/sass/uiComponents/notify.scss";
import {connect} from "react-redux";
import PocemonCard from "./pocemonCard";
import LocalStorage from "../../services/LocalStorage";
import Loader from "../../components/ui/Loader";
import {clearState, getPocemons} from "../../redux/pocemons/actions";
import {Input} from "reactstrap";
import {sortingArray} from "../../util/Utils";


class PocemonsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            getPocemonsData: [],
            filter: 'choose',
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            getPocemonsData: nextProps.getPocemonsData
        }
    }

    handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.setState({loadMore: true})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.loadMore !== this.state.loadMore && this.state.loadMore) {
            this.loadPokemons()
        }
    }

    loadPokemons = () => {
        const {getPocemonsData} = this.props;
        this.setState({loadMore: false}, () => this.props.getPocemons(getPocemonsData.length, 6, true))
    }

    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            this.props.getPocemons(0, 6);
        }
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        this.mounted = false;
        this.props.clearState();
    }

    getCollectionItems = () => {
        let items = LocalStorage.getAll();
        this.setState({getPocemonsData: items, loading: false});
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

    render() {
        const {getPocemonsData, loading, loadMore} = this.props;
        if (loading) {
            return <Loader/>
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
                <div className='col-12'>
                    <div className='row p-3' style={{justifyContent: 'center'}}>
                        {!!getPocemonsData.length &&
                        getPocemonsData.map(item => (
                            <PocemonCard
                                key={item.name + Math.random()}
                                pocemon={item}
                                getCollectionItems={this.getCollectionItems}
                            />)
                        )}
                    </div>
                    <div className='row'>
                        <div className='col-12'>{loadMore && <Loader/>}</div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {pocemons} = state;
    return {
        getPocemonsData: pocemons.pocemonsData,
        loading: pocemons.pocemons.loading,
        loadMore: pocemons.pocemons.loadMore,
    };
}

export default connect(mapStateToProps, {getPocemons, clearState})(PocemonsContainer);
