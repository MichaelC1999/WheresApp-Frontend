import React from 'react';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop';
import './MobileDrawer.css'

class MobileDrawer extends React.Component {
    render() {
        let displayDrawer;
        if(this.props.drawerState){
            displayDrawer = (
                <React.Fragment>
                
                <div className="drawer slide-in-left-enter-active" onClick={this.props.showDrawer} style={{
                        transform: true ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: true ? '1' : '0'
                    }}>
                    <ul>
                        <li><NavLink to="/">Main Feed</NavLink></li>
                        <li><NavLink to="/users" >Users List</NavLink></li>
                        {this.props.authStatus ? <React.Fragment><li onClick={this.props.addPostHandler}><a>Add Post</a></li><li onClick={this.props.logoutHandler}><a>Logout</a></li></React.Fragment> : <li><NavLink to="/auth" >Login</NavLink></li>}
                    </ul>
                </div>
                <Backdrop showDrawer={this.props.showDrawer}/>
            </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                {displayDrawer}
            </React.Fragment>
        )
    }
}

export default MobileDrawer;