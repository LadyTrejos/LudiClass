import React from 'react';
import { Row, Col, Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';


class LoginForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.onAuth(values.email, values.password);
          }
        });
      };

        render() {
            const { getFieldDecorator } = this.props.form;
            return( 
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label="Correo electrónico">
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Ingresa tu correo electrónico' }],
                    })(
                        <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Correo electrónico"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item label="Contraseña">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Ingresa tu contraseña' }],
                    })(
                        <Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Contraseña"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                        <a className="login-form-forgot" href="">
                            Olvidé mi contraseña
                        </a>
                        <br/>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Entrar
                        </Button>
                    </Form.Item>
                </Form>
            );
        }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm));