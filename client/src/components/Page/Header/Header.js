import React, { Component } from 'react';
import Searchbar from '../../UI/SearchBar/SearchBar';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick(event) {
        this.props.handleLogin()
    }

    handleLogoutClick(event) {
        this.props.handleAdmin();
    }

    render() {
        const AdminView = this.props.isAdmin ? (
            <div>
                <div className="AddButton" onClick={this.props.add}>
                    <i className="fa fa-plus"></i>
                </div>
                {/* <div className="RefreshButton" onClick={this.props.refresh}>
                    <i className="fa fa-refresh"></i>
                </div> */}
                <div className="Login-text" onClick={this.handleLogoutClick}>
                Log Out
                </div>  
            </div>    
        ) : (
            <div className="Login-text" onClick={this.handleLoginClick}>
                Log In
            </div>    
        ); 
        return (
            <div className="Page-header">
                <Searchbar />
                {AdminView}
            </div>
        )
    }
} 

export default Header;