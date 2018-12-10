import React from 'react';
import {Icon} from 'antd'
import { auth, googleProvider, githubProvider, facebookProvider } from "../firestore";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        this.loginWithFacebook = this.loginWithFacebook.bind(this);
        this.loginWithGithub = this.loginWithGithub.bind(this);
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
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
            <div className="container">
            {this.state.user ?
                        <div>
                            <button onClick={this.logout} className='user-profile btn'>
                                <img className='user-photo' src={this.state.user.photoURL} />
                                <div className="logout">LOGOUT</div>
                            </button>
                        </div>               
                        :
                <form>
                    <div className="row">
                        <h2 style={{textAlign:"center"}}>Login with Social Media or Manually</h2>
                        <div className="vl">
                            <span className="vl-innertext">or</span>
                        </div>

                        <div className="col">
                            <button onClick={this.loginWithFacebook} className="fb btn">
                                <Icon type="facebook"/> Login with Facebook
                            </button>
                            <button onClick={this.loginWithGithub} className="github btn">
                                <Icon type="github"/> Login with Github
                            </button>
                            <button onClick={this.loginWithGoogle} className="google btn">
                                <Icon type="google"/> Login with Google+
                            </button>
                        </div>

                        <div className="col">
                            <div className="hide-md-lg">
                                <p>Or sign in manually:</p>
                            </div>

                            <input type="text" name="username" placeholder="Username" required/>
                            <input type="password" name="password" placeholder="Password" required/>
                            <input type="submit" value="Login"/>
                        </div>
                    </div>
                </form>
            }
            </div>

            {this.state.user ? <div></div> :
            <div className="bottom-container">
                <div className="row">
                    <div className="col">
                        <a href="#" style={{color:"white"}} className="btn">Sign up</a>
                    </div>
                    <div className="col">
                        <a href="#" style={{color:"white"}} className="btn">Forgot password?</a>
                    </div>
                </div>
            </div>
            }
            </div>



            /*<div className='app'>
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
            </div>*/
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

    loginWithGithub() {
        auth.signInWithPopup(githubProvider) 
        .then((result) => {
            const user = result.user;
            this.setState({
            user
            });
        });
    }

    loginWithGoogle() {
        auth.signInWithPopup(googleProvider) 
        .then((result) => {
            const user = result.user;
            this.setState({
            user
            });
        });
    }

    loginWithFacebook() {
        auth.signInWithPopup(facebookProvider) 
        .then((result) => {
            const user = result.user;
            this.setState({
            user
            });
        });
    }
}