import React from "react";
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
    message
  } from "antd";
import { withRouter } from "react-router-dom";
import axios from "axios";
import styles from "./CreateActivity.module.css";

import history from "../helpers/history";
import HOSTNAME from "../helpers/hostname";
import ChangeActivityImage from "./ChangeActivityImage";

const { Option } = Select;
const { TextArea } = Input;


  class ModActivity extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        activityInfo: {

            id:"",
            picture:"",
            name:"", 
            description:"",
            owner: localStorage.getItem("user"),
            created_at: "",
            topics:[],
            
        },
        topics: []
    };
    this.imageRef = React.createRef();
  }

  componentWillMount(){

    const activityID = this.props.match.params.id;
    axios.get(`${HOSTNAME}/api/activity/${activityID}/`)
    .then(res => { 
        
      this.setState({ 
          activityInfo: {
          name: res.data.name,
          description: res.data.description,
          created_at: res.data.created_at,
          owner: res.data.owner,      
          topics: res.data.topics,
          picture: res.data.picture,
          }
      }, () => {
        axios.get(`${HOSTNAME}/api/topic/`)
        .then( res => {
            let topics = {}
            res.data.map( item => 
                topics[item.id] = item.name
                )
            let data = this.state.activityInfo.topics.map( item => `${item}>${topics[item]}`)
            this.setState({ topics: res.data, activityInfo: { ...this.state.activityInfo, topics: data}},()=>console.log(this.state.activityInfo))
        })
        .catch( err => console.log(err.message))
      })
    })
  }

  onChange = e => {
    const { value } = e.target;
    const reg = /^(0|[1-9][0-9]*)([0-9]*)?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      this.props.onChange(value);
    }
  };


  handletopicChange = (value) => {
      this.setState({
          activityInfo: { ...this.state.activityInfo, topics: value}
      }, () => console.log(this.state))
      
  }

  putActivity = (topics, id) => {
      
      this.setState({
          activityInfo: { ...this.state.activityInfo, topics: topics}
      }, () => {
          
          let activityData = new FormData();
          activityData.append("name", this.state.activityInfo.name);
          activityData.append("description", this.state.activityInfo.description);
          this.state.activityInfo.topics.map(topic => activityData.append("topics", topic));
          
          axios.patch(`${HOSTNAME}/api/activity/${id}/`, 
                      activityData, 
                      { headers: {"Content-type": "multipart/form-data"}})
          .then((res) => {
            message.success("La actividad ha sido editada con éxito.", 10)
            history.push(`/activity/${id}`)
          })
          .catch(err => {
              console.log(err.message)
            })
      })
  }

  handleCreate = (e,id) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        values = {...values, owner: localStorage.getItem("user")}
      if (!err) {
        let topics = [], promises = [];
        let data = ""
        values.topics.forEach((topic, i) => {
            if(topic.includes(">")) {
                data = topic.split(">")
                topics.push(data[0])
            } else {
                console.log("acá")
                console.log(topic)
              promises.push(axios.post(`${HOSTNAME}/api/topic/`,
              `{"name": "${topic}"}`,
              { headers: {"Content-type": "application/json"}}
              )
  )
                
            }
        })
        axios.all(promises)
        .then(results => {
          results.forEach(item => topics.push(item.data.id))
          this.putActivity(topics,id)
        }
        )
      }
  });
  }

  render() {
    console.log("created_at: ",this.state.activityInfo.created_at)
    const activityID = this.props.match.params.id
      
    const { getFieldDecorator } = this.props.form;
    const topicItems = [] 
    
    this.state.topics.map( (item) => 
        topicItems.push(<Option key={item.id} value={`${item.id}>${item.name}`}>{item.name}</Option>)
    );


    return (
      <div>
        <div>
          <h1 className={styles.title}>Editar actividad</h1>
        </div>
      
        <Form layout="vertical" className={styles.form}>
          
          <Row gutter={50}>
            <Col md={12}>
              <Row>
                <Form.Item label="Nombre de la actividad">
                  {getFieldDecorator("name", {
                    rules: [{ required: true, message: 'Ponle un nombre a tu actividad', type: 'string' },
                  ],
                    initialValue: this.state.activityInfo.name
                  })(<Input
                        placeholder="Nombre de la actividad"
                        size="large"
                        onChange={e => {this.setState({ activityInfo: {...this.state.activityInfo, name: e.target.value}})}}
                      />
                    )}
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="Descripción de la actividad">
                  {getFieldDecorator("description", {
                    rules: [
                      { required: true, message: 'Ponle una descripción a tu actividad', type: 'string' },
                      ],
                    initialValue: this.state.activityInfo.description
                  })(<TextArea rows={8}
                        placeholder="Cuéntanos de qué trata tu actividad, qué materiales necesita..."
                        size="large"
                        onChange={e => {this.setState({ activityInfo: {...this.state.activityInfo, description: e.target.value}})} }
                        />)}
                </Form.Item>
              </Row>
            </Col>

            <Col md={8}>
              <Row>
                <Form.Item>
                  {getFieldDecorator("picture", )(<ChangeActivityImage activityID={activityID} ref={this.imageRef}/>
                  )}
                </Form.Item>
              </Row>
              <Row>
                <p className={styles.highlight}>
                  Recuerda usar una imagen que se relacione con la actividad que estás publicando.
                </p>
                <p>Esta imagen, las palabras claves y el nombre que le pongas a tu actividad, ayudarán a los demás usuarios a 
                  identificar con facilidad el tema que desarrolla. 
                </p>
              </Row>
            </Col>
          </Row>
          
          <Row >
            <Col>
                <Form.Item 
                  label="Palabras clave" 
                  extra="Para añadir una nueva palabra clave escribe el nombre en este espacio y finaliza con la tecla Enter">
                    {getFieldDecorator('topics', {
                      rules: [
                      { required: true, message: 'Usa al menos una palabra clave para que los demás usuarios puedan encontrar tu actividad más fácil', type: 'array' },
                      ],
                      initialValue: this.state.activityInfo.topics
                    })(
                        <Select 
                        size="large"
                        mode="tags"
                        placeholder="Selecciona palabras clave que identifiquen tu actividad"
                        tokenSeparators={[","]}
                        onChange={(e) => this.handletopicChange(e)}
                        >
                            {topicItems}
                        </Select>,
                    )}
                </Form.Item>
            </Col>
          </Row>


          <Row gutter={20}>
            <Col md={3}>
              <Form.Item>
                <Button 
                    size="large" 
                    type="primary"
                    onClick={(e)=>this.handleCreate(e,this.props.match.params.id)}
                    style={{backgroundColor:'#25b334', borderColor: '#25b334'}}>
                  Guardar
                </Button>
              </Form.Item>
            </Col>

            <Col md={3}>
              <Form.Item>
                <Button 
                    size="large" 
                    onClick={() => history.push(`/activity/${this.props.match.params.id}/`)}
                    style={{backgroundColor:"#fff", borderColor:"#8F9AE0"}} >

                Cancelar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const EditActivity = Form.create({ name: "EditActivity" })(ModActivity);



export default withRouter(EditActivity);