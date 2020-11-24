import React from 'react';
import './Comment.css';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import CommentBox from '../../../UI/CommentBox/CommentBox';


class Comment extends React.Component {

    state = {
        editing: false
    }

    editComment = () => {
        this.checkUser()
        this.setState({editing: true})
    }

    cancelEdit = () => {
        this.setState({editing: false})
    }

    deleteComment = () => {

    }

    checkUser = () => {
        if(this.props.currentUserId !== this.props.creator._id) {
            return ;
        }
    }


    render () {

        //ONCE EDIT COMMENT FEATURE IS ENABLED, PUT THIS INTO THE FRAGMENT IN COMMENT VAR BELOW
        //{this.props.currentUserId === this.props.creator._id ? <div className="commentBtn"><button onClick={this.editComment}>Revise</button><button>Remove</button></div> : null}

        let comment = <React.Fragment><p><b><NavLink to={"/users/" + this.props.creator._id}>{this.props.creator.name}</NavLink></b> {this.props.content}</p></React.Fragment>;

        if(this.state.editing){
            comment = <CommentBox postId={this.props.postId} cancelEdit={this.cancelEdit} commentId={this.props.commentId} comment={this.props.content} method="edit" />
        }

        return (
            <div className="comment">
                <img src={this.props.creator.avatarImg} alt={"avatar"} />
                {comment}
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