import React from 'react';
import { Form, Icon, Input, Button, Spin, Select, DatePicker, Checkbox, Tooltip, notification } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import axios from 'axios';
import moment from 'moment';
import ReCAPTCHA from 'react-google-recaptcha';

import HOSTNAME from '../helpers/hostname';

const { Option } = Select;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userInfo:{
            email: '',
            password1: '',
            password2: '',
            username:'', 
            is_user: true,
            is_active: false,
            is_admin:false,
          },
          captcha: false,
          privacy: false,
          success_message: null
        };
        this.countryRef = React.createRef();
      }

    handleSubmit = e => {
        const selector = this.countryRef.current;
    
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            
            const userData = JSON.stringify(this.state.userInfo)
            axios.post(`${HOSTNAME}/rest-auth/registration/`, 
                            userData, 
                            { headers: {"Content-type": "application/json"}})
                
                .catch(err => {
                })
                .then(() => {
                    this.props.onAuth(this.state.userInfo.email, this.state.userInfo.password1);
                    })
            }
        
        });
    };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Las contraseñas no coinciden.');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  onChangeCaptcha = () => {
    this.setState({ captcha: true });
  };

  getPattern = (rule, value, callback) => {
    let reg = null;
    reg = /^[A-Z]{2}[0-9]{6}$/;
    
    // Check regular expresion
    if(value && !reg.test(value)){
      callback('El nombre de usuario no es válido.')
    }else {
      axios.get(`${HOSTNAME}/api/users/?search=${value}&&ordering=-id/`)
      .then(res =>{
          if(res.data.length > 0){
            if(res.data[0].username === value && value !== ''){
                callback('Este nombre de usuario ya está en uso.')
              } else {
                callback()
              }
            } else {
              callback()
            }
      })
    }
  };


  validatePrivacyCheck = (rule, value, callback) => {
    if(value){
      callback();
    } else {
      callback('Debe aceptar la política de privacidad');
    }
  }

  validatePasswordFormat = (rule, value, callback) => {
    const regex = /^(?=.*[0-9])(?=.*[!-@_#$%^&*?"])[a-zA-Z0-9!-@_#$%^&*?"]{8,15}$/gi
    if(value.length > 15){
      callback("La contraseña es demasiado larga, use menos de 15 caracteres.")
    } else if (value.length > 0 && value.length < 8) {
      callback("La contraseña es muy corta, use al menos 8 caracteres.")
    } else if (value && !regex.test(value)) {
      callback("Elija una contraseña más segura. Pruebe con una combinación de letras números y símbolos")
    }
    callback();
  };

  validateEmail = (rule, value, callback) => {
    axios.get(`${HOSTNAME}/api/users/?search=${value}&&ordering=-email/`)
    .then(res =>{
      if(res.data.length>0){
          if(res.data[0].email === value && value !== "")
            { callback("Este correo electrónico ya está registrado") }
            else {
              callback()
            }
      } else{
              callback()
            }
    })
  }

  render() {
    
    const { getFieldDecorator } = this.props.form;
    
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p> { this.props.error.message } </p>
      )
    }
    return (
    
        <Form onSubmit={this.handleSubmit}>                    
            <Form.Item label='Nombre de usuario' hasFeedback>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Ingrese un nombre de usuario'}, {/*validator: this.getPattern()*/}
                            ],
                })(<Input 
                        placeholder='Nombre de usuario'
                        size='large'
                        onChange={e => this.setState({ userInfo: { ...this.state.userInfo, username: e.target.value } }) }
                        />
                    )}
            </Form.Item>

            <Form.Item label="Correo electrónico" hasFeedback>
                {getFieldDecorator('email', {
                    
                    rules: [
                    {
                        type: 'email',
                        message: 'Correo electrónico no válido',
                    },
                    {
                        required: true,
                        message: 'Ingrese un correo electrónico',
                    },
                    {/*validator:this.validateEmail, validationTrigger:'onBlur'*/}
                    ],
                })(<Input 
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder='ejemplo@dominio.com'
                        size='large'
                        onChange={e => this.setState({ userInfo: { ...this.state.userInfo, email: e.target.value } })}
                        
                        />
                    )}
            </Form.Item>

            <Form.Item label="Contraseña" hasFeedback>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Ingrese una contraseña' },
                    { validator: this.validateToNextPassword },
                    {validator: this.validatePasswordFormat} ],
                })(
                    <Input.Password
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    size="large"
                    placeholder="Contraseña"
                    onChange={e => this.setState({ userInfo: { ...this.state.userInfo, password1: e.target.value } })}
                    />,
                )}
            </Form.Item>

            <Form.Item label="Confirmar contraseña: " hasFeedback>
                {getFieldDecorator('confirm', {
                    rules: [
                    {
                        required: true,
                        message: 'Confirme la contraseña ingresada',
                    },
                    {
                        validator: this.compareToFirstPassword,
                    },
                    ],
                })(<Input.Password 
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    size="large"
                    placeholder="Contraseña"
                    onChange={e => this.setState({ userInfo: { ...this.state.userInfo, password2: e.target.value } })}
                    onBlur={this.handleConfirmBlur}
                />)}
            </Form.Item>
            
            <Button type="primary" htmlType="submit">
                Registrarse
            </Button>
        </Form>
    );
  }
}

const WrappedNormalRegisterForm = Form.create({ name: 'register_form' })(RegisterForm);

const mapStateToProps = state => {
    return {
      loading: state.loading,
      error: state.error
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.authLogin(email, password))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedNormalRegisterForm));