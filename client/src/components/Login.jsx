import React from 'react';
import firestore, { auth, googleProvider, githubProvider, facebookProvider } from "../firestore";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({ user });
          } 
        });
    }

    render() {
        return (
            <div className='app'>
                <header>
                    <div className="wrapper">
                    <h1>MOD</h1>
                    {this.state.user ?
                        <button onClick={this.logout}>Logout</button>                
                        :
                        <button onClick={this.login}>Log In</button>              
                    }
                    </div>
                </header>
                {this.state.user ?
                    <div>
                    <div className='user-profile'>
                        <img src={this.state.user.photoURL} />
                    </div>
                    </div>
                    :
                    <div className='wrapper'>
                    <p>You must be logged in to see the potluck list and submit to it.</p>
                    </div>
                }
            </div>
        );
    }

    logout() {
        auth.signOut()
        .then(() => {
        this.setState({
            user: null
        });
        });
    }

    login() {
        auth.signInWithPopup(googleProvider) 
        .then((result) => {
            const user = result.user;
            this.setState({
            user
            });
        });
    }
}