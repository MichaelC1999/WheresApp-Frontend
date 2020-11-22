import React from 'react';
import './Comment.css';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';


class Comment extends React.Component {
    render () {
        console.log(this.props)
        return (
            <div className="comment">
                <img src={this.props.creator.avatarImg} alt={"avatar"} />
                <p><b><NavLink  className="noClick"  to={"/users/" + this.props.creator._id}>{this.props.creator.name}</NavLink></b> {this.props.content}</p>
                {this.props.currentUserId === this.props.creator._id ? <div className="commentBtn"><button>Revise</button><button>Remove</button></div> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUserId: state.currentUserId
    }
}

export default connect(mapStateToProps)(Comment);