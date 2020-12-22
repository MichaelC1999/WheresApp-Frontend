import React from 'react';
import {connect} from 'react-redux';
import './Mailbox.css';


class Message extends React.Component {
    
    state = {
        showMsg: false,
        touched: false
    }

    componentDidMount() {
        
    }

    toggleShowMsg = () => {
        this.state.showMsg === false ? this.setState({showMsg: true}) : this.setState({showMsg: false})
        if(this.props.mes.unread === true && this.state.showMsg === false && !this.state.touched && this.props.mes.recipient.id === this.props.currentUserId){
            this.setState({touched: true})
            fetch("https://wheresapp-backend.herokuapp.comkend.herokuapp.com/message/" + this.props.mes._id, {
                headers: {
                    authorization: 'Bearer ' + this.props.token
                }
            })
        }
    }
    
    render() {
        let name
        if(this.props.box === "Inbox"){
            name = <h4>{this.props.mes.sender.name}</h4>
        } else if(this.props.box === "Outbox"){
            name = <h4>{this.props.mes.recipient.name}</h4>
        }

        let text
        if(this.state.showMsg){
            text = <p className="msgText" onClick={() => this.props.reply(this.props.mes)}>{this.props.mes.content}</p>
        } else {
            text = null
        }


        return (
            <div className="message" style={this.props.mes.unread && this.props.box === "Inbox" && this.state.touched === false ? {backgroundColor: "rgb(201, 41, 41, .37)"} : null } onClick={this.toggleShowMsg}>
                
                <h3>{this.props.mes.title}</h3>
                {name}
                {text}
                <h5>{this.props.mes.sentAt.time}</h5>
                <h6>{this.props.mes.sentAt.date}</h6>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        currentUserId: state.currentUserId
    }
}

export default connect(mapStateToProps, null)(Message);