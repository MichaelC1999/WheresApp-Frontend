import React from 'react';
import Post from './MainFeedPosts/Post';
import './MainFeed.css';

class MainFeed extends React.Component {
    
    state = {
        posts: null
    }

    componentDidMount() {
        //Make req to API to retrieve all posts from data base
        this.setState({loading: true})
        fetch("https://wheresapp-backend.herokuapp.com/posts", {
            method: "GET"
        }).then(response => {
            if(response.status!==200 && response.status!==201){
                console.log(response)
                if(response.status === 404){
                    throw new Error("No posts were found. You should add a post!")
                } else {
                    throw new Error("There was an error retrieving your feed")
                }
            }
            return response.json()
        }).then(resData => {
            console.log(resData)
            this.setState({posts: resData.posts, loading: false}, ()=>console.log(this.state.posts))
        }).catch(err => {
            console.log(err.message)
            this.setState({error: err.message})
        })
        //Set all (or limit w/pagination) posts received from fetch to this.state.posts

        //this.setState({posts: [{_id: 1, title: "Test Post", imgUrl: "https://i.imgur.com/Z3p50nu.png", user: "cm172596", desc: "lorem ipsum chipsum niggas siggin fouh tees"}, {_id: 2, title: "Test Post", imgUrl: "https://i.imgur.com/Z3p50nu.png", user: "cm172596", desc: "lorem ipsum chipsum niggas siggin fouh tees"}, {_id: 3, title: "Test Post", imgUrl: "https://i.imgur.com/Z3p50nu.png", user: "cm172596", desc: "lorem ipsum chipsum niggas siggin fouh tees"}, {_id: 4, title: "Test Post", imgUrl: "https://i.imgur.com/Z3p50nu.png", user: "cm172596", desc: "lorem ipsum chipsum niggas siggin fouh tees"}, {_id: 5, title: "Test Post", imgUrl: "https://i.imgur.com/Z3p50nu.png", user: "cm172596", desc: "lorem ipsum chipsum niggas siggin fouh tees"}, {_id: 6, title: "Test Post", imgUrl: "https://i.imgur.com/Z3p50nu.png", user: "cm172596", desc: "lorem ipsum chipsum niggas siggin fouh tees"}]})
    }
    
    
    render() {

        //map postsReceived state into a <Post imgUrl={} title={} desc={} user={} />
        let posts

        if(this.state.posts){
            posts = this.state.posts.map( post => {
                console.log(post)
                return <Post imageUrl={post.imageUrl} title={post.title} desc={post.desc} postCreatorId={post.creator._id} userName={post.creator.name} location={post.location} postId={post._id}/>
            })
        } else {
            posts = <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        }
        

        return (
            <React.Fragment>
                <h1 className="page-header1">{this.state.error ? this.state.error: "All posts"}</h1>
                <div className="main-post-feed" style={{textAlign: "center"}}>    
                    {posts}
                </div>
            </React.Fragment>
            
        )
    }
}

export default MainFeed;