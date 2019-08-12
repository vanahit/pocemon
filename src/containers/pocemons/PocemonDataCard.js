import React, {Component} from "react";
import LocalStorage from "../../services/LocalStorage";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import {getCardPokemonData} from "../../redux/pocemons/actions";
import Loader from "../../components/ui/Loader";
import {firstLaterUppercase} from "../../util/Utils";
import PocemonsStats from "../../components/pocemons/PocemonsStats";


class PocemonDataCard extends Component {
    state = {
        pocemonData: null,
        name: this.props.match.params.name,
    }

    componentDidMount() {
        this.props.getCardPokemonData(this.state.name);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            pocemonData: nextProps.getPocemonData
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
        const {loading} = this.props;
        if (loading) {
            return <Loader/>
        }
        if (!pocemonData) {
            return null
        }
        return (
            <div className='kt-portlet col-8'>
                <div className='row'>
                    <div className='col-12 text-center'>
                        <div><h2>{firstLaterUppercase(pocemonData.name)} <span
                            className='kt-font-bold text-secondary'> #{this.getNumberOfPocemon(pocemonData.id)} </span>
                        </h2>
                        </div>
                    </div>
                    <div className='col-12 pl-30 pr-30'>
                        <div className='row d-flex justify-content-center flex-wrap flex-lg-nowrap justify-content-lg-between'>
                            <div className='col-12 col-md-7 col-lg-7'>
                                <div className='d-flex justify-content-center'>
                                    <img style={{width: 200}} src={pocemonData.sprites.front_default}
                                         alt={pocemonData.name}/>
                                </div>
                                <div>
                                    <PocemonsStats records={pocemonData.stats} />
                                </div>
                            </div>
                            <div className='col-12 col-md-5 col-lg-5'>
                                <div className='alert alert-primary' style={{marginTop: 40}}>
                                    <div className='col-12 '>
                                        <div className='row '>
                                            <div className='col-4'>
                                                <section>
                                                    <h4>Height</h4>
                                                    <h5 className='text-dark kt-font-bold'>{pocemonData.height}</h5>
                                                </section>
                                                <section>
                                                    <h4>Weight</h4>
                                                    <h5 className='text-dark kt-font-bold'>{pocemonData.weight}</h5>
                                                </section>
                                            </div>
                                            <div className='col-8'>
                                                <section>
                                                    <h4>Abilities</h4>
                                                    <h6 className='text-dark kt-font-bold m-10'>{pocemonData.abilities.map(item => (
                                                        <span
                                                            key={item.ability.name + Math.random()}
                                                            style={{wordBreak: 'break-word'}}
                                                            className=' m-1'>{item.ability.name}
                                                            {!pocemonData.abilities.length - 1 && ","}
                                                    </span>
                                                    ))}</h6>
                                                </section>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className=''>
                                    <h3>Types</h3>
                                    {pocemonData.types.length && pocemonData.types.map((item, index) => (
                                        <span key={index + Math.random()} className='kt-badge kt-badge--inline m-1'
                                              style={{
                                                  backgroundColor: this.getBudgeColor(item.type.name),
                                                  color: 'white'
                                              }}>
                            {item.type.name}
                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const {pocemons} = state;
    return {
        getPocemonData: pocemons.cardPocemonData.data,
        loading: pocemons.cardPocemonData.loading,
    };
}

export default connect(mapStateToProps, {getCardPokemonData})(PocemonDataCard);
