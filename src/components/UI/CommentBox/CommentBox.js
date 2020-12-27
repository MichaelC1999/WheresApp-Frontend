import React from 'react';
import {connect} from 'react-redux';
import check from './check.svg';

import './CommentBox.css';

class CommentInput extends React.Component {
    state = {
        comment: ""
    }
    
    componentDidMount () {
        if(this.props.method === "edit"){
            this.setState({comment: this.props.comment})
        }
    }

    componentDidUpdate () {
        if(this.props.submittingEdit === true){
            this.submitComment()        
            this.props.cancelEdit()

        }
    }

    stateHandler = (e) => {
        this.setState({comment: e.target.value})
    }

    submitComment = () => {

        if(this.state.comment === this.props.comment){
            this.props.cancelEdit()
            return
        }

        if(this.state.comment.length<1){
            this.setState({error: "You need to enter a comment!"})
            return ;
        }

        const formData = new FormData();

        let url;
        let method;

        if(this.props.method === "edit") {
            formData.append('comment', this.state.comment);
            url = 'https://wheresapp-backend.herokuapp.com/posts/' + this.props.postId + '/' + this.props.commentIdx + '/editComment'
            method = "PUT"
        } else if(!this.props.method) {
            formData.append('userId', this.props.currentUserId)
            formData.append('comment', this.state.comment);
            url = 'https://wheresapp-backend.herokuapp.com/posts/' + this.props.postId + '/newComment'
            method = "POST"
        }
        

        fetch(url, {
                method: method,
                headers: {
                    authorization: 'Bearer ' + this.props.token
                },
                body: formData
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

    render() {
        return (
                <form className="commentBox" >
                    {this.state.error ? <label style={{color: "red"}} for="comment">{this.state.error}</label> : null}
                    <textarea name="comment" value={this.state.comment} onChange={this.stateHandler.bind()} placeholder="Comment here"/>
                    {this.props.method!=="edit" ? <div onClick={this.submitComment} ><img style={{margin: "25px", cursor: "pointer", backgroundColor: "rgb(201, 41, 41)", padding: "3px"}} src={check} width="50px" height="50px"/></div> : null}
                </form>

        )
    }
}

const mapStateToProps = state => {
    return {
        currentUserId: state.currentUserId,
        token: state.token
    }
}

export default connect(mapStateToProps)(CommentInput);