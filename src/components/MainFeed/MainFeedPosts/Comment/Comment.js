import React from 'react';
import './Comment.css';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import CommentBox from '../../../UI/CommentBox/CommentBox';
import * as actionTypes from '../../../../Store/actionTypes';


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
        this.props.deleteComment(this.props.postId, this.props.commentIdx)
        
    }

    checkUser = () => {
        if(this.props.currentUserId !== this.props.creator._id) {
            return ;
        }
    }


    render () {

        let comment = <React.Fragment><p><b><NavLink to={"/users/" + this.props.creator._id}>{this.props.creator.name}</NavLink></b> {this.props.content}</p>{this.props.currentUserId === this.props.creator._id ? <div className="commentBtn"><button onClick={this.editComment}>Revise</button><button onClick={this.deleteComment}>Remove</button></div> : null}</React.Fragment>;

        if(this.state.editing){
            comment = <CommentBox postId={this.props.postId} cancelEdit={this.cancelEdit} commentIdx={this.props.commentIdx} comment={this.props.content} method="edit" />
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
        currentUserId: state.currentUserId,
        token: state.token

    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteComment: (postId, idx) => dispatch({type: actionTypes.DELETE_POST, postId: postId, commentIdx: idx })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);