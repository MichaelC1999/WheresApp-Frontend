import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actionTypes from '../../Store/actionTypes';

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
    //     <React.Fragment>
    //   <SideDrawer>
    //     <nav className="main-navigation__drawer-nav">
    //       <NavLinks />
    //     </nav>
    //   </SideDrawer>
    //   <MainHeader>
    //     <button className="main-navigation__menu-btn">
    //       <span />
    //       <span />
    //       <span />
    //     </button>
    //     <h1 className="main-navigation__title">
    //       <Link to="/">YourPlaces</Link>
    //     </h1>
    //     <nav className="main-navigation__header-nav">
    //       <NavLinks />
    //     </nav>
    //   </MainHeader>
    // </React.Fragment>
        return (
            <React.Fragment>
                <MobileDrawer authStatus={this.props.currentUserId} addPostHandler={this.props.addPostHandler} logoutHandler={this.props.logoutHandler} showDrawer={this.showDrawer} drawerState={this.state.drawer}/>
                <header>
                    {/* <div className="mobile-header">
                        <button onClick={this.showDrawer} className="menu-btn">Menu</button>
                        <h2 className="mobile-title">WheresApp</h2>
                    </div> */}
                    
                    
                    <nav className="navbar">
                        <div className="container-fluid">
                        <div className="navbar-header mobile-nav">
                            <button onClick={this.showDrawer} className="menu-btn">Menu</button>
                            <img className="logo-head" src="/wheresapp-red.png" height="30"/>
                            <a className="navbar-brand" href="/">WheresApp</a>
                        </div>
                        <div className="nav-list">
                            <ul className="navbar-left navbar-brand">
                                <li><NavLink className="nav-link" to="/">Main Feed</NavLink></li>
                                <li><NavLink className="nav-link" to="/users" >Users List</NavLink></li>
                                <li><a className="nav-link" href="https://github.com/MichaelC1999/WheresApp-Frontend" >Project</a></li>
                            </ul>
                            
                            {this.props.currentUserId ? <ul className="navbar-right navbar-brand" ><li onClick={this.props.addPostHandler}><a className="nav-link">Add Post</a></li><li onClick={this.props.logoutHandler}><a className="nav-link">Logout</a></li></ul> : <ul className="navbar-right navbar-brand"><li><NavLink  className="nav-link" to="/auth" >Login</NavLink></li></ul>}
                            
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