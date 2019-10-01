import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import './UserLayout.css';
import axios from 'axios';
import HOSTNAME from '../helpers/hostname';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class UserLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        username: ""
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
}

  render(){
    console.log(this.props)
    return(
      <Layout>
        <Sider
          style={{backgroundColor: '#faad14'}}
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
          
          <div style={{fontWeight:'bold'}}>{this.state.username.toUpperCase()}</div>
          <Menu  mode="inline" defaultSelectedKeys={['7']} style={{backgroundColor:'#faad14'}}>
          
            <SubMenu
                key="actividades"
                
                title={
                  <span style={{backgroundColor:'#faad14'}}>
                    <Icon type="smile" />
                    <span>Actividades</span>
                  </span>
                }
              >
                <Menu.Item key="5">
                  Crear Actividad
                  <Link to='/activity'></Link>
                </Menu.Item>
                <Menu.Item key="6">Buscar</Menu.Item>
                <Menu.Item key="7">Otra cosa</Menu.Item>
              </SubMenu>
            {/*<Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">Crear actividad</span>
              
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="user" />
              <span className="nav-text">nav 4</span>
              </Menu.Item>*/}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#faad14', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#E5E9FF', minHeight: 360}}>
                {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>LudiClass</Footer>
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