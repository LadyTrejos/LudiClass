import React from 'react';
import { Layout, Menu, Icon, Button, Divider, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import './UserLayout.css';
import axios from 'axios';
import HOSTNAME from '../helpers/hostname';
import ActivityListView from './ActivityListView';
import brand from '../static/img/ludiclass.png';
import logo from '../static/img/logo.png';
import Styles from './UserLayout.module.css';
const { Header, Content, Footer, Sider } = Layout;

class UserLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        username: "",
        activity:'',
    };
  }

  componentDidMount() {
    const userID = localStorage.getItem('user');
    axios.get(`${HOSTNAME}/api/users/${userID}/`)
    .then(res => {
        this.setState({
            username: res.data.username
        })
    })

    axios.get(`${HOSTNAME}/api/activity/?ordering=-created_at`)
      .then(res =>{
          this.setState({
              activity: res.data
          })
      })
  
}

  render(){
    console.log(this.props)
    return(
      <Layout >
        <Sider
          style={{backgroundColor: '#271496', flex:1, justifyContent:'flex-end', alignContent:'left'}}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >         
          
          <Menu  mode="inline" defaultSelectedKeys={['7']} style={{backgroundColor:'#271496', justifyContent: 'center'}}>
          <h1 style={{marginTop:'6vh', textAlign: 'center', fontWeight:'bold', color:'white'}}>Menú</h1>
            <div><Divider style={{backgroundColor:'black'}}/></div>
            <Menu.Item key="1">
              <span style={{marginTop:'6vh', textAlign: 'center', fontWeight:'1.1rem', color:'white'}} className="nav-text">Crear actividad</span>
              <Link to='/createActivity'></Link>
            </Menu.Item>

            <Menu.Item key="2">
              <span style={{marginTop:'6vh', textAlign: 'center', fontWeight:'1.1rem', color:'white'}} className="nav-text">Ver actividades</span>
              <Link to="/activityListView"></Link>
            </Menu.Item>
          </Menu>
        <Button
            type="primary"
            onClick={this.props.logout}
            style={{backgroundColor:'#fa541c', borderColor:'#fa541c', marginLeft:'2.5rem'}}>
            Cerrar sesión
        </Button>
        </Sider>
        <Layout style={{backgroundColor:'white'}}>
          <Header className={Styles.header} >
            <Row type="flex">
              <Col xs={8} sm={1} md={1} lg={1} xl={1}>
                <img src={logo} alt="logo" style={{height:'4em', marginLeft:'1rem' }}/>
              </Col>
              <Col xs={8} sm={22} md={21} lg={13} xl={18}>
                <img src={brand} alt="LudiClass" style={{height:'6vh'}}/>
              </Col>
              <Col xs={8} sm={1} md={2} lg={10} xl={1}>
                <h3 style={{marginTop:'2vh', fontSize:'5vh' , color:'white'}} >{this.state.username.toUpperCase()}</h3>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '24px 16px 0'}}>
            <div style={{ padding: 24, minHeight: 360, backgroundColor:'white'}}>
                {this.props.location.pathname === '/' ?<ActivityListView data={this.state.activity} loadData={this.loadData}/>:this.props.children}
            </div>
            
          </Content>
          <Footer style={{ textAlign: 'center' }}>@LudiClass</Footer>
        </Layout>
      </Layout>
  );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserLayout));