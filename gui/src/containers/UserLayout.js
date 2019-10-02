import React from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import './UserLayout.css';
import axios from 'axios';
import HOSTNAME from '../helpers/hostname';
import ActivityListView from './ActivityListView';

const { SubMenu } = Menu;
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
      <Layout>
        <Sider
          style={{backgroundColor: '#4F14A1', display:'flex', justifyContent:'center'}}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          
          
          <Menu  mode="inline" defaultSelectedKeys={['7']} style={{backgroundColor:'#4F14A1', justifyContent: 'center'}}>
          <h1 style={{color:'#fff', marginTop:'20px'}}>Menú</h1>

            <Menu.Item key="1">
              <span style={{color:'#fff'}} className="nav-text">Crear actividad</span>
              <Link to='/activity'></Link>
            </Menu.Item>

            <Menu.Item key="2">
              <span style={{color:'#fff'}} className="nav-text">Ver actividades</span>
              <Link to="/activityListView/"></Link>
            </Menu.Item>

            {/*<Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="user" />
              <span className="nav-text">nav 4</span>
        </Menu.Item>*/}
          </Menu>
        <Button
            type="primary"
            onClick={this.props.logout}
            style={{backgroundColor:'#38AA00', borderColor:'#38AA00'}}>
            Cerrar sesión
        </Button>
        </Sider>
        <Layout>
          <Header style={{ background: '#471291', paddingRight: 40, textAlign:'end' }} >
          <div style={{fontWeight:'bold', color:'#fff'}}>{this.state.username.toUpperCase()}</div>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#E5E9FF', minHeight: 360}}>
                
                {this.props.location.pathname == '/' ?<ActivityListView data={this.state.activity} loadData={this.loadData} />:this.props.children}
                

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