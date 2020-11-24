import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';

import MobileDrawer from './Mobile/MobileDrawer';
import './Navigation.css';

class Navigation extends React.Component {
    
    state = {
        drawer: false
    }

    showDrawer = () => {
        this.setState({drawer: !this.state.drawer})
    }

    render() {

        return (
            <React.Fragment>
                <MobileDrawer authStatus={this.props.currentUserId} addPostHandler={this.props.addPostHandler} logoutHandler={this.props.logoutHandler} showDrawer={this.showDrawer} drawerState={this.state.drawer}/>
                <header>
                    
                    <nav className="navbar">
                        <div className="container-fluid">
                        <div className="navbar-header mobile-nav">
                            <button onClick={this.showDrawer} className="menu-btn">Menu</button>
                            <img className="logo-head" alt="logo" src="/wheresapp-red.png" height="30"/>
                            <a className="navbar-name" href="/">WheresApp</a>
                        </div>
                        <div className="nav-list">
                            <ul className="navbar-name">
                                <li><NavLink className="nav-link" onClick={() => window.location.reload()} to="/">Main Feed</NavLink></li>
                                <li><NavLink className="nav-link" to="/users" >Users List</NavLink></li>
                                <li><a className="nav-link" href="https://github.com/MichaelC1999/WheresApp-Frontend" >Project</a></li>
                            
                            
                            {this.props.currentUserId ? <React.Fragment><li onClick={this.props.addPostHandler} className="nav-link">Add Post</li><li onClick={this.props.logoutHandler} className="nav-link">Logout</li></React.Fragment> : <React.Fragment><li><NavLink  className="nav-link" to="/auth" >Login</NavLink></li></React.Fragment>}
                            </ul>
                        </div>
                        </div>
                    </nav>
                </header>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUserId: state.currentUserId
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);