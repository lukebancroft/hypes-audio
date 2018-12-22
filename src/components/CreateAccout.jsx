import React from 'react';
import { auth } from "../firestore";

export default class Login extends React.Component {

    render() {
        return (
            <div className='app'>
            <div className="container">
                <form onSubmit={this.createEmailAndPassword.bind(this)}>
                    <div className="row">
                        <h2 style={{textAlign:"center"}}>Create an Account Manually</h2>
                        <div className="col">
                            <input type="text" name="email" placeholder="Email" /*value={this.state.email} onChange={this.handleChange}*/ required/>
                            <input type="password" name="password" placeholder="Password" /*value={this.state.password} onChange={this.handleChange}*/ required/>
                            <input type="submit" value="Create Account"/>
                        </div>
                    </div>
                </form>
            </div>

            <div className="bottom-container">
                <div className="row">
                    <div className="col">
                        <button onClick={this.handleChangePage.bind(this)} style={{color:"white"}} className="btn">Sign in</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }

    handleChangePage(event) {
        this.props.currentPage = 'login';
    }

    createEmailAndPassword(event) {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password) 
        .then((result) => {
            this.props.currentPage = 'login'
        });
    }
}