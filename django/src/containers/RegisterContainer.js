import React from "react";

import styles from "./RegisterContainer.module.css";
import figures from "../static/css/utils.module.css";
import RegisterForm from '../components/RegisterForm';


class RegisterContainer extends React.Component {
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
          <div className={figures.seven}></div>
          <div className={figures.eight}></div>
          <div className={figures.nine}></div>
          <div className={figures.ten}></div>
          <div className={figures.eleven}></div>
          <div className={figures.twelve}></div>
        </div>
        
        <div class="row">
            <div class="col-12 col-sm-12 col-md-7 col-lg-8 col-xl-8" >
              <div className={styles.registercontainer}>
                <h1>Regístrate</h1>
                <div class={styles.divider}><div class={styles.dividermask}></div></div>
                <div className={styles.card}>
                    <RegisterForm />
                </div>
              </div>
            </div>

          <div class="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4" >
            <div className={styles.message}>
              <a href="/index">
                <img className={styles.brand} src={require('../static/img/brand_logo.png')} alt="Logo de LudiClass" />
              </a>
              <h1>¿Ya tienes una cuenta?</h1>
              <p>¡Inicia sesión para ver las actividades que se crearon mientras no estabas!</p>
              <a href="/iniciar" className={styles.button}>Iniciar sesión</a>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default RegisterContainer;