import React from "react";

import styles from "./LoginContainer.module.css";
import figures from "../static/css/utils.module.css";
import LoginForm from '../components/LoginForm';


class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    }
  }
  render(){
    return (
      <div class="container-fluid" className={styles.container}>
        <div>
          <div className={figures.first}></div>
          <div className={figures.second}></div>
          <div className={figures.third}></div>
          <div className={figures.four}></div>
          <div className={figures.five}></div>
          <div className={figures.six}></div>
        </div>
        
        <div class="row">
          <div class="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4" >
            <div className={styles.message}>
              <a href="/index">
                <img className={styles.brand} src={require('../static/img/brand_logo.png')} alt="Logo de LudiClass" style={{background: '#261293'}}/>
              </a>
              <h1>¿Aún no tienes una cuenta?</h1>
              <p>¡Regístrate y descubre un montón de actividades nuevas para tus clases!</p>
              <a href="/registro" className={styles.button}>Registrarse</a>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-7 col-lg-8 col-xl-8" >
            <div className={styles.logincontainer}>
              <h1>Inicia sesión</h1>
              <div class={styles.divider}><div class={styles.dividermask}></div></div>
              <div className={styles.card}>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginContainer;