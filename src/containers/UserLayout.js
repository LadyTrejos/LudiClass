import React from 'react';
import { Layout, Menu, Button, Row, Col, Input } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import axios from 'axios';
import HOSTNAME from '../helpers/hostname';
import ActivityListView from './ActivityListView';
import styles from './UserLayout.module.css';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

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
    return(
      <Layout >
        <Sider
          style={{backgroundColor: '#241190', flex:1, justifyContent:'flex-end', alignContent:'left'}}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >         
          
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['7']} style={{backgroundColor:'#241190', justifyContent: 'center'}}>
            {/* <h2 className={styles.menutitle}>Menú</h2> */}
            <a href="/index">
              <img className={styles.brand} src={require('../static/img/brand_logo.png')} alt="Logo de LudiClass"/>
            </a>
            {/* <div><Divider style={{backgroundColor:'white'}}/></div> */}
            <Menu.Item key="1">
              <span className={styles.option}>Crear actividad</span>
              <Link to="/createActivity"/>
            </Menu.Item>

            <Menu.Item key="2">
              <span className={styles.option}>Ver actividades</span>
              <Link to="activityListView"/>
            </Menu.Item>
          </Menu>
        <Button
            type="primary"
            onClick={this.props.logout}
            className={styles.logout}>
            Cerrar sesión
        </Button>
        </Sider>
        
        <Layout style={{backgroundColor: 'rgba(36, 17, 144, 0.2)'}}>
          <Header className={styles.header} >
            <Row type="flex">
              <Col xs={0} sm={0} md={10} lg={10} xl={10}>
                <h3 className={styles.username}>{this.state.username.toLowerCase()}</h3>
              </Col>
              <Col xs={23} sm={24} md={11} lg={9} xl={9}>
                <Search
                  placeholder="Ingrese un tema para buscar actividades..."
                  enterButton="Buscar"
                  size="large"
                  className={styles.searchbar}
                  onSearch={value => console.log(value)}
                />
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '24px 16px'}}>
            <div style={{ padding: '3vh 2vw', minHeight: '82vh', backgroundColor:'white', borderRadius: '10px'}}>
                {this.props.location.pathname === '/' ?<ActivityListView data={this.state.activity} loadData={this.loadData}/>:this.props.children}
            </div>
            
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>@LudiClass</Footer> */}
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