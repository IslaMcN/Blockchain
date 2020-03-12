import React from 'react';
import axiosWithAuth from './utils/axiosWithAuth';

class Login extends React.Component{
    state = {
        credentials: {
            username: '',
            password: ''
        }
    };
    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };
    handleSubmit = e 
}