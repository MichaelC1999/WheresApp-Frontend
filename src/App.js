import React from 'react';
import Navigation from './components/Navigation/Navigation';
import {Route, Switch} from 'react-router-dom';
import MainFeed from './components/MainFeed/MainFeed';
import UserList from './components/UserList/UserList';
import Authenticate from './components/Auth/Authenticate';
import Modal from './components/UI/Modal/Modal';
import UserPage from './components/UserList/UserPage/UserPage';
import PostPage from './components/Post/PostPage';
import * as actionTypes from './Store/actionTypes';
import {connect} from 'react-redux';

class App extends React.Component {
  
  state = {
    modal: null
  }

  //if modalType redux state is false, render nothing
  //if modalType redux state has value of "addPost", render <Modal type="addPost" />

  componentDidMount() {
    //local component variable to check if user is logged in per localStorage
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    if(userId){
      this.props.userLogin(userId, token)
    } 
  }

  logoutHandler = () => {
    console.log(localStorage.getItem('expiryDate'))
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate')
    this.props.logoutRedux();
  }

  addPostHandler = () => {
    this.props.addPost();
  }

  render() {
    
    let renderModal = null
    if(this.props.modalType){
      renderModal = <Modal />
    }
    return (
      <div>
        <Navigation logoutHandler={this.logoutHandler} addPostHandler={this.addPostHandler} />
        {renderModal}
        <div style={{paddingTop: 52}}>
          <Switch>
            <Route path="/" exact component={MainFeed} />
            <Route path="/posts/:postId" component={PostPage} />
            <Route path="/users" exact component={UserList} />
            <Route path="/users/:userId" component={UserPage} />
            <Route path="/auth" exact component={Authenticate} />
          </Switch>
        </div>
      </div>
    )
  }
  
}


const mapStateToProps = state => {
    return {
        modalType: state.modalType,
        currentUserId: state.currentUserId
    }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (userId, token) => dispatch({type: actionTypes.USER_LOGIN, userId: userId, token: token}),
    logoutRedux: () => dispatch({type: actionTypes.LOGOUT_REDUX}),
    addPost: () => dispatch({type: actionTypes.ADD_POST})

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);