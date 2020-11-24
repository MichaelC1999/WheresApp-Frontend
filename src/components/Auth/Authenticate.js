import React from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../Store/actionTypes';
import './Authenticate.css';


class Authenticate extends React.Component {
    
    state = {
        name: "",
        email: "",
        password: "",
        authType: "Login"
    }


    updateInput = (input) => {
        
        if(input.target.name!=="image"){
            this.setState({[input.target.name]: input.target.value});
        } else if(input.target.name==="image"){
            this.setState({image: input.target.value})
        }
    }

    

    switchAuth = (e) => {
        e.preventDefault();
        const authType = this.state.authType === "Login" ? "Signup" : "Login"; 
        this.setState({authType: authType, error: null});
    }

    validInputs = () => {
        if(this.state.password.length < 8 || this.state.password.length > 30){
            this.setState({error: "Your password should be between 8 and 30 characters"})
        }
        if(!this.validEmail(this.state.email)){
            this.setState({error: "Not a valid email address. Example: abcd1234@gmail.com"})
        }

    }

    validEmail = (email) => {        
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
    }

    submitLogin = (e) => {
        
        //post request to api/login
        //backend find user by email
        //if user is found...
        fetch('https://wheresapp-backend.herokuapp.com/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        }).then(response => {
            if(response.status !== 200 && response.status !== 201){
                if(response.status === 404){
                    throw new Error("Login failed! Email not found")
                } else if(response.status === 403){
                    throw new Error("Login failed! Password incorrect")
                } else {
                    throw new Error("Login failed! Email and password combo do not match")
                }
            }
            return response.json();            
        }).then(resData => {
            this.loginSuccess(resData.userId, resData.token)
        }).catch(err => {
            this.setState({error: err.message})
        })            
    }

    loginSuccess = async (userId, token) => {
        //once backend has returned a successful login, change redux state of userId to the successful login userId, or the userId of user created at signup
        //also after session/cookies created in backend, relay to here to update state for session for ogged in users
        try {
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token)
            this.props.userLogin(userId, token)
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
              new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiryDate', expiryDate.toISOString());
            //this.setAutoLogout(remainingMilliseconds);
            this.props.history.push('/')
        } catch {
            console.log('assigning user Id to redux error')
        }
        
    }

    submitSignup = async (imgFile) => {
        this.setState({error: null})
        await this.validInputs();
        
        if(this.state.error){
            return ;
        }
        //post request to api/users
        //backend looks if already users with that email address
        //if no user is found, post request and create a new user
        //if user creation was a success...
        const formData = new FormData();

        formData.append('email', this.state.email)
        formData.append('password', this.state.password)
        formData.append('name', this.state.name)
        formData.append('image', imgFile);
        fetch('https://wheresapp-backend.herokuapp.com/users', {
            method: 'POST',
            headers: {
              
            },
            body: formData
          }).then(response => {
                if(response.status !== 200 && response.status !== 201){
                    if(response.status === 422){
                        throw new Error("Email is already in use")
                    } else {
                        throw new Error("There was a registration error. Try again later.")
                    }
                }
                return response.json();
                
          }).then(resData => {
                this.loginSuccess(resData.userId, resData.token);
          }).catch(err => {
                this.setState({error: err.message})
        })

    }

    submitAuth =  async (e) => {
        e.preventDefault();
        if(!this.state.image && this.state.authType === "Signup"){
            this.setState({error: "No profile picture selected"});
            return ;
        }
        await this.setState({error: null, email: this.state.email.toLowerCase(), message: "Loading..."}, () => console.log(this.state.email))

        if(this.state.authType === "Login") {
            this.submitLogin(e);
        } else if(this.state.authType === "Signup"){
            this.submitSignup(e.target.image.files[0]);
        }

    }
    
    render() {
       
        return (
            <div className="Auth">
                <h1>{this.state.authType}</h1>
                <h3 style={{color: "red"}}>{this.state.error || this.state.message}</h3>
                <form className="authForm" onSubmit={this.submitAuth}>
                    {this.state.authType === "Signup" ? <React.Fragment>
                        <div style={{border: "black 2px solid"}}>
                            <label style={this.state.image ? {marginBottom: "15", color: "lime"} : {marginBottom: "15"}} for="image">Profile image</label>

                            <input style={this.state.image ? {margin: "auto", color: "lime"} : {margin: "auto"}} type="file" name="image" accept=".jpg, .jpeg, .png" onChange={this.updateInput.bind()}/>
                        </div>
                        <label style={this.state.name ? {color: "lime"}: null } for="name">Username</label>
                        <input style={this.state.name ? {backgroundColor: "lime", color: "white"} : {border: "red 2px solid"}} type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.updateInput.bind()} /></React.Fragment> : null }

                    <label style={this.state.email.includes('@') && this.state.email.includes('.') ? {color: "black"} : null} for="email" >Email (ex. abc123@gmail.com)</label>
                    <input style={this.state.email.includes('@') && this.state.email.includes('.') ? {backgroundColor: "lime", color: "black"} : {border: "red 2px solid"}} type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.updateInput.bind()} />
                    <label style={this.state.password.length >= 8 && this.state.password.length <= 30 ? {color: "black"} : null} for="password" >Password (8-30 letters)</label>
                    <input style={this.state.password.length >= 8 && this.state.password.length <= 30 ? {backgroundColor: "lime", color: "black"} : {border: "red 2px solid"}} type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.updateInput.bind()} />

                    <button type="submit" >Submit</button>
                    <button onClick={this.switchAuth} >Switch to {this.state.authType === "Login" ? "Signup" : "Login" }</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        userLogin: (userId, token) => dispatch({type: actionTypes.USER_LOGIN, userId: userId, token: token})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);