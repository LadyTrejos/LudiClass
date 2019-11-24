import React from 'react';
import {
    Form,
    Descriptions,
    Tag,
    Skeleton,
    Row,
    Button,
    Col,
    Modal,
    message,
    BackTop
  } from 'antd';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import * as actions from '../store/actions/auth';

import history from '../helpers/history';
import HOSTNAME from '../helpers/hostname';
import PostList from './PostList';
import Styles from './Activity.module.css';

import ActivityListView from "../containers/ActivityListView";

const confirm = Modal.confirm;
const { CheckableTag } = Tag;

class ActivityDetail extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        activityInfo:{
            name:'',
            description:'',
            owner:'',
            topics:[],
            image:'',
            id:'',
            users: []
        },
        activities:[],
        submitting: false,
        previewVisible: false,
        previewImage: '',
        fileList: [],
        actFiltered:'all',
      };
      this.imageRef = React.createRef();
}
  
  
componentDidMount(){
    const userID = localStorage.getItem('user');

    const activityID = this.props.match.params.id;
    axios.get(`${HOSTNAME}/api/activity/${activityID}/`)
    .then(res => {
        this.setState({ 
        activityInfo: {
            name: res.data.name,
            description:res.data.description,
            topics: res.data.topics,
            image: res.data.picture,
            id: res.data.id,
            owner: res.data.owner,
            users: res.data.users
        },
        

      })
    })
    axios.get(`${HOSTNAME}/api/topic/`)
      .then(res => {
        
        let topics = {}
        res.data.map( item => 
          topics[item.id] = item.name
        )
        this.setState({ all_topics: topics })
      })
    }

 

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  showConfirm(id) {

    confirm({
      title: '¿Estás seguro(a) que deseas eliminar esta actividad?',
      content: 'Si eliminas la actividad nadie podrá verla de nuevo.',
      onOk: () => {
        axios.delete(`${HOSTNAME}/api/activity/${id}/`)
        .then(() => 
          history.push('/list')
        )
      },
      onCancel() {},
    });
  }

  Favorite = () => {
    const id = this.state.activityInfo.id;
    const userID = localStorage.getItem('user')
    
    if(!this.state.activityInfo.users.includes(userID)){
      this.state.activityInfo.users.push(userID)
      this.setState({favorito: !this.state.favorito})
      message.success('¡Actividad agregada a tus favoritos! 💖')
    }else{
      for( var i = 0; i < this.state.activityInfo.users.length; i++){ 
        if ( this.state.activityInfo.users[i] === userID) {
          this.state.activityInfo.users.splice(i, 1); 
        }
     }
     this.setState({favorito: !this.state.favorito})
     message.info('Eliminaste esta actividad de tu lista de favoritos 💔')
    }
    const usersData = JSON.stringify({users: this.state.activityInfo.users});
    axios.patch(`${HOSTNAME}/api/activity/${id}/`,
        usersData,
        { headers: {"Content-type": "application/json"}}
    )
    .catch(err => 
      console.log(err)
    )
  }

  searchTag = (value) => {
    console.log('Estoy en searchTag ',value)
    if (value !== "") {
     history.push('/')
      this.setState({
        actFiltered: value
      });
    } 
  }

  showConfirm(id) {

    confirm({
      title: '¿Estás seguro(a) que deseas eliminar esta actividad?',
      content: 'Si eliminas la actividad nadie podrá volver a verla.',
      onOk: () => {
        console.log(this.state)
        axios.delete(`${HOSTNAME}/api/activity/${id}/`)
        .then(() => 
          history.push('/')
        )
      },
      onCancel() {},
    });
  }
  

  render() {
    const userID = localStorage.getItem('user');
    const { actFiltered } = this.state;
    return (
        
        <div className={Styles.gr} style={{padding:15 }}>
          <BackTop/>
            {
                this.state.activityInfo && this.state.all_topics ? 
                <div>
                    <div
                        style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"5%"}}>
                        
                        <br/>
                        <img
                            className={Styles.image}
                            alt="Foto de la actividad"
                            src={this.state.activityInfo.image}
                        />
                    </div>        
                    <Descriptions
                        
                        title={<span style={{display:"flex", justifyContent:"center", alignItems:"center",fontSize:'2rem', color:'#FA541C'}}>{this.state.activityInfo.name.toUpperCase()}</span>}
                        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                        
                    >
                        <Descriptions.Item className={Styles.descriptionItem} label='Descripción'>
                          <br/>
                          <p style={{fontSize:'1.2rem', whiteSpace:'pre-wrap'}} > {this.state.activityInfo.description} </p>
                            
                        </Descriptions.Item>
                        <br/> 
                        <Descriptions.Item className={Styles.descriptionItem} label="Creador">
                            
                            <p style={{fontSize:'1.1rem', fontWeight:'bold'}} > {this.state.activityInfo.owner.toUpperCase()}</p>
                        </Descriptions.Item>
                        
                        <Descriptions.Item className={Styles.descriptionItem} label='Temas'>{ this.state.activityInfo.topics.map( item => (
                                <a href={`/list?topic=${this.state.all_topics[item]}`}><Tag>{this.state.all_topics[item]}</Tag></a>
                                ))
                                }</Descriptions.Item>
                        
                    </Descriptions>
                    <Row type="flex" justify="center" align="middle" gutter={20}>
                        <Col>
                            <Button size='large' 
                                style={{width:'100%', borderRadius:'10px', color:'#fff', fontWeight: 'bold', marginTop:'1rem', backgroundColor:'#25b334', borderColor:'#25b334'}}
                                onClick={()=>this.Favorite()}
                            >
                                 {this.state.activityInfo.users.includes(userID) ? "Eliminar de favoritos 💔" : "Favorito 💖"}
                            </Button>
                        </Col>
                        <Col>
                          {this.state.activityInfo.owner === localStorage.getItem('user')?
                            <Button size='large' 
                                  style={{width:'100%', borderRadius:'10px', color:'#fff', fontWeight: 'bold', marginTop:'1rem', backgroundColor:'#25b379', borderColor:'#25b334'}}
                                  href= {`/edit/${this.state.activityInfo.id}`}

                              >
                                    Editar actividad
                              </Button>
                            :
                            <div></div>
                          }
                        </Col>
                        <Col>
                        {this.state.activityInfo.owner === localStorage.getItem('user')?
                            <Button  type="danger" onClick={() => {this.showConfirm(this.state.activityInfo.id)}} size='large' style={{borderRadius:'10px', color:'#fff', fontWeight: 'bold', marginTop:'1rem'}}>
                              Eliminar actividad
                            </Button>
                        :
                        <div></div>
                        }
                        </Col>
                    </Row>
                    <br/>
                    <span className={Styles.span}>Comentarios</span>
                    
                    
                    <PostList {...this.props} user={true}/>
                </div>
                :
                <Skeleton/>
            }
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  }
}

const Activity = Form.create({ name: 'Activity' })(ActivityDetail);
const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(actions.logout())
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activity));