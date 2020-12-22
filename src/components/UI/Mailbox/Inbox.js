import React from "react"
import Loader from "../Loader/Loader"
import {connect} from 'react-redux';
import * as actionTypes from '../../../Store/actionTypes'
import './Mailbox.css';
import Message from './Message';

class Inbox extends React.Component {
    state ={
        
    }

    
    componentDidMount() {
        

    }

    
    
    render() {
        
        let display;

        if(this.props.messages.length > 0){
            display = this.props.messages.map(mes => {
                return <Message reply={this.props.reply} box={this.props.box} mes={mes} />
            })
        } else {
            display = <h3>No messages in {this.props.box}</h3>
        }
        return (
            <React.Fragment>
                <div className="boxLabel">
                        <h3>{this.props.box}</h3>
                </div>
                <button className="mailBtn" type="click" onClick={this.props.changeMailbox}>Switch to {this.props.box === "Inbox" ? "Outbox" : "Inbox"}</button>
                <div className="mailList" style={{marginTop: "10px"}}>
                    
                    {display}
                    
                </div>
            </React.Fragment>
        )
    }
}


export default (Inbox);