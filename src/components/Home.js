import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';

import UserLayout from '../containers/UserLayout';
import HOSTNAME from '../helpers/hostname';
import CreateActivity from './CreateActivity';
import EditActivity from './EditActivity';
import ActivityListView from '../containers/ActivityListView'
import Activity from './Activity' 

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity:'',
        };
      }

    componentDidMount(){
        const userID = localStorage.getItem('user');
        axios.get(`${HOSTNAME}/api/users/${userID}/`)
        .then(res => {
            this.setState({
                user: res.data
            })
        })

    }

    getRoutes = () => {
        if(this.state.user.is_user){
              return (
              <UserLayout >
                <Route exact path="/list" render={(props) => <ActivityListView {...props} filter="all"/>}/>
                <Route exact path='/create' component={CreateActivity}/>
                <Route exact path="/activity/:id" component={Activity}/> 
                <Route exact path="/edit/:id" component={EditActivity} />
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
