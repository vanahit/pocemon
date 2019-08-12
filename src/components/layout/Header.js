import React, {Component} from "react";
import {withRouter} from "react-router";

class Header extends Component {
    render() {
        const pathname = this.props.location.pathname;
        return (
            <div className='header kt-bg-light p-4'>
                <div className='d-flex justify-content-end'>
                    <span className={`btn btn-link pointer  ${pathname === '/pocemons' && 'btn-active-link'}`}
                          onClick={() => this.props.history.push('/')}> Pocemons
                    </span>
                    <span className={`btn btn-link pointer  ${pathname === '/my-collection' && 'btn-active-link'}`}
                          onClick={() => this.props.history.push('/my-collection')}> My
                        Collection
                    </span>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);

