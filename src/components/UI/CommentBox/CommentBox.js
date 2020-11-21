import React from 'react'
import {connect} from 'react-redux'

class CommentInput extends React.Component {
    state = {
        comment: ""
    }
    
    stateHandler = (e) => {
        this.setState({comment: e.target.value})
    }

    submitComment = (e) => {

        e.preventDefault()

        if(this.state.comment.length<1){
            this.setState({error: "You need to enter a comment!"})
            return ;
        }

        const formData = new FormData();
        formData.append('comment', this.state.comment);
        formData.append('userId', this.props.currentUserId)

        fetch('https://wheresapp-backend.herokuapp.com/posts/' + this.props.postId + '/newComment', {
                method: 'POST',
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
            console.log(resData)
            // window.location.reload() 
        }).catch(err => {
            this.setState({error: err.message})
        })
    }

    render() {
        return (
            <div className="noClick">
                <form className="noClick" onSubmit={this.submitComment.bind()}>
                    {this.state.error ? <label style={{color: "red"}} for="comment">{this.state.error}</label> : null}
                    <textarea className="noClick" name="comment" value={this.state.comment} onChange={this.stateHandler.bind()} placeholder="Comment here"/>
                    <button className="noClick" type="submit">Add comment</button>
                </form>

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

export default connect(mapStateToProps)(CommentInput);