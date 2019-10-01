import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';

import UserLayout from '../containers/UserLayout';
import LoginForm from './LoginForm';
import HOSTNAME from '../helpers/hostname';
import Activity from './Activity';
import RegisterForm from './RegisterForm';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    componentDidMount(){
        const userID = localStorage.getItem('user');
        axios.get(`${HOSTNAME}/api/users/${userID}/`)
        .then(res => {
            console.log(res.data)
            this.setState({
                user: res.data
            })
        })
    }

    getRoutes = () => {
        if(this.state.user.is_user){
              console.log('is user')
              return (
              <UserLayout>
                <Route exact path="/login" component={LoginForm}/>
                <Route exact path='/activity' component={Activity}/>
              </UserLayout>)
              }
              }

    render() {
        let isLoading = this.state.user ? false : true;
        return(
            <div >
            {
                isLoading ?
                    <Spin tip="Cargando..."/>
                :
                (
                    this.getRoutes()
                )
            }
            </div>
        );
    }
}

export default Home;
