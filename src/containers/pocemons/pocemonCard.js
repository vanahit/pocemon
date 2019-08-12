import React, {Component} from "react";
import LocalStorage from "../../services/LocalStorage";
import {toast} from "react-toastify";
import {withRouter} from "react-router-dom";
import {firstLaterUppercase} from "../../util/Utils";


class PocemonCard extends Component {
    state = {
        pocemonData: [],
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            pocemonData: nextProps.pocemon
        }
    }

    getNumberOfPocemon = (number) => {
        let id = '';
        if (number < 10) {
            id = '00' + number;
        } else if (number < 100) {
            id = '0' + number;
        } else id = number;

        return id;
    }
    getBudgeColor = (type) => {
        switch (type) {
            case 'fire':
                return '#fd7d24';
            case 'water':
                return '#4592c4';
            case 'grass':
                return '#9bcc50';
            case 'flying':
                return '#3dc7ef';
            case 'poison':
                return '#b97fc9';
            case 'bug':
                return "#729f3f";
            default:
                return '#a4acaf';
        }
    }
    addToCollection = () => {
        const {pocemonData} = this.state;
        LocalStorage.set(pocemonData.name, pocemonData);
        toast.success(`Pocemon ${pocemonData.name} added to your collection`,
            {
                position: "top-right",
                autoClose: 3000,
            }
        )
    }

    removeFromCollection = () => {
        const {pocemonData} = this.state;
        console.log(pocemonData, 'removing pocemonData');
        LocalStorage.remove(pocemonData.name);
        toast.success(`Pocemon ${pocemonData.name} removed from your collection`,
            {
                position: "top-right",
                autoClose: 3000,
            }
        )
    }

    onSubmt = async () => {
        const {withRemove} = this.props;
        if (withRemove) {
            await this.removeFromCollection();
        } else {
            await this.addToCollection();
        }
        await this.props.getCollectionItems();
    }

    render() {
        const {pocemonData} = this.state;
        const {withRemove} = this.props;

        return (
            pocemonData && <div className='kt-portlet m-3 p-3 col-lg-3 col-md-4 col-sm-6 col-sm-auto'>
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-elevate-hover btn-primary btn-sm'
                            onClick={() => this.props.history.push(`pokemon/${pocemonData.name}`)}> View
                    </button>
                    <button className='btn btn-elevate-hover btn-primary btn-sm'
                            disabled={!withRemove && !!LocalStorage.get(pocemonData.name)}
                            onClick={this.onSubmt}> {withRemove ? 'Remove From Collection' :
                        !withRemove && !!LocalStorage.get(pocemonData.name) ? 'Added' : 'Add To Collection'} </button>
                </div>
                <div>
                    <img src={pocemonData.sprites.front_default} alt={pocemonData.name}/>
                </div>
                <div className='kt-font-bold'> #{this.getNumberOfPocemon(pocemonData.id)} </div>
                <h3>{firstLaterUppercase(pocemonData.name)}</h3>
                <div className=''>
                    {pocemonData.types.length && pocemonData.types.map((item, index) => (
                        <span key={index + Math.random()} className='kt-badge kt-badge--inline m-1' style={{
                            backgroundColor: this.getBudgeColor(item.type.name),
                            color: 'white'
                        }}>
                            {item.type.name}
                        </span>
                    ))
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(PocemonCard);
