import React from 'react';
import {Icon} from 'antd';
import { auth, googleProvider, githubProvider, facebookProvider } from "../firestore";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'login',
            email: '',
            password: '',
            user: null
        }
        this.handleChange = this.handleChange.bind(this);

        this.createEmailAndPassword = this.createEmailAndPassword.bind(this);
        
        this.loginWithEmailAndPassword = this.loginWithEmailAndPassword.bind(this);
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

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        if (this.state.currentPage === 'login') {
            return (
                <div className='app'>
                <div className="container">
                {this.state.user ?
                            <div>
                                <button onClick={this.logout} className='user-profile btn'>
                                    <img className='user-photo' src={this.state.user.photoURL} alt="User" />
                                    <div className="logout">LOGOUT</div>
                                </button>
                            </div>               
                            :
                    <form onSubmit={this.loginWithEmailAndPassword}>
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
                                <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                                <input type="submit" value="Login"/>
                            </div>
                        </div>
                    </form>
                }
                </div>

                {this.state.user ? <div></div> :
                <div className="bottom-container">
                    <div className="row">
                        
                            <button name='currentPage' value='create' onClick={this.handleChange} style={{color:"white", width: "40%"}} className="btn bottom-container">Sign up</button>
                        
                    </div>
                </div>
                }
                </div>
            );
        }
        else if (this.state.currentPage === 'create') {
            return(
                <div className='app'>
                <div className="container">
                    <form onSubmit={this.createEmailAndPassword}>
                        <div className="row">
                            <h2 style={{textAlign:"center"}}>Create an Account Manually</h2>
                            
                                <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} style={{width: "40%"}} required/><br/>
                                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} style={{width: "40%"}} required/><br/>
                                <input type="submit" value="Create Account" style={{width: "40%"}}/>
                            
                        </div>
                    </form>
                </div>

                <div className="bottom-container">
                    <div className="row">
                        
                            <button name='currentPage' value='login' onClick={this.handleChange} style={{color:"white", width: "40%"}} className="btn bottom-container">Sign in</button>
                        
                    </div>
                </div>
                </div>
            );
        }
        else { return(<div></div>)}
    }

    logout() {
        auth.signOut()
        .then(() => {
            this.setState({
                email: '',
                password: '',
                user: null
            });
            alert("Logout");
        });
    }

    loginWithEmailAndPassword(event) {
        event.preventDefault();
        auth.signInWithEmailAndPassword(this.state.email, this.state.password) 
        .then((result) => {
            const user = result.user;
            this.setState({
                user
            });            
            alert("Login Success");
        });
    }

    loginWithFacebook() {
        auth.signInWithPopup(facebookProvider) 
        .then((result) => {
            const user = result.user;
            this.setState({
                user
            });
            alert("Login Success");
        });
    }

    loginWithGithub() {
        auth.signInWithPopup(githubProvider) 
        .then((result) => {
            const user = result.user;
            this.setState({
                user
            });
            alert("Login Success");
        });
    }

    loginWithGoogle() {
        auth.signInWithPopup(googleProvider) 
        .then((result) => {
            const user = result.user;
            this.setState({
                user
            });
            alert("Login Success");
        });
    }

    createEmailAndPassword(event) {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password) 
        .then((result) => {
            this.setState({
                user: null,
                email: '',
                password: '',
                currentPage: 'login'
            });
            alert("Creation Success");
        });
    }
}