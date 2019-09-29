import React from 'react';
import { Layout, Menu, Breadcrumb, Row, Col  } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import './Index.css'
import logo from '../static/img/logo.png'
import marca from '../static/img/Sin.png'
import LoginForm from '../components/LoginForm';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Index extends React.Component {
  render(){
    return(
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#faad14', display:'flex' }}>
                <div>
                    <img src={logo} className="logo"/>
                    <img src={marca}/>
                </div>
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px', backgroundColor: '#faad14', color: 'black'}}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ marginTop: 64 }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                <Row gutter={24}>
                    <Col span={6} className='message-container'>
                            <h1 className='welcome-message'>La aplicación que te ayuda a planear clases más divertidas</h1>
                    </Col>
                    <Col span={8}>
                        <img src={logo} style={{height: '30vh', width: '30vh'}}/>
                    </Col>
                    <Col span={6}>
                        <LoginForm/>
                    </Col>
                </Row>
                
                
            </div>
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: '#ffd666' }}>
                <Row>
                    <h3>Síguenos en nuestras redes sociales: </h3>
                </Row>
            </Footer>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));