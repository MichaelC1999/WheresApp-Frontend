import React from 'react';
import {connect} from 'react-redux';
import './Mailbox.css';
import '../../AddPost.css';
import * as actionTypes from '../../../Store/actionTypes'

class SendPM extends React.Component{
    state = {
        title: "",
        content: "",
        recipient: {},        
    }

    componentDidMount() {
        if(this.props.reply){
            if(this.props.reply.title.split(" ")[0] !== "RE:"){
                this.setState({title: 'RE: "'+ this.props.reply.title +'"'})
            } else {
                this.setState({title: this.props.reply.title})
            }
            if(this.props.reply.sender.id === this.props.currentUserId){
                this.setState({recipient: {id: this.props.reply.recipient.id, name: this.props.reply.recipient.name}})
            } else if(this.props.reply.recipient.id === this.props.currentUserId){
                this.setState({recipient: {id: this.props.reply.sender.id, name: this.props.reply.sender.name}})
            }
        } else if(this.props.newMessage){
            this.setState({recipient: {id: this.props.newMessage._id, name: this.props.newMessage.name}})
        }
        
        
        

        
    }

    changeInputHandler = (e) => {
        
        this.setState({[e.target.name]: e.target.value})
        
        // else {
        //     this.setState({recipients: [...this.state.recipients, e.target.value]})
        // }
    }
    
    

    submitMessage = (e) => {
        e.preventDefault()
        const formData = new FormData()

        let now = new Date()
        formData.append("title", this.state.title)
        formData.append("content", this.state.content)
        formData.append("userReceivingId", this.state.recipient.id)
        formData.append("userReceivingName", this.state.recipient.name)
        formData.append("time", now.toLocaleTimeString('en-US', { timeZone: 'America/New_York' }))
        formData.append("date", now.toLocaleDateString('en-US', { timeZone: 'America/New_York' }))
        
        fetch("https://wheresapp-backend.herokuapp.comkend.herokuapp.com/message", {
            method: "POST",
            headers: {
                authorization: 'Bearer ' + this.props.token
            },
            body: formData
        }).then(res => {
            return res.json()
        }).then(res => {
            this.props.setMsg(res.msg)
            this.props.close()
        })
    }

    render() {
        
        return (
            <div>
                <div className="boxLabel">
                    <h3>Message to {this.state.recipient.name}</h3>

                </div>
                <form style={{marginTop: "10px"}} className="input" onSubmit={this.submitMessage}>
                    <input name="title" onChange={this.changeInputHandler} value={this.state.title} placeholder="Title..." />
                    <textarea style={{height: "200px"}} name="content" onChange={this.changeInputHandler} value={this.state.content} placeholder="Message..." />
                    <button style={{margin: "8px 4px"}} type="submit">Send Message</button>
                    <button style={{margin: "8px 4px"}} type="click" onClick={this.props.close}>Cancel</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        currentUserId: state.currentUserId,
        currentUserName: state.currentUserName,
        recipient: state.recipient
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch({type: actionTypes.CLOSE_MODAL}),
        setMsg: (msg) => dispatch({type: actionTypes.SET_MSG, msg: msg})

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendPM);