import React from 'react';
import Post from '../../MainFeed/MainFeedPosts/Post';
import * as actionTypes from '../../../Store/actionTypes'


import './UserPage.css'
import {connect} from 'react-redux'

class UserPage extends React.Component {
    
    state = {
        user: null,
        editing: false
    }
    //fetch user by userId in params
    //fill out userInfo with info about user by ID
    //pass userId in userPage prop to <MainFeed ... />
    //in MainFeed comp, check for userPage prop. If userPage has a value (value would be userId passed from here), fetch all posts made by user with this id
    
    editUser = () => {
        this.setState({editing: true});
    }

    bioChange = (e) => {
        this.setState({user: {...this.state.user, bio: e.target.value}});
    }

    submitEdit = (e) => {
        e.preventDefault();
        
        this.setState({editing: false })
        const formData = new FormData();
        formData.append('bio', this.state.user.bio);
        fetch('https://wheresapp-backend.herokuapp.com/users/' + this.props.match.params.userId, {
                method: 'PUT',
                headers: {
                    authorization: 'Bearer ' + this.props.token
                },
                body: formData
            }).then(response => {
                if(response.status !==200 && response.status !== 201 ){
                    throw new Error("Editing user page failed")
                }

                return response.json();

            }).catch(err => {
                console.log(err)
                this.setState({error: err.message})

            })
    }

    componentDidMount() {
        fetch("https://wheresapp-backend.herokuapp.com/users/" + this.props.match.params.userId, {
            method: "GET"
        }).then(response => {
            if(response.status !== 200 && response.status !== 201){
                if(response.status === 404){
                    throw new Error("User not found. Go back to the Users List");
                } else {
                    throw new Error("Fetching this users page has failed.");
                }
            }
            return response.json()
        }).then(resData => {
            this.setState({user: resData.user, posts: resData.posts})
        }).catch(err => {
            console.log(err.message);
            this.setState({error: err.message});
        })
    }

    render () {
        //loop through posts, map them into Post components to render
        let loaded = null
        let bio;

        

        if(this.state.user){
            if(this.props.match.params.userId === this.props.currentUserId && this.props.token){
                this.state.user.bio ? bio = <p onClick={this.editUser}>{this.state.user.bio}</p> : bio =<p onClick={this.editUser}>Click here to edit your bio</p>
            } else {
                this.state.user.bio ? bio = <p>{this.state.user.bio}</p> : bio = <p>This user has no bio</p>
            }
            if(this.state.editing){
                bio = <form onSubmit={this.submitEdit.bind()} >
                    <textarea className="big-input-box" type="textarea" onChange={this.bioChange.bind()} placeholder="Write your new bio here" value={this.state.user.bio} />
                    <button style={{marginBottom: 15}} type="submit">Submit edit</button>
                </form>
            }

            loaded = (
                <div className="userPage container-fluid">
                    <div className="row justify-content-center">
                        <div className="userInfo col-sm-4">
                            
                            <img className="img-fluid" style={{marginTop: "20px"}} src={this.state.user.avatarImg} alt="" />
                            
                            <h1>{this.state.user.name}</h1>
                            {bio}
                            <button onClick={() => this.props.sendPM(this.state.user)}>Send Message</button>
                        </div>  
                        <div className="postFeed col-sm-7">
                            {this.state.posts.length === 0 ? <h1 style={{textAlign: "center"}}>No posts have been made by this user</h1> : null}
                            {this.state.posts.map(post => {
                                
                                return <Post imageUrl={post.imageUrl}  date={post.createdAt.split("T")[0]} comments={post.comments} title={post.title} desc={post.desc} postCreatorId={this.state.user._id} userName={this.state.user.name} location={post.location} postId={post._id}/>
                            })}
                        </div>
                    </div>

                </div>
            )
            
        }
        if(this.state.error){
            loaded = <h2>{this.state.error}</h2>;
        }
        return ( <div>{loaded}</div> )
    }
}

const mapStateToProps = state => {
    return {
        currentUserId: state.currentUserId,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendPM: (user) => dispatch({type: actionTypes.SEND_PM, recipient: user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);