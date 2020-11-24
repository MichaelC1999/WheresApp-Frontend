import React from 'react';
import * as actionTypes from '../../../Store/actionTypes';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import CommentBox from '../../UI/CommentBox/CommentBox';
import Comment from './Comment/Comment';
import './Post.css';

class Post extends React.Component {
    //NOTE: WHEN ANY SINGLE POST FROM ANY USER IS VIEWED IN MODAL, POSTDATA GETS STORED TO REDUX< AND ADDING A POST TURNS INTO EDIT POST
//NOTE: WHEN ANY PART OF POST DIV IS CLICKED (EVEN LINKS OR EDIT) IT TRIGGERS VIEW SINGLE POST MODAL
    updatePost = () => {
        this.props.editPost(
            this.props.postId, 
            this.props.title, 
            this.props.location, 
            this.props.desc, 
            this.props.imageUrl
        );
    }

    deletePost = () => {
        this.props.deletePost(this.props.postId);
    }

    viewPost = (e) => {
        console.log(e.target.className)
        
        //HAVE TO EDIT VIEW POST/ACTION, ONLY NEEDS POST IMAGE
        this.props.viewPost(
            this.props.postId, 
            this.props.title, 
            this.props.location, 
            this.props.desc, 
            this.props.imageUrl
        );
        console.log(this.props)
    }
    
    render() {
        
        let comments = null
        console.log(this.props)
        if(this.props.comments.length>=1){
            comments = this.props.comments.map(comment => {
                return <Comment commentId={comment._id} postId={this.props.postId} creator={comment.creator} content={comment.content} />
            })
        }
        
        return (
            <div className="MainFeedPost">

                    <div className="post-flex-group" style={{textAlign: "left"}}>

                        <div className="post-flex-item post-img content" >
                        { this.props.postCreatorId == this.props.currentUserId ? <div className="postObj" ><button onClick={this.updatePost}>Revise</button><button onClick={this.deletePost}>Remove</button></div>  : null }
                            <LazyLoad 
                                
                                debounce={false}
                                offsetVertical={300}>
                                <img onClick={this.viewPost} className="fit-img img-fluid" src={this.props.imageUrl} alt="Post img"/>
                            </LazyLoad>
                        </div>
                        <div className="post-flex-item post-info">
                            <h1 onClick={this.viewPost}>{this.props.title} - {this.props.location}</h1>
                            
                            <h3><b><NavLink to={"/users/" + this.props.postCreatorId}>{this.props.userName}</NavLink></b></h3>

                            <h5>Posted at {this.props.date}</h5>
                            <p onClick={this.viewPost}>{this.props.desc}</p>
                            {comments ? <div className="commentList">{comments}</div> : null}
                            {this.props.currentUserId ? <CommentBox postId={this.props.postId} /> : null}
                        </div>
                    </div>
            </div>
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
        editPost: (postId, title, location, desc, imageUrl) => dispatch({type: actionTypes.EDIT_POST, postData: {postId: postId, title: title, location: location, desc: desc, imageUrl: imageUrl}}),
        viewPost: (postId, title, location, desc, imageUrl) => dispatch({type: actionTypes.SINGLE_POST, postData: {postId: postId, title: title, location: location, desc: desc, imageUrl: imageUrl}}),
        deletePost: (postId) => dispatch({type: actionTypes.DELETE_POST, postId: postId})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);