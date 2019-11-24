import React from "react";
import { Layout, Menu, Button, Row, Col, Input } from "antd";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as actions from "../store/actions/auth";
import axios from "axios";
import history from "../helpers/history";
import ActivityListView from "./ActivityListView";
import styles from "./UserLayout.module.css";
import figures from "../static/css/utils.module.css";

const { Content, Header, Sider } = Layout;
const { Search } = Input;

class UserLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('user'),
      actFiltered: "all"
    };
  }

  searchSubject = value => {
    
    if (value !== "") {
      history.push('/')
      this.setState({
        actFiltered: value
      });
    } else {
      this.setState({
        actFiltered: "all"
      });
    }
  };

  render() {
    const { actFiltered } = this.state;
    return (
      <div> 
        <div>
          <div className={figures.first}></div>
          <div className={figures.second}></div>
          <div className={figures.third}></div>
          <div className={figures.four}></div>
          <div className={figures.five}></div>
          <div className={figures.six}></div>
        </div>
      
      <Layout>
        <Sider
          style={{
            backgroundColor: "#241190",
            flex: 1, 
            justifyContent: "flex-end", 
            alignContent: "left", 
            zIndex: 9999,
            position: 'fixed',
            left:0,
            height: '100vh',
          }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["7"]}
            style={{ backgroundColor: "#241190", justifyContent: "center" }}
          >
            {/* <h2 className={styles.menutitle}>Menú</h2> */}
            <a href="/index">
              <img
                className={styles.brand}
                src={require("../static/img/brand_logo.png")}
                alt="Logo de LudiClass"
              />
            </a>
            {/* <div><Divider style={{backgroundColor:'white'}}/></div> */}
            <Menu.Item key="1">
              <span className={styles.option}>Crear actividad</span>
              <Link to="/create" />
            </Menu.Item>

            <Menu.Item key="2">
              <span className={styles.option}>Ver actividades</span>
              <Link to="/list" />
            </Menu.Item>
            
            <Menu.Item key="3">
              <span className={styles.option}>Mis favoritos</span>
              <Link to="/favorites" />
            </Menu.Item>
          </Menu>
          <Button
            type="primary"
            onClick={this.props.logout}
            className={styles.logout}
          >
            Cerrar sesión
          </Button>
        </Sider>

        <Layout className={styles.layout}>
          <Header className={styles.header}>
            <Row type="flex">
              <Col xs={0} sm={0} md={10} lg={10} xl={10}>
                <h3 className={styles.username}>
                  {this.state.username.toLowerCase()}
                </h3>
              </Col>
              <Col xs={23} sm={24} md={11} lg={9} xl={9}>
                <Search
                  placeholder="Ingresa un tema para buscar actividades..."
                  enterButton="Buscar"
                  size="large"
                  className={styles.searchbar}
                  onSearch={value => this.searchSubject(value)}
                />
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '100px 16px 24px', overflow: 'initial' }}>
            <div
              style={{
                padding: "3vh 2vw",
                minHeight: "82vh",
                backgroundColor: "white",
                borderRadius: "10px"
              }}
            > 
              {this.props.location.pathname === "/" ? (
                <ActivityListView filter={actFiltered} />
              ) : (
                this.props.children
              )}
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>@LudiClass</Footer> */}
        </Layout>
      </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserLayout)
);
