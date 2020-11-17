import React from 'react';
import LazyLoad from 'react-lazy-load';
import './UserBlock.css';
import {NavLink} from 'react-router-dom';

class UserBlock extends React.Component {


    render() {
        return (
                <NavLink  to={"/users/" + this.props.userId}>
                    <div className="UserListBlock" >
                        <LazyLoad 
                            
                            debounce={false}
                            offsetVertical={200}
                            >
                            <img src={this.props.avatarImg} alt={this.props.name} />
                        </LazyLoad>
                        <h3>{this.props.name}</h3>
                        <h5>{this.props.postTotal} posts total</h5>
                        <p>{this.props.bio}</p>
                    </div>
                </NavLink>
        )
    }
}

export default UserBlock;