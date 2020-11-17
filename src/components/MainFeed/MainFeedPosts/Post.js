import React from 'react';
import * as actionTypes from '../../../Store/actionTypes';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import './Post.css';

class Posts extends React.Component {
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
        if(e.target.className == "noClick" || e.target.className == "postObj"){
            return ;
        }
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
        
        return (
            <div className="MainFeedPost" onClick={this.viewPost}>

                    <div className="post-flex-group" style={{textAlign: "left"}}>

                        <div className="post-flex-item post-img content" >
                        { this.props.postCreatorId == this.props.currentUserId ? <div className="postObj" ><button className="noClick" onClick={this.updatePost}>Revise</button><button  className="noClick"  onClick={this.deletePost}>Remove</button></div>  : null }
                            <LazyLoad 
                                
                                debounce={false}
                                offsetVertical={300}>
                                <img className="img-fluid" src={this.props.imageUrl} alt="Post img"/>
                            </LazyLoad>
                        </div>
                        <div className="post-flex-item post-info">
                            <h1>{this.props.title}</h1>
                            <h3>{this.props.location}</h3>
                            <p>{this.props.desc}</p>
                            <h6 className="noClick"><NavLink  className="noClick"  to={"/users/" + this.props.postCreatorId}>User: {this.props.userName}</NavLink></h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(Posts);