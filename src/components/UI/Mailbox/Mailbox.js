import React from "react"
import Loader from "../Loader/Loader"
import {connect} from 'react-redux';
import Inbox from './Inbox';
import SendPM from './SendPM';
import './Mailbox.css';
import * as actionTypes from '../../../Store/actionTypes'

class Mailbox extends React.Component {
    state ={
        loading: true,
        currentMailbox: "inbox",
        writingMessage: false,
        reply: null
    }
    
    changeMailbox = (e) => {
        e.preventDefault()
        
        {this.state.currentMailbox === "inbox" ? this.setState({currentMailbox: "sent"}) : this.setState({currentMailbox: "inbox"})}
    }
    
    componentDidMount() {
        if(this.props.sent.length <= 0 && this.props.rec.length <= 0){
            fetch("https://wheresapp-backend.herokuapp.com/message", {
                headers: {
                    authorization: 'Bearer ' + this.props.token
                }
            })
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.props.setMsg(res.PM)
            })
        }
    }
    
    

    reply = (message) => {
        this.setState({reply: message, writingMessage: true})
    }

    close = () => {
        this.setState({writingMessage: false})
    }

    render() {
        let mailer;
        //stays in loading state, needs to switch out upon loading messages
        //if this.props.loaded is true
        
        if(!this.props.loaded){
            mailer = <Loader />
        } else if(this.state.writingMessage){
            mailer = <SendPM close={this.close} reply={this.state.reply}/>
        } else if(this.state.currentMailbox === "inbox"){
            mailer = <Inbox reply={this.reply} changeMailbox={this.changeMailbox} box="Inbox" messages={this.props.rec} />
        } else if(this.state.currentMailbox === "sent"){
            mailer = <Inbox reply={this.reply} box="Outbox" changeMailbox={this.changeMailbox} messages={this.props.sent} />
        }


        return (
            <div className="listed">

                {mailer}

            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        currentUserId: state.currentUserId,
        sent: state.messages.sent,
        rec: state.messages.rec,
        loaded: state.loaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMsg: (msg) => dispatch({type: actionTypes.SET_MSG, msg: msg})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mailbox);