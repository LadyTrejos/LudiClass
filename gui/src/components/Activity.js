import React from 'react';
import 'antd/dist/antd.css';
import {Form, Button, List, Input, Upload, Icon, Modal, Avatar, Tooltip, Divider, message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import HOSTNAME from '../helpers/hostname';

const { TextArea } = Input;


function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
class Activity extends React.Component {
  state = {
    activityInfo:{
        name:'',
        description:'',
        owner:localStorage.getItem('user'),
    },
    submitting: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  
  // Inicio imagenes
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  

  handleChange = ({ fileList }) => this.setState({ fileList });

  // Fin imagenes

  handleSubmit = () => {
    if (!this.state.description && this.state.fileList.length === 0) {
      return;
    }

    this.setState({
      submitting: true,
    });
    const admin = localStorage.getItem('user');
    let postData = new FormData();
    const url = this.state.fileList[0] ? this.state.fileList[0].originFileObj : '';
    const type = this.state.fileList[0] ? this.state.fileList[0].type : '';
    postData.append('description', this.state.description);
    postData.append('admin', admin);
    postData.append('file_url', url);
    postData.append('file_type', type);
    postData.append('event', this.props.match.params.id);
    axios.put(`${HOSTNAME}/api/activity/`,
        postData,
        { headers: {"Content-type": 'multipart/form-data'}}
    )
    .then(res => this.setState({
        activityInfo:{
            name:'',
            description: '',
            owner:'',
        },
        submitting: false,
        fileList:[]
        })
    )
    
    
  };



  handleChange = ({ fileList }) => this.setState({ fileList });

  handleDeletePost = (id) => {
    axios.delete(`${HOSTNAME}/api/activity/${id}/`)
    .then(() => {
        window.location.reload();
        message.success('La publicación ha sido eliminada.')
        
    })
  }

  render() {
    
    const { submitting } = this.state;
    const { previewVisible, previewImage, fileList } = this.state;
    
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Subir archivo</div>
      </div>
    );
    return (
      <div>
            <Form>
                <Form.Item label='Nombre'>
                    <Input placeholder='Nombre de la actividad'
                        size='large'
                        onChange={e => this.setState({activityInfo: { ...this.state.activityInfo, name: e.target.value } })}>
                        
                    </Input>
                </Form.Item >
                <Form.Item label='Descripción de la actividad'>
                    <TextArea placeholder='Descripción de la actividad' rows={3} onChange={e => this.setState({activityInfo: { ...this.state.activityInfo, description: e.target.value } })} />
                </Form.Item>
                <Form.Item>
                    <div className="clearfix">
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
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </Form.Item>
                <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={this.handleSubmit} type="primary">
                    Publicar
                </Button>
                </Form.Item>
            </Form>
      </div>
    );
  }
}

export default Activity;