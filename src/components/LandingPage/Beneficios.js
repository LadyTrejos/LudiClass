import React from "react";
import styles from './Beneficios.module.css';

const Beneficios = () => {
  return (
    <div class="container-fluid">
      <div className={styles.main}>
        <div class="row" className={styles.header}>
          <h1>¿Por qué elegir LudiClass?</h1>
        </div>

        <div class="row justify-content-center">
          <div class="col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
            <div className={styles.item}>
              <img src={require("../../static/img/variedad.JPG")} alt="Variedad" />
              <p>Variedad de temas</p>
            </div>
          </div>

          <div class="col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
            <div className={styles.item}>
              <img src={require("../../static/img/compartir.JPG")} alt="Compartir" />
              <p>Comparte tus lúdicas</p>
            </div>
          </div>

          <div class="col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
            <div className={styles.item}>
              <img src={require("../../static/img/sugerencias.JPG")} alt="Sugerencias" />
              <p>Obtén sugerencias según tus intereses</p>
            </div>
          </div>

          <div class="col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
            <div className={styles.item}>
              <img src={require("../../static/img/facil.JPG")} alt="Fácil" />
              <p>Fácil de usar</p>
            </div>
          </div>

          <div class="col-8 col-sm-8 col-md-2 col-lg-2 col-xl-2">
            <div className={styles.item}>
              <img src={require("../../static/img/favorito.JPG")} alt="Favoritos" />
              <p>Guarda en tus favoritos las actividades que más te gusten</p>
            </div>
          </div>
        </div>
        <div className={styles.header}>
          <p>
            ¿Tienes alguna sugerencia? ¿Te gustaría que LudiClass incluyera algo
            más?
            <br /> Déjanos tu comentario en nuestra sección de sugerencias!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Beneficios;