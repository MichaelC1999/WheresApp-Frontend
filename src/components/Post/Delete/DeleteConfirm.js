import React from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../../Store/actionTypes';

class DeleteConfirm extends React.Component {
    
    state = {
        error: null
    }

    cancelDelete = () => {
        this.props.closeModal()
    }

    submitDelete = (e) => {
        e.preventDefault()
        console.log(this.props.userId, e)
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
            <div>
                <h5>{this.state.error ? this.state.error: "Are you sure you would like to delete this post?"}</h5>
                <div>
                    <button onClick={this.cancelDelete}>No</button>
                    <button onClick={this.submitDelete}>Yes</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        postId: state.postData.postId,
        userId: state.currentUserId,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch({type: actionTypes.CLOSE_MODAL})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirm);