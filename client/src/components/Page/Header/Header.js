import React, { Component } from 'react';
import Searchbar from '../../UI/SearchBar/SearchBar';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
        
    }

    render() {
        const AdminView = this.props.isAdmin ? (
            <div>
                <div className="AddButton" onClick={this.props.add}>
                    <i className="fa fa-plus"></i>
                </div>
                <div className="RefreshButton" onClick={this.props.refresh}>
                    <i className="fa fa-refresh"></i>
                </div>
            </div>    
        ) : (
            <div className="LogIn" onClick={this.handleLogin}>
                Log In
            </div>    
        ); 
        return (
            <div className="Table-head">
                <Searchbar />
                {AdminView}
            </div>
        )
    }
} 

export default Header;