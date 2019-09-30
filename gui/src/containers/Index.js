import React from 'react';
import { Layout, Menu, Breadcrumb, Row, Col, Icon, Button  } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import './Index.css'
import logo from '../static/img/logo.png'
import marca from '../static/img/Sin.png'
import ludiclass from '../static/img/ludiclass.png'

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Index extends React.Component {
    state = {
        login: true
    }

    changeContent = () => {
        this.setState({login: !this.state.login})
    }
  render(){
    return(
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#faad14', display:'flex' }}>
                <div>
                    <img src={logo} className="logo"/>
                    <img src={marca}/>
                </div>
            </Header>
            <Content style={{ marginTop: 64 }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                <Row gutter={24} type="flex" justify="center">
                    <div className='message-container col-3'>
                        <img src={ludiclass} className='col-10'/>
                        <h1 className='welcome-message'>La aplicación que te ayuda a planear clases más divertidas</h1>
                    </div>
                    <div className='col-3'>
                        <img src={logo} style={{height: '30vh', width: '30vh'}}/>
                    </div>
                    <div className='col-3'>
                        <div id='grad-login' className='login-container'>
                            <h1 style={{fontFamily: 'Righteous, sanserif', fontSize: '30px'}}>
                                { this.state.login ? 'Iniciar sesión' : 'Registrarse' }
                            </h1>
                            
                            {this.state.login ? <LoginForm/> : <RegisterForm/>}
                            
                            <div style={{display: 'flex', flexDirection: 'row', paddingTop: '20px'}}>
                                <p>{ this.state.login ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?' } </p>
                                <Button type="link" onClick={this.changeContent} size='small'>
                                    { this.state.login ? 'Regístrate aquí' : 'Inicia sesión' }
                                </Button>
                            </div>
                        </div>
                    </div>
                </Row>
                
                
            </div>
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: '#ffc53d' }}>
                <Row>
                    <h3>Síguenos en nuestras redes sociales: </h3>
                </Row>
                <Row gutter={24} type="flex" justify="center">
                    <Col>
                        <a href='https://www.facebook.com/121172999280716/'>
                            <Icon type="facebook" style={{ fontSize: '28px', color: '#10239e' }}/>
                        </a>
                    </Col>
                    <Col>
                        <a href='https://www.instagram.com/ludiclass/'>
                            <Icon type="instagram" style={{ fontSize: '28px', color: '#9254de' }}/>
                        </a>
                    </Col>
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