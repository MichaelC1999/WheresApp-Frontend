import React from 'react';
import './AddPost.css';
import {connect} from 'react-redux';
import * as actionTypes from '../Store/actionTypes'

class AddPost extends React.Component {
    
    state = {
        title: "",
        location: "",
        imageUrl: null,
        desc: "",
        showImageInput: true
    }

    componentDidMount () {
        //if this.props.postID {this.setState({title: this.props.title, location:this.props.location, imageUrl: this.props.imagUrl, desc:this.props.desc})}
        //you can fetch post and get values from there or send values in as props
        if(this.props.postData.postId){
            this.setState({
                showImageInput: false, 
                title: this.props.postData.title, 
                location: this.props.postData.location, 
                imageUrl: this.props.postData.imageUrl, 
                desc: this.props.postData.desc
            })
        }
    }


    changeHandler = (e) => {
        if(e.target.name!=="image"){
            this.setState({[e.target.name] : e.target.value})
            
        } 
        
    }

    submitHandler = (e) => {
        e.preventDefault();
        if(this.state.title.length <= 5 || this.state.desc.length <=10 || this.state.location <= 3){
            this.setState({error: "Invalid inputs"})
            return ;
        }
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('desc', this.state.desc);
        formData.append('location', this.state.location);
        formData.append('userId', this.props.currentUserId)
        if(this.state.showImageInput){
            //if form was submitted with an image selected, updated image even if legacy url
            if(e.target.image.files[0]){
                formData.append('image', e.target.image.files[0]);
            }
        } else if(this.state.imageUrl) {
            //if no new image uploaded, check if legacy url
            formData.append('image', this.state.imageUrl);
        } else {
            //if no image uploaded in form nor legacy image Url
            this.setState({error: "You need to select an image"});
            return
        }
        if(this.props.postData.postId){
            //if this.props.postID, put request to api/posts/:postID with state values attached as form data, to update old Post object with same ID
            //make put request, in controller figure out if formData 'image' is the same as legacy value. If same, return. If different, go through image upload method.
            //SEE NOTE BY POST REQ
            fetch('https://wheresapp-backend.herokuapp.com/posts/' + this.props.postData.postId, {
                method: 'PUT',
                headers: {
                    authorization: 'Bearer ' + this.props.token
                },
                body: formData
            }).then(response => {
                //doesnt get here until server returns res JSON

                if (response.status !== 200 && response.status !== 201) {
                    if(response.status === 403){
                        throw new Error("You cannot edit posts by another user");
                    } else if(response.status === 409){
                        throw new Error("An attempt was made to edit a post, but no post was found. Refresh the page and try again");
                    } else if(response.status === 404){
                        throw new Error("No post was found");
                    } else if(response.status === 401){
                        throw new Error('You must be authorized to do that')
                    } else {
                        throw new Error('Editing a post failed!');
                    }
                }
                return response.json();
            }).then(resData => {
                
                this.showImageInput();
                this.props.zeroPostData();
                this.props.closeModal();
                window.location.reload();
            }).catch(err => {
                console.log(err.message)
                this.setState({error: err.message})
            })
        } else {
            //if no postID, post request to api/posts with values attached as form data, to create new post object in Post model
            //NOTE: FEED PROJECT CREATEPOST REQ HAS DIFFERENT HEADERS WITH BEARER AUTHORIZATION, MAYBE SOURCE OF ISSUE???
            fetch('https://wheresapp-backend.herokuapp.com/posts', {
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + this.props.token
                },
                body: formData
            }).then(response => {
                if (response.status !== 200 && response.status !== 201) {
                    if(response.status === 404){
                        throw new Error('Image Upload failed. Try again later')
                    } else if(response.status === 409){
                        throw new Error('Insufficient data was received to create this post. Try again.')
                    } else if(response.status === 417){
                        throw new Error('No image file received! Select an image and try again.')
                    } else if(response.status === 401){
                        throw new Error('You are not authenticated. Sign in to make the post.')
                    } else {
                        throw new Error('Creating a post failed!');
                    }
                }
                return response.json();
            }).then(resData => {
                this.props.closeModal();
                window.location.reload();
                //state.posted is now true, what renders is a redirect to front page
            }).catch(err => {
                console.log(err);
                this.setState({error: err.message})
            })
        }
    }

    showImageInput = () => {
        this.setState({showImageInput: true})
    }

    render() {
        let error
        if(this.state.error){
            error = <h2>{this.state.error}</h2>

        }
        return (
            <div className="post-modal">
                {this.props.postData.postId ? <h1>Edit Post</h1> : <h1>New Post</h1>}
                {error}
                <form className="input" onSubmit={this.submitHandler.bind()}>
                    {this.state.title.length <= 5 && this.state.error ? <label for="title">Post title must be more than 5 characters</label> : null }
                    <input type="text" name="title" placeholder="Post Title" value={this.state.title} onChange={this.changeHandler.bind()} />
                    {this.state.location.length <= 3 && this.state.error ? <label for="location">Location must be more than 3 characters</label> : null }
                    <input type="text" name="location" placeholder="Location" value={this.state.location} onChange={this.changeHandler.bind()} />
                    {this.state.desc.length <=10 && this.state.error ? <label for="Desc">Post description must be more than 10 characters</label> : null }
                    <textarea style={{height: 100}} name="desc" placeholder="Description" value={this.state.desc} onChange={this.changeHandler.bind()}  />
                    {this.state.showImageInput ? <input type="file" name="image" onChange={this.changeHandler.bind()}/> : <h4 onClick={this.showImageInput}>Would you like to upload a different photo? Click on this text</h4>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUserId: state.currentUserId,
        postData: state.postData,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: ()=>dispatch({type: actionTypes.CLOSE_MODAL}),
        zeroPostData: ()=>dispatch({type: actionTypes.ZERO_POSTDATA})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);