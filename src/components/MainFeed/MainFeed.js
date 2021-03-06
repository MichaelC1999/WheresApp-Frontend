import React from 'react';
import Post from './MainFeedPosts/Post';
import Loader from '../UI/Loader/Loader';
import './MainFeed.css';
import openSocket from 'socket.io-client';


class MainFeed extends React.Component {
    
    state = {
        posts: null,
        counter: 0,
        nextPage: null
    }

    componentDidMount() {
        //Make req to API to retrieve all posts from data base
        this.fetchPosts();
        const socket = openSocket('https://wheresapp-backend.herokuapp.com')
        socket.on('posts', data => {
            if(data.action === 'newPost'){
                this.addPost(data.post)
            }
        })
    }

    fetchPosts = () => {
        fetch("https://wheresapp-backend.herokuapp.com/posts/" + this.state.counter, {
            method: "GET"
        }).then(response => {
            if(response.status!==200 && response.status!==201){
                if(response.status === 404){
                    throw new Error("No posts were found. You should add a post!")
                } else {
                    throw new Error("There was an error retrieving your feed")
                }
            }
            return response.json()
        }).then(resData => {
            this.setState({posts: resData.posts, nextPage: resData.next})
        }).catch(err => {
            console.log(err.message)
            this.setState({error: err.message})
        })
    }
                                                                                                        
    addPost = post => {

        this.setState(prevState => {
            const updatedPosts = [...prevState.posts];
            if (prevState.posts.length === 20) {
                updatedPosts.pop();
            }
            updatedPosts.unshift(post);
            
            return {
              posts: updatedPosts,
            };
          });
    }

    loadNext = async () => {
        await this.setState({posts: null, counter: this.state.counter+1})
        this.fetchPosts();
    }

    loadLast = async () => {
        if(this.state.counter<1){
            return ;
        }
        await this.setState({posts: null, counter: this.state.counter-1})
        this.fetchPosts();
    }

    

    render() {

        //map postsReceived state into a <Post imgUrl={} title={} desc={} user={} />
        let posts
        
        if(this.state.posts){
            posts = this.state.posts.map((post, idx) => {
                return <Post key={idx} imageUrl={post.imageUrl} comments={post.comments} date={post.createdAt.split("T")[0]} title={post.title} desc={post.desc} postCreatorId={post.creator._id} userName={post.creator.name} location={post.location} postId={post._id}/>
            })
        } else if(!this.state.error){
            posts = <Loader />
        }

        return (
            <React.Fragment>
                <h1 className="page-header1">{this.state.error ? this.state.error: "All posts"}</h1>
                <div className="main-post-feed" style={{textAlign: "center"}}>    
                    {posts}
                    <div className="pageNav">
                        {this.state.counter >= 1 && this.state.posts ? <p className="pageSelect" onClick={this.loadLast}>{this.state.counter}</p> : null}
                        {this.state.counter >= 1 || this.state.nextPage ? <p style={{backgroundColor: "red", color: "white"}} className="pageSelect">{this.state.counter+1}</p> : null}
                        {this.state.nextPage && this.state.posts ? <p className="pageSelect" onClick={this.loadNext}>{this.state.counter+2}</p> : null}
                    </div>
                </div>
            </React.Fragment>
            
        )
    }
}

export default MainFeed;