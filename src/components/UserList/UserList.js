import React from 'react';
import UserBlock from './UserBlock/UserBlock';


class UserList extends React.Component {
    
    state = {
        users: []
    }

    componentDidMount() {
        //Make a get request to api/users
        //Back end pulls a list of all Users
        fetch("https://wheresapp-backend.herokuapp.com/users", {
            method: 'get', 
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status !== 200 && response.status !== 201){
                if(response.status === 404) {
                    throw new Error("No users found! Sign-up and make some posts!");
                } else {
                    throw new Error("Something went wrong fetching the Users List. Try again later.");
                }
            }
            return response.json()
        }).then(resData => {
            this.setState({users: resData.users})
        }).catch(err => {
            console.log(err);
            this.setState({error: err.message})
        })

        //set list of users to this.state.users
        //this is to render each user in the userList, should be just basic profile info
        //postTotal should be length of the list of posts associated with that user, same with locationTotal
        //Maybe add a last posted prop, which takes the most recent post date
    }
    
    render() {
        let counter = 0;
        let breaker = false;
        const users = this.state.users.map( user => {
            console.log(user.avatarImg)
            ++counter;
            if(counter%3==0){
                breaker = true;
            }
            return <UserBlock breaker={breaker} userId={user._id} name={user.name} postTotal={user.posts.length} avatarImg={user.avatarImg} bio={user.bio} />
        })

        return (
            <div style={{textAlign: "center"}}>
                <h1 className="page-header1">{this.state.error ? this.state.error : "User List"}</h1>
                
                <div className="user-row">
                    {users}
                </div>
            
                
            </div>
        )
    }
}

export default UserList;