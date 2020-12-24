import React from 'react';
import LazyLoad from 'react-lazy-load';
import './UserBlock.css';
import * as actionTypes from '../../../Store/actionTypes'
import {connect} from 'react-redux'
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
                        {this.props.currentUserId && this.props.token ? <button style={{marginBottom: "10px"}} onClick={() => this.props.sendPM({_id: this.props.userId, name: this.props.name})}>Send Message</button> : null}

                    </div>
                </NavLink>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUserId: state.currentUserId,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendPM: (user) => dispatch({type: actionTypes.SEND_PM, recipient: user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBlock);