import React from "react";
import {
  Form,
  Tag,
  Skeleton,
  Row,
  Button,
  Col,
  Modal,
  message,
  BackTop
} from "antd";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import * as actions from "../store/actions/auth";

import history from "../helpers/history";
import HOSTNAME from "../helpers/hostname";
import PostList from "./PostList";
import Styles from "./Activity.module.css";

const confirm = Modal.confirm;

class ActivityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      submitting: false,
      previewVisible: false,
      previewImage: "",
      fileList: [],
      actFiltered: "all"
    };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    const activityID = this.props.match.params.id;
    axios.get(`${HOSTNAME}/api/activity/${activityID}/`).then(res => {
      this.setState({
        activityInfo: {
          name: res.data.name,
          description: res.data.description,
          topics: res.data.topics,
          image: res.data.picture,
          id: res.data.id,
          owner: res.data.owner,
          users: res.data.users
        }
      });
    });
    axios.get(`${HOSTNAME}/api/topic/`).then(res => {
      let topics = {};
      res.data.map(item => (topics[item.id] = item.name));
      this.setState({ all_topics: topics });
    });
  }

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  Favorite = () => {
    const id = this.state.activityInfo.id;
    const userID = localStorage.getItem("user");

    if (!this.state.activityInfo.users.includes(userID)) {
      this.state.activityInfo.users.push(userID);
      this.setState({ favorito: !this.state.favorito });
      message.success("¡Actividad agregada a tu lista de favoritos! 💖");
    } else {
      for (var i = 0; i < this.state.activityInfo.users.length; i++) {
        if (this.state.activityInfo.users[i] === userID) {
          this.state.activityInfo.users.splice(i, 1);
        }
      }
      this.setState({ favorito: !this.state.favorito });
      message.info("Eliminaste esta actividad de tu lista de favoritos 💔");
    }
    const usersData = JSON.stringify({ users: this.state.activityInfo.users });
    axios
      .patch(`${HOSTNAME}/api/activity/${id}/`, usersData, {
        headers: { "Content-type": "application/json" }
      })
      .catch(err => console.log(err));
  };

  searchTag = value => {
    if (value !== "") {
      history.push("/");
      this.setState({
        actFiltered: value
      });
    }
  };

  showConfirm(id) {
    confirm({
      title: "¿Estás seguro(a) que deseas eliminar esta actividad?",
      content: "Si eliminas la actividad nadie podrá verla de nuevo.",
      onOk: () => {
        axios
          .delete(`${HOSTNAME}/api/activity/${id}/`)
          .then(() => history.push("/list"));
      },
      onCancel() {}
    });
  }

  render() {
    const userID = localStorage.getItem("user");
    return (
      <div className={Styles.gr} style={{ padding: 15 }}>
        <BackTop />
        {this.state.activityInfo && this.state.all_topics ? (
          <div>
            <Row type="flex" justify="center">
              <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                <h2 className={Styles.title}>
                  {this.state.activityInfo.name[0]
                    .toUpperCase()
                    .concat(this.state.activityInfo.name.substring(1))}
                </h2>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col>
                <img
                  className={Styles.image}
                  alt="Foto de la actividad"
                  src={this.state.activityInfo.image}
                />
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col md={24} lg={24}>
                <Row type="flex" justify="center">
                  <Col md={5} lg={5}>
                    {this.state.activityInfo.owner ===
                    localStorage.getItem("user") ? (
                      <Button
                        className={Styles.editbtn}
                        href={`/edit/${this.state.activityInfo.id}`}
                      >
                        Editar actividad
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </Col>
                  <Col md={5} lg={5}>
                    {this.state.activityInfo.owner ===
                    localStorage.getItem("user") ? (
                      <Button
                        type="default"
                        onClick={() => {
                          this.showConfirm(this.state.activityInfo.id);
                        }}
                        style={{
                          borderRadius: "10px",
                          color: "#271496",
                          fontWeight: "bold",
                          marginTop: "1rem"
                        }}
                      >
                        Eliminar actividad
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row type="flex" justify="center">
              <Col xs={24} sm={24} md={16} lg={16}>
                <p className={Styles.label}>Descripción:</p>
                <p style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>
                  {this.state.activityInfo.description}
                </p>
              </Col>
            </Row>

            <Row>
              <Col>
                <div>
                  <p className={Styles.label}>
                    Creada por: &nbsp;
                    <a href={`/list?autor=${this.state.activityInfo.owner}`}>
                      <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                        {this.state.activityInfo.owner}
                      </span>
                    </a>
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  {this.state.activityInfo.topics.map(item => (
                    <a href={`/list?topic=${this.state.all_topics[item]}`}>
                      <Tag color="geekblue">{this.state.all_topics[item]}</Tag>
                    </a>
                  ))}
                </div>
              </Col>
            </Row>

            <Row justify="center">
              <Col offset={4} md={16} lg={16}>
                <p className={Styles.label}>Descripción:</p>
                <p style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>
                  {this.state.activityInfo.description}
                </p>
              </Col>
            </Row>

            <Row>
              <Col offset={4}>
                <div>
                  <p className={Styles.label}>
                    Creada por: &nbsp;
                    <a href={`/list?autor=${this.state.activityInfo.owner}`}>
                      <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                        {this.state.activityInfo.owner}
                      </span>
                    </a>
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col offset={4}>
                <div>
                  {this.state.activityInfo.topics.map(item => (
                    <a href={`/list?topic=${this.state.all_topics[item]}`}>
                      <Tag color="geekblue">{this.state.all_topics[item]}</Tag>
                    </a>
                  ))}
                </div>
              </Col>
            </Row>

            <Row type="flex" justify="center" align="middle" gutter={20}>
              <Col>
                <Button
                  size="large"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    color: "#fff",
                    fontWeight: "bold",
                    marginTop: "1rem",
                    backgroundColor: "#25b334",
                    borderColor: "#25b334"
                  }}
                  onClick={() => this.Favorite()}
                >
                  {this.state.activityInfo.users.includes(userID)
                    ? "Eliminar de favoritos 💔"
                    : "Favorito 💖"}
                </Button>
              </Col>
            </Row>
            <br />
            <span className={Styles.span}>Comentarios</span>

            <PostList {...this.props} user={true} />
          </div>
        ) : (
          <Skeleton />
        )}
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

const Activity = Form.create({ name: "Activity" })(ActivityDetail);
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Activity)
);
