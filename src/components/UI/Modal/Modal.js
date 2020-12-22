import React from 'react';
import Backdrop from '../Backdrop';
import AddPost from '../../AddPost';
import Mailbox from '../Mailbox/Mailbox';
import ViewPostImg from '../../Post/ViewPostImg';
import DeleteConfirm from '../../Post/Delete/DeleteConfirm';
import SendPM from '../Mailbox/SendPM'
import {connect} from 'react-redux';

import './Modal.css';

//create event with modal type as DELETE_POST and render a delete confirmation, that when yes is submitted a delet erequest is made to the server

class Modal extends React.Component {
    render() {
        let modalCompToRender = null;

        if(this.props.modalType === "ADD_POST"){
            modalCompToRender = <AddPost />
        } else if(this.props.modalType === "EDIT_POST"){
            modalCompToRender = <AddPost  />
        } else if(this.props.modalType === "VIEW_IMG"){
            modalCompToRender = <ViewPostImg />
        } else if(this.props.modalType === "DELETE_POST"){
            modalCompToRender = <DeleteConfirm />
        } else if(this.props.modalType === "OPEN_MAIL"){
            modalCompToRender = <Mailbox />
        } else if(this.props.modalType === "SEND_PM"){
            modalCompToRender = <SendPM newMessage={this.props.recipient}/>
        }


        return (
            <div>
                <Backdrop />
                <div
                    className="Modal"
                    style={{
                        transform: true ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: true ? '1' : '0'
                    }}>
                    {modalCompToRender}
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        modalType: state.modalType,
        postId: state.postId,
        recipient: state.recipient
    }
}

export default connect(mapStateToProps)(Modal);