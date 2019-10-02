import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';

import Activity from './CreateActivity';
import UserLayout from '../containers/UserLayout';
import ActivityListView from '../containers/ActivityListView'
import HOSTNAME from '../helpers/hostname';

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
                <Route exact path="/activityListView/" component={ActivityListView} />
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
