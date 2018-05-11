import React, { Component } from 'react';
import Searchbar from '../../UI/SearchBar/SearchBar';

class Header extends Component {
    render() {
        return (
            <div className="Table-head">
                <div className="AddButton" onClick={this.props.add}>
                    <i className="fa fa-plus"></i>
                </div>
                <div className="RefreshButton" onClick={this.props.refresh}>
                    <i className="fa fa-refresh"></i>
                </div>
                <Searchbar />
            </div>
        )
    }
} 

export default Header;