import React from 'react';
import axios from 'axios';
import { Row, Input,Col, Button } from 'antd';
import ViewActivity from '../components/ViewActivity'
import HOSTNAME from '../helpers/hostname';
import Styles from './ActivityListView.module.css';
import { async } from 'q';

const Search = Input.Search;

class ActivityListView extends React.Component {
state={
    activity:'',
    events: [],
    favorites:[ ]
}

componentDidMount(){
    this.loadData()
}

componentWillMount(){
    const userID = localStorage.getItem('user');

    axios.get(`${HOSTNAME}/api/users/${userID}/`)
    .then(res => {
        this.setState({
        favorites: res.data.activities
        })
    })

}

loadData = () => {
    axios.get(`${HOSTNAME}/api/activity/?ordering=-created_at`)
    .then(res =>{
        this.setState({
            activity: res.data
        })
    })

}

handleSearch = (value) => {
    axios.get(`${HOSTNAME}/api/activity/?search=${value}&&ordering=-created_at`)
    .then(res =>{
        console.log('res: ',res)
        this.setState({
            activity: res.data
        })
    })
}

handleSearchFavorites = (value) =>{
    let activities = [], promises = [];
    
    for (const prop in value) {
        console.log(`value.${prop} = ${value[prop]}`);
        promises.push(axios.get(`${HOSTNAME}/api/activity/${value[prop]}/`))
      }

      axios.all(promises)
      .then(results => {
        results.forEach(item => activities.push(item.data))
        this.setState({
            activity: activities
         })
      }
      )
    
    


}

render(){
    return(
        <div>
            <Row type="flex" justify="center" align="middle">
                <h2 className={Styles.h2}>Actividades</h2>
            </Row>
            <Row >
                <Col  sm={12} md={16} lg={18} xl={18} xxl={18}>
                <Search
                    placeholder="Buscar actividad"
                    onSearch={value => this.handleSearch(value)}
                    enterButton
                    size='large'
                    style={{maxWidth: 300}}
                />
                </Col>
                <Col  sm={12} md={8} lg={6} xl={6} xxl={6}>
                    <Button 
                    onClick={() => this.handleSearchFavorites(this.state.favorites)}
                    className={Styles.button}
                    >
                        Mis actividades favoritas
                    </Button>
                </Col>
                

            </Row>

            <br/>
            <ViewActivity data={this.state.activity} loadData={this.props.data}/>
        </div>
    )
}

}

export default ActivityListView;