import React from 'react';
import axios from 'axios';
import { Row, Input } from 'antd';
import ViewActivity from '../components/ViewActivity'
import HOSTNAME from '../helpers/hostname';
import Styles from './ActivityListView.module.css';

const Search = Input.Search;

class ActivityListView extends React.Component {
state={
    activity:'',
    events: []
}

componentDidMount(){
    this.loadData()
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
        this.setState({
            activity: res.data
        })
    })
}

render(){
    return(
        <div>
            <Row type="flex" justify="center" align="middle">
                <h2 className={Styles.h2}>Actividades</h2>
            </Row>
            <Row >
                <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>

                </div>
                <Search
                    placeholder="Buscar actividad"
                    onSearch={value => this.handleSearch(value)}
                    enterButton
                    size='large'
                    style={{maxWidth: 300}}
                />
            </Row>

            <br/>
            <ViewActivity data={this.state.activity} loadData={this.props.data}/>
        </div>
    )
}

}

export default ActivityListView;