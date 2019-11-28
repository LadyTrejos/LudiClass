import React from "react";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Input,
  notification,
  Icon,
  Typography
} from "antd";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as actions from "../store/actions/auth";

import history from "../helpers/history";
import ActivityListView from "./ActivityListView";
import styles from "./UserLayout.module.css";

const { Content, Header, Sider } = Layout;
const { Search } = Input;

class UserLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("user"),
      actFiltered: "all"
    };
  }

  searchSubject = value => {
    if (value !== "") {
      history.push(`/list?search=${value}`);
      this.setState({
        actFiltered: value
      });
    } else {
      this.setState({
        actFiltered: "all"
      });
    }
  };

  openNotification = () => {
    notification.open({
      description: (
        <p style={{ fontSize: "1.1rem" }}>
          <Icon type="arrow-left" style={{ color: "#ff530e" }} />
          &nbsp;&nbsp;Este es el menú&nbsp;
          <Icon
            type="unordered-list"
            style={{
              backgroundColor: "#001529",
              color: "#fff",
              padding: "5px",
              borderRadius: "2px"
            }}
          />
          , aquí encontrarás todo lo que puedes hacer en LudiClass.
        </p>
      ),
      duration: 20,
      placement: "topLeft",
      key: 1,
      style: {
        width: "80vw",
        marginLeft: "12px",
        marginTop: "13px",
        maxWidth: "350px"
      }
    });
  };

  render() {
    const { actFiltered } = this.state;
    return (
      <div>
        <Layout>
          <Sider
            style={{
              backgroundColor: "#241190",
              flex: 1,
              justifyContent: "flex-end",
              alignContent: "left",
              zIndex: 9999,
              position: "fixed",
              left: 0,
              height: "100vh"
            }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              if (collapsed & (this.props.location.pathname === "/")) {
                this.openNotification();
              } else {
                notification.close(1);
              }
            }}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["7"]}
              style={{ backgroundColor: "#241190", justifyContent: "center" }}
            >
              <a href="/index">
                <img
                  className={styles.brand}
                  src={require("../static/img/brand_logo.png")}
                  alt="Logo de LudiClass"
                />
              </a>
              
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["7"]}
                style={{ backgroundColor: "#241190", justifyContent: "center" }}
              >
                <Menu.Item key="1">
                  <span className={styles.option}>Crear actividad</span>

                  <Link to="/create" />
                </Menu.Item>

                <Menu.Item key="2">
                  <span className={styles.option}>Mis actividades</span>
                  <Link to="/my-content" />
                </Menu.Item>

                <Menu.Item key="3">
                  <span className={styles.option}>Mis favoritos</span>
                  <Link to="/favorites" />
                </Menu.Item>

                <Menu.Item key="4">
                  <span className={styles.option}>Todas las actividades</span>
                  <Link to="/list" />
                </Menu.Item>
              </Menu>

              <Button
                type="primary"
                onClick={this.props.logout}
                className={styles.logout}
              >
                Cerrar sesión
              </Button>
            </Menu>
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

            <Content style={{ margin: "100px 16px 24px", overflow: "initial" }}>
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
