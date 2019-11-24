import React from "react";
import axios from "axios";
import { Row, Input, Col, Button } from "antd";
import ViewActivity from "../components/ViewActivity";
import HOSTNAME from "../helpers/hostname";
import Styles from "./ActivityListView.module.css";

const Search = Input.Search;

class ActivityListView extends React.Component {
  state = {
    activity: "",
    events: [],
    favorites: [],
    filtered: [],
    _query_topic:'',
    _query_search:'',
    title:''

  };
 
  componentDidMount() {
    {/*  Arreglar eso de nuevo, la query_topic dice que es null cuando hago una búsqueda*/}
    const { filter } = this.props;
    
    const query_topic = this.props.location ? new URLSearchParams(this.props.location.search).get('topic') : null;
    const query_search = this.props.location ? new URLSearchParams(this.props.location.search).get('search') : null;
    console.log('---> ',this.props)
    console.log('el filtro es: ', filter)
    console.log('query_topic ',query_topic)
    console.log('query_search ',query_search)
    this.setState({_query_topic:query_topic,_query_search:query_search})
    
    if (filter === "all" && query_topic == null && query_search == null) {
      axios
        .get(`${HOSTNAME}/api/activity/?ordering=-created_at`)
        .then(({ data }) => {
          this.setState({
            activity: data,
            filtered: data,
            title:'Actividades'
          });
        });
    }else if(query_topic != null) {
      let url = `${HOSTNAME}/api/activity/?name=&topics__name=${query_topic}&owner`;
      console.log('la url es: ', url)
      axios
        .get(url)
        .then(res => {
          this.setState({
            activity: res.data,
            filtered: res.data,
            title:'Actividades con la etiqueta "'.concat(query_topic).concat('"')
          });
        });
    }else if(query_search != null) {
      let url = `${HOSTNAME}/api/activity/?search=${query_search}`;
      console.log('la url es: ', url)
      axios
        .get(url)
        .then(res => {
          this.setState({
            activity: res.data,
            filtered: res.data,
            title:'Actividades con el nombre o etiqueta "'.concat(query_search).concat('"')
          });
        });
      }else if (filter === 'favorites') {
      axios
        .get(`${HOSTNAME}/api/activity/?name=&topics__name=&users=${localStorage.getItem('user')}`)
        .then(res => {
          this.setState({
            activity: res.data,
            filtered: res.data,
            title:'Mis actividades favoritas'
          });
        });
    }else if(filter === 'my-content'){
      axios
        .get(`${HOSTNAME}/api/activity/?name=&topics__name=&owner=${localStorage.getItem('user')}`)
        .then(res => {
          this.setState({
            activity: res.data,
            filtered: res.data,
            title:'Mis actividades'
          });
        });

    }

  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.componentDidMount();
    }
  }

  
  componentWillMount() {
    const userID = localStorage.getItem("user");

    axios.get(`${HOSTNAME}/api/users/${userID}/`).then(res => {
      this.setState({
        favorites: res.data.activities
      });
    });
  }


  render() {
    
    const { filtered } = this.state;
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
    <h2 className={Styles.h2}>{this.state.title}</h2>
        </Row>
        <Row>
          
          <Col sm={12} md={8} lg={6} xl={6} xxl={6}>
            {
              this.state._query_topic !== null || this.props.filter === 'favorites' || this.props.filter === 'my-content' || this.state._query_search !== null ? 
              <Button
              href='/list'
              className={Styles.button}
              type="primary"
            >
              Todas las actividades
            </Button>
              :
              <div></div>
            }
            
            
          </Col>
        </Row>

        <br />
        <ViewActivity data={filtered} loadData={this.props.data} />
      </div>
    );
  }
}

export default ActivityListView;
