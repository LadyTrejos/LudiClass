import React from 'react';
import 'antd/dist/antd.css';
import {Form, Button, Input, Upload, Icon, Modal, Select, message } from 'antd';
import axios from 'axios';
import HOSTNAME from '../helpers/hostname';
import { withRouter,} from 'react-router-dom';
import history from '.././helpers/history';
import Styles from './CreateActivity.module.css';

const { TextArea } = Input;
const { Option } = Select;
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}




function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
class ActivityClass extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        activityInfo:{
            name:'',
            description:'',
            owner:localStorage.getItem('user'),
            topics:[],
            image:'',
        },
        topic:[],
        submitting: false,
        previewVisible: false,
        previewImage: '',
        fileList: [],
      };
      this.imageRef = React.createRef();
}

componentDidMount(){

  axios.get(`${HOSTNAME}/api/topic/`)
  .then( res => {
      this.setState({ topic: res.data})
  })
  .catch( err => console.log(err.message))
}

  handleTopicsChange = (value) => {
    this.setState({
        activityInfo: { ...this.state.activityInfo, topics: value}
    })
    
  }
    
  // Inicio imagenes
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);

    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      activityInfo:{...this.state.activityInfo, image: file.originFileObj}
    });
  };

  

  handleChange = ({ fileList }) => this.setState({ fileList });

  // Fin imagenes

  handleSubmit = (topics) => {
    if (!this.state.description && this.state.fileList.length === 0) {
      return;
    }

    this.setState({
      submitting: true,
    });
    let postData = new FormData();
    const image = this.state.fileList[0];
    postData.append('picture', image.originFileObj);
    postData.append('name', this.state.activityInfo.name);
    postData.append('description', this.state.activityInfo.description);
    topics.map(topic => postData.append('topics', topic));
    postData.append('owner', this.state.activityInfo.owner);

    axios.post(`${HOSTNAME}/api/activity/`,
        postData,
        { headers: {"Content-type": 'multipart/form-data'}}
    )
    .then(res => this.setState({
        activityInfo:{
            name:'',
            description: '',
            owner:'',
            topics:'',
            image:'',
        },
        submitting: false,
        fileList:[]
        })
    )
  };

  

  handleCreate = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let topics = [], promises = [];
        let data = ''
        this.state.activityInfo.topics.forEach((topic, i) => {
            if(topic.includes('>')) {
                data = topic.split('>')
                topics.push(data[0])
                
                //window.location.reload(true);
                
            } else {
                promises.push(axios.post(`${HOSTNAME}/api/topic/`,
                            `{"name": "${topic}"}`,
                            { headers: {"Content-type": "application/json"}}
                            )
                )
                //window.location.reload(true);
            }
        })
        axios.all(promises)
        .then(results => {
          results.forEach(item => topics.push(item.data.id))
          this.handleSubmit(topics)
          sleep(3000)
          history.push("/activityListView")
        }
        )
      }
      
    });
    
  }

  handleDeletePost = (id) => {
    axios.delete(`${HOSTNAME}/api/activity/${id}/`)
    .then(() => {
        window.location.reload();
        message.success('La publicación ha sido eliminada.')
        
    })
  }

  render() {

   
    
    const { getFieldDecorator } = this.props.form;
    const { submitting } = this.state;
    const { previewVisible, previewImage, fileList } = this.state;

    const topicItems = []

      this.state.topic.map( (item) =>
          topicItems.push(<Option key={item.id} value={`${item.id}>${item.name}`}>{item.name}</Option>)
      );
    
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Subir archivo</div>
      </div>
    );
    return (
      <div>
        <h1 className={Styles.title}>Crear actividad</h1>
            <Form className={Styles.labels}>
                <Form.Item label='Nombre'>
                    {getFieldDecorator('nombre',{
                        rules: [
                          { required: true, message: 'Ponle un nombre a tu actividad', type: 'string' },
                          ],
                      })(
                      <Input placeholder='Nombre de la actividad'
                      className='col-5'
                        size='large'
                        onChange={e => this.setState({activityInfo: { ...this.state.activityInfo, name: e.target.value } })}>
                        
                      </Input>
                      )}
                    
                </Form.Item >
                <Form.Item label='Descripción de la actividad'>
                  {getFieldDecorator('descripcion',{
                        rules: [
                          { required: true, message: 'Ponle una descripción a tu actividad', type: 'string' },
                          ],
                      })(
                    <TextArea 
                      placeholder='Descripción de la actividad' 
                      rows={10} 
                      onChange={e => this.setState({activityInfo: { ...this.state.activityInfo, description: e.target.value } })} 
                      class='col-4 col-md-6'
                      />
                  )}
                    
                </Form.Item>
{/*---------------------------------------------------------------------------------------------------------------*/}
                <Form.Item label="Palabras clave" extra="Para añadir una nueva palabra clave escribe el nombre en este espacio y finaliza con la tecla Enter">
                    {getFieldDecorator('topics', {
                        rules: [
                        { required: true, message: 'Usa al menos una palabra clave para que los demás usuarios puedan encontrar tu actividad más fácil', type: 'array' },
                        ],
                    })(
                        <Select 
                        size='large'
                        className='col-6'
                        mode="tags"
                        placeholder="Selecciona palabras clave para tu actividad"
                        tokenSeparators={[","]}
                        onChange={(e) => this.handleTopicsChange(e)}
                        >
                            {topicItems}
                        </Select>,
                    )}
                </Form.Item>
{/*---------------------------------------------------------------------------------------------------------------*/}
                <Form.Item className={Styles.upload}>
                    {getFieldDecorator('archivo', {
                        rules: [
                        { required: true, message: 'Sube una foto de la actividad que deseas publicar'},
                        ],
                    })(
                        <div className={"clearfix"}>
                        <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        >
                        {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '150%' }} src={previewImage} />
                        </Modal>
                        </div>
                    )}

                    
                </Form.Item>
                <Form.Item>
                <Button 
                  htmlType="submit" 
                  loading={submitting} 
                  onClick={this.handleCreate} 
                  style={{backgroundColor:'#531dab', borderColor: '#531dab'}}
                  type="primary"
                  size='large'
                  >
                      Publicar
                </Button>
                </Form.Item>
            </Form>
      </div>
    );
  }
}

const Activity = Form.create({ name: 'Activity' })(ActivityClass);

export default withRouter(Activity);
