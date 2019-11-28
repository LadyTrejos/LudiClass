import React from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Card, Tag, Row, List, Empty, Button, Tooltip, message } from "antd";
import styles from "./ViewActivity.module.css";
import HOSTNAME from "../helpers/hostname";

const { Meta } = Card;

class ViewActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cant: 0,

      topics: {},
      activity: []
    };
  }

  componentDidMount() {
    axios.get(`${HOSTNAME}/api/topic/`).then(res => {
      let topic = {};
      res.data.map(item => (topic[item.id] = item.name));
      this.setState({ topics: topic });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.getFavoriteLimit();
    }
  }

  getFavoriteLimit = () => {
    let favorite_count = [];
    this.props.data.map(activity => favorite_count.push(activity.users.length));
    favorite_count.sort(function(a, b) {
      return b - a;
    });

    let quantity = 10;
    if (this.props.data.length < 20) {
      quantity = Math.floor(this.props.data.length * 0.5);
    }
    this.setState({ topTen: favorite_count[quantity] });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = (e, id) => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  getTitle = () => {
    if (window.location.pathname === "/list") {
      return "Aún no se han creado actividades.";
    } else if (window.location.pathname === "/favorites") {
      return "Aún no has guardado actividades en tus favoritos.";
    } else if (window.location.pathname === "/my-content") {
      return "Aún no has creado actividades.";
    }
  };

  getDescription = item => {
    if (item.description.length < 42) {
      return `${item.description.substring(0, 140).concat("...")}\n\n\n`;
    } else if (item.description.length < 82) {
      return `${item.description.substring(0, 140).concat("...")}\n\n`;
    } else {
      return item.description.substring(0, 140).concat("...");
    }
  };
  Favorite = item => {
    console.log(this.props);
    const userID = localStorage.getItem("user");

    if (!item.users.includes(userID)) {
      item.users.push(userID);
      message.success("¡Actividad agregada a tu lista de favoritos! 💖");
    } else {
      for (var i = 0; i < item.users.length; i++) {
        if (item.users[i] === userID) {
          item.users.splice(i, 1);
        }
      }
      this.setState({ favorito: !this.state.favorito });
      message.info("Eliminaste esta actividad de tu lista de favoritos 💔");
    }
    const usersData = JSON.stringify({ users: item.users });
    axios
      .patch(`${HOSTNAME}/api/activity/${item.id}/`, usersData, {
        headers: { "Content-type": "application/json" }
      })
      .then(() => this.props.loadData())
      .catch(err => console.log(err));
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        {data.length > 0 ? (
          <List
            itemLayout="horizontal"
            grid={{
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 3
            }}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 6,
              position: "both"
            }}
            dataSource={this.props.data}
            renderItem={item => (
              <List.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "3vh 10px"
                }}
              >
                <Card
                  style={{
                    borderColor: "gray",
                    borderRadius: 20,
                    width: "80vw",
                    height: "fit-content",
                    maxWidth: "420px",
                    maxHeight: "fit-content",
                    minHeight: "fit-content"
                  }}
                  cover={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "5%"
                      }}
                    >
                      <a href={`/activity/${item.id}/`}>
                        <img
                          style={{
                            width: "100%",
                            height: "15vw",
                            minHeight: "200px",
                            objectFit: "cover"
                          }}
                          alt="Foto de la actividad"
                          src={item.picture}
                        />
                      </a>
                    </div>
                  }
                >
                  {item.users.length >= this.state.topTen &&
                  item.users.length !== 0 ? (
                    <div
                      className={`${styles.ribbon} ${styles.ribbontopright}`}
                    >
                      <span>Recomendada</span>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <Meta
                    style={{ textAlign: "center" }}
                    title={
                      <a
                        style={{ fontSize: "1.2rem", wordWrap: "break-word" }}
                        href={`/activity/${item.id}/`}
                      >
                        {item.name.length > 45
                          ? item.name[0]
                              .toUpperCase()
                              .concat(item.name.substring(1).concat("..."))
                          : item.name[0]
                              .toUpperCase()
                              .concat(item.name.substring(1))}
                      </a>
                    }
                  />
                  <br />
                  <Meta
                    style={{
                      color: "#2F3E9E",
                      overflowWrap: "break-word",
                      whiteSpace: "pre-line"
                    }}
                    description={
                      <p style={{ color: "#149", fontWeight: "bold" }}>
                        {this.getDescription(item)}
                      </p>
                    }
                  />

                  {item.topics.slice(0, 5).map(item => (
                    <a href={`/list?topic=${this.state.topics[item]}`}>
                      <Tag className={styles.tag} color="geekblue" key={item}>
                        {this.state.topics[item]}
                      </Tag>
                    </a>
                  ))}
                  <Tooltip
                    title={`${item.users.length} personas han guardado esta actividad en sus favoritos.`}
                  >
                    <br />
                    <Button
                      onClick={() => this.Favorite(item)}
                      style={{
                        fontFamily: "Delius",
                        fontSize: "1rem",
                        paddingTop: "6px"
                      }}
                      type="link"
                    >
                      {"💖 "}
                      {item.users.length}
                    </Button>
                  </Tooltip>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <Row type="flex" justify="center" align="middle">
            <Empty
              description={
                <span style={{ fontSize: 20, color: "#001870" }}>
                  {this.getTitle()}
                </span>
              }
            />
          </Row>
        )}
      </div>
    );
  }
}

export default ViewActivity;
