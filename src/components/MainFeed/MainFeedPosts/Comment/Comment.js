import React from 'react';
import './Comment.css';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import CommentBox from '../../../UI/CommentBox/CommentBox';
import * as actionTypes from '../../../../Store/actionTypes';
import trash from './trash.png';
import check from './check.svg';


class Comment extends React.Component {

    state = {
        editing: false,
        submittingEdit: false
    }

    editComment = () => {
        this.checkUser()
        this.setState({editing: true})
    }

    cancelEdit = () => {
        this.setState({editing: false, submittingEdit: false})
    }

    deleteComment = () => { 
        this.props.deleteComment(this.props.postId, this.props.commentIdx)
        
    }

    checkUser = () => {
        if(this.props.currentUserId !== this.props.creator._id) {
            return ;
        }
    }

    submitEdit = () => {
        this.setState({submittingEdit: true})        
    }


    render () {

        //edit/delete btns only when current users posts > if also user is equal to editing, buttons are confirm edit or cancel edit

        let text
        let buttons

        if(this.props.currentUserId === this.props.creator._id){
            if(this.state.editing){
                buttons = <React.Fragment>
                    <div className="commentBtn">
                        
                        <div onClick={this.cancelEdit}>
                            <img src={trash} style={{padding: "2px"}} />
                        </div>
                        <div onClick={this.submitEdit}>
                            <img src={check} style={{padding: "2px"}}/>
                        </div>
                    </div> 
                </React.Fragment>
                //buttons to confirm or scratch edit
                //confirm button triggers method in comment comp that sets submitted to true, commentBox accepts prop of submitted value from comment state and upon 'comp did update' if that prop is true then just submit
            } else {
                buttons = <React.Fragment>
                    <div className="commentBtn">
                        
                        <div onClick={this.deleteComment}>
                            <img src={trash} style={{padding: "2px"}} />
                        </div>
                        <div onClick={this.editComment}>
                            <img src="./pencil.svg" />
                        </div>
                    </div> 
                </React.Fragment>
                //buttons to start editing or delete comment
            }
        }

        if(this.state.editing){
            text = <CommentBox submittingEdit={this.state.submittingEdit} postId={this.props.postId} cancelEdit={this.cancelEdit} commentIdx={this.props.commentIdx} comment={this.props.content} method="edit" />
        } else {
            text = <p><b><NavLink to={"/users/" + this.props.creator._id}>{this.props.creator.name}</NavLink></b> {this.props.content}</p>
        }

        return (
            <div className="comment">
                <div>
                    <img src={this.props.creator.avatarImg} alt={"avatar"} />
                    {buttons}
                </div>
                
                {text}
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