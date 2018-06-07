import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        const listItems = this.props.links.map((link) =>
            <li key={link.title.toLowerCase().replace(" ", "-")}>
                <a href={link.href}>{link.title}</a>
            </li>
        );
        return (
            <div className="Page-sidebar">
                <div className="Imagebar-box">
                    <a href="https://github.com/Tardishade"> <img src={this.props.logo} alt="logo" /> </a>
                </div>
                {/* <ul className="Sidebar-links">
                    {listItems}
                </ul> */}
            </div>
        );
    }
}

export default Sidebar;