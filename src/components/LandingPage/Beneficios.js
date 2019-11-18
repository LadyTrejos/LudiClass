import React from "react";
import styles from './Beneficios.module.css';

const Beneficios = () => {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1>¿Por qué elegir LudiClass?</h1>
        </div>

        <div className={styles.maincontent}>
          <div className={styles.item}>
            <img src={require("../../static/img/variedad.JPG")} alt="variedad" />
            <p>Variedad de temas</p>
          </div>
          <div className={styles.item}>
            <img src={require("../../static/img/compartir.JPG")} alt="compartir" />
            <p>Comparte tus lúdicas</p>
          </div>
          <div className={styles.item}>
            <img src={require("../../static/img/sugerencias.JPG")} alt="sugerencias" />
            <p>Obtén sugerencias según tus intereses</p>
          </div>
          <div className={styles.item}>
            <img src={require("../../static/img/facil.JPG")} alt="facil" />
            <p>Fácil de usar</p>
          </div>
          <div className={styles.item}>
            <img src={require("../../static/img/favorito.JPG")} alt="favorito" />
            <p>Guarda en tus favoritos las actividades que más te gusten</p>
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