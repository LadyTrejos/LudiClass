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
    _query:''

  };

  componentDidMount() {
    const { filter } = this.props;
    const query = this.props.location ? new URLSearchParams(this.props.location.search).get('topic') : null;
    console.log('---> ',this.props)
    console.log('el filtro es: ', filter)
    console.log('--> ',query)
    this.setState({_query:query})
    
    if (filter === "all" && query == null) {
      axios
        .get(`${HOSTNAME}/api/activity/?ordering=-created_at`)
        .then(({ data }) => {
          this.setState({
            activity: data,
            filtered: data
          });
        });
    }else if(query != null) {
      let url = `${HOSTNAME}/api/activity/?name=&topics__name=${query}`;
      console.log('la url es: ', url)
      axios
        .get(url)
        .then(res => {
          this.setState({
            activity: res.data,
            filtered: res.data
          });
        });
    }else {
      axios
        .get(`${HOSTNAME}/api/activity/?search=${filter}&&ordering=-created_at`)
        .then(res => {
          this.setState({
            activity: res.data,
            filtered: res.data
          });
        });
    }

    /*try {
      
    } catch (e) {
      console.log("no data");
    }*/
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


  handleSearchFavorites = value => {
    let activities = [],
      promises = [];

    for (const prop in value) {
      console.log(`value.${prop} = ${value[prop]}`);
      promises.push(axios.get(`${HOSTNAME}/api/activity/${value[prop]}/`));
    }

    axios.all(promises).then(results => {
      results.forEach(item => activities.push(item.data));
      this.setState({
        filtered: activities
      });
    });
  };

  render() {
    
    const { filtered } = this.state;
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <h2 className={Styles.h2}>Actividades</h2>
        </Row>
        <Row>
          
          <Col sm={12} md={8} lg={6} xl={6} xxl={6}>
            {
              this.state._query !== null ? 
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
