import React from 'react';
import Backdrop from '../Backdrop';
import AddPost from '../../AddPost';
import PostPage from '../../Post/PostPage';
import DeleteConfirm from '../../Post/Delete/DeleteConfirm';
import {connect} from 'react-redux';
import * as actionTypes from '../../../Store/actionTypes';

import './Modal.css';

//create event with modal type as DELETE_POST and render a delete confirmation, that when yes is submitted a delet erequest is made to the server

class Modal extends React.Component {
    render() {
        let modalCompToRender = null;

        if(this.props.modalType === "ADD_POST"){
            modalCompToRender = <AddPost />
        } else if(this.props.modalType === "EDIT_POST"){
            modalCompToRender = <AddPost  />
        } else if(this.props.modalType === "SINGLE_POST"){
            modalCompToRender = <PostPage />
        } else if(this.props.modalType === "DELETE_POST"){
            modalCompToRender = <DeleteConfirm />
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
        postId: state.postId
    }
}

export default connect(mapStateToProps)(Modal);