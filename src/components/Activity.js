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
    message
  } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import * as actions from '../store/actions/auth';

import history from '../helpers/history';
import HOSTNAME from '../helpers/hostname';
import PostList from './PostList';
import Styles from './Activity.module.css';

const confirm = Modal.confirm;

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
        },
        activitys:[],
        submitting: false,
        previewVisible: false,
        previewImage: '',
        fileList: [],
      };
      this.imageRef = React.createRef();
}
  
  
componentDidMount(){
    const userID = localStorage.getItem('user');
    console.log(userID)
   
    const activityID = this.props.match.params.id;
    console.log(activityID)
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
        },

      })
    })
    axios.get(`${HOSTNAME}/api/topic/`)
      .then(res => {
        
        let topics = {}
        res.data.map( item => 
          topics[item.id] = item.name
        )
        this.setState({ all_topics: topics }, ()=>console.log("YAAAA"))
      })
    }


  handleCancel = e => {
    console.log(e);
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
          history.push('/activityListView')
        )
      },
      onCancel() {},
    });
  }

  ToSuscribe = () => {
      const id = this.state.activityInfo.id;
    if(!this.state.activitys.includes(id)){
      this.state.activitys.push(id)
      this.setState({suscrito: !this.state.suscrito})
      message.success('Acabas de suscribirte al evento.')
    }else{
      for( var i = 0; i < this.state.activitys.length; i++){ 
        if ( this.state.activitys[i] === id) {
          this.state.activitys.splice(i, 1); 
        }
     }
     this.setState({suscrito: !this.state.suscrito})
     message.info('Haz eliminado la suscripción al evento.')
    }
    const userID = localStorage.getItem('user')
    const ActivityData = JSON.stringify({activitys:this.state.activitys});
    console.log(ActivityData)
    axios.patch(`${HOSTNAME}/api/users/${userID}/`,
        ActivityData,
        { headers: {"Content-type": "application/json"}}
    )
    .catch(err => 
      console.log(err)
    )
    
  
    }

  render() {
    return (
        <div className={Styles.gr} style={{padding:15 }}>
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
                        column={{ xxl: 1, xl: 1, lg: 3, md: 3, sm: 2, xs: 1 }}
                        
                    >
                        
                        
                        <Descriptions.Item className={Styles.descriptionItem} label='Descripción'>
                            <br/>
                            <p style={{fontSize:'1.2rem'}} > {this.state.activityInfo.description} </p>
                        </Descriptions.Item>
                        <br/> 
                        <Descriptions.Item className={Styles.descriptionItem} label="Creador">
                            
                            <p style={{fontSize:'1.1rem', fontWeight:'bold'}} > {this.state.activityInfo.owner.toUpperCase()}</p>
                        </Descriptions.Item>
                        
                        <Descriptions.Item className={Styles.descriptionItem} label='Temas'>{ this.state.activityInfo.topics.map( item => (
                                <Tag style={{fontWeight:'bold' }} key={item}>{this.state.all_topics[item]}</Tag>
                                ))
                                }</Descriptions.Item>
                        
                    </Descriptions>
                    {/* <Row type="flex" justify="center" align="middle" gutter={20}>
                        <Col>
                            <Button size='large' 
                                style={{width:'100%', borderRadius:'10%', color:'#fff', backgroundColor:'#FF5126', borderColor:'FF5126'}}
                                onClick={()=>this.ToSuscribe()}
                            >
                                 {this.state.activitys.includes(this.state.activityInfo.id) ? "Eliminar suscripción" : "Suscribirse"}
                            </Button>
                        </Col>
                    </Row> */}
                    <br/>
                    <span style={{fontSize:20, color:'#001870'}}>Publicaciones</span>
                    {/*<PostList {...this.props} admin={false}/>*/}
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