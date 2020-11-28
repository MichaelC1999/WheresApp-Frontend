import React from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../../Store/actionTypes';

class DeleteConfirm extends React.Component {
    
    state = {
        error: null
    }

    componentDidMount() {
        if(this.props.commentIdx || this.props.commentIdx===0){
            this.setState({deleteType: "comment"})
        } else {
            this.setState({deleteType: "post"})
        }
    }

    cancelDelete = () => {
        this.props.closeModal()
    }

    submitDelete = (e) => {
        e.preventDefault()
        if(this.state.deleteType==="post"){
            this.submitDeletePost()
        } else if(this.state.deleteType==="comment"){
            this.submitDeleteComment()
        }
    }

    submitDeleteComment = () => {
        fetch('https://wheresapp-backend.herokuapp.com/posts/' + this.props.postId + '/' + this.props.commentIdx + '/deleteComment', {
            method: "DELETE",
            headers: {
                authorization: 'Bearer ' + this.props.token
            }
        }).then(response => {
            if(response.status!==200 && response.status!==201){
                throw new Error('Editing a post failed!');
            }
            return response.json();

        }).then(resData => {
            
            window.location.reload() 
        }).catch(err => {
            this.setState({error: err.message})
        })
    }

    submitDeletePost = () => {
        fetch('https://wheresapp-backend.herokuapp.com/posts/' + this.props.postId, {
                method: 'DELETE',
                headers: {
                    authorization: 'bearer ' + this.props.token
                }
            }).then(response => {
                if(response.status !== 200 && response.status !== 201) {
                    if(response.status === 404){
                        throw new Error("Deletion failed. Post not found???");
                    } else if(response.status === 403) {
                        throw new Error("You cannot delete posts made by another user!");
                    } else if(response.status === 401){
                        throw new Error('You are not authorized to delete this post')
                    } else {
                        throw new Error('Deleting a post failed!');
                    }
                }
                return response.json();
              }).then(resData => {
                  this.props.closeModal();
                  window.location.reload();
                //state.posted is now true, what renders is a redirect to front page
              }).catch(err => {
                  console.log(err)
                  this.setState({error: err.message})
              })
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>

                <h5 style={{fontSize: "40px"}}>{this.state.error ? this.state.error: "Are you sure you want to delete this " + this.state.deleteType + "?"}</h5>
                <div>
                    <button style={{alignItems: "center", fontSize: "25px", height: "50px"}} onClick={this.cancelDelete}>No</button>
                    <button style={{fontSize: "25px", height: "50px"}} onClick={this.submitDelete}>Yes</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        postId: state.postData.postId,
        userId: state.currentUserId,
        token: state.token,
        commentIdx: state.commentIdx
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch({type: actionTypes.CLOSE_MODAL})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirm);