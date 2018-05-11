import React, { Component } from 'react';

class Searchbar extends Component {
    render() {
        return (
            <label className="Searchbar">
                <i className="fa fa-search"></i>
                {this.props.text}
                <input type="text" placeholder="Search" />
            </label>
        )
    }
}

export default Searchbar;