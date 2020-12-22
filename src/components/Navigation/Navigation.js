import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actionTypes from '../../Store/actionTypes'
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
                <MobileDrawer authStatus={this.props.currentUserId} addPost={this.props.addPost} checkInbox={this.props.openMail} logoutHandler={this.props.logoutHandler} showDrawer={this.showDrawer} drawerState={this.state.drawer}/>
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
                            
                            {this.props.currentUserId ? <React.Fragment><li onClick={this.props.openMail}><a style={!this.props.messages.unread ? null : {backgroundColor: "lime", border: "2px black solid", padding: "7px 5px", borderRadius: "9%"}} className="nav-link" >Inbox</a></li><li onClick={this.props.addPost} ><a className="nav-link">Add Post</a></li><li onClick={this.props.logoutHandler} ><a className="nav-link">Logout</a></li></React.Fragment> : <React.Fragment><li><NavLink  className="nav-link" to="/auth" >Login</NavLink></li></React.Fragment>}
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
        currentUserId: state.currentUserId,
        messages: state.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPost: () => dispatch({type: actionTypes.ADD_POST}),
        openMail: () => dispatch({type: actionTypes.OPEN_MAIL})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);