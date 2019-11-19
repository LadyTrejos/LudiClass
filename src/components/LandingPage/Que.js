import React from "react";
import styles from './Que.module.css'

const Que = () => {
  return (
    <div>
      <div className={styles.main}>
        <div class="row" className={styles.header}>
          <h1>¿Qué es LudiClass?</h1>
        </div>
        
        <div class="row justify-content-center">
          <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className={styles.maincontent}>
              <p>
                LudiClass es la aplicación que te permite buscar y compartir
                actividades lúdicas para hacer tus clases más divertidas.
              </p>
              <br />
              
              <p>
                Creemos que el juego nos ayuda a crear experiencias que nos permitan
                <span className={styles.green}>
                  {" "}
                  aprender al mismo tiempo que salimos de la rutina .
                </span>
                <br /> ​ ¿Haz creado actividades? ¿Tienes tu propia versión de una
                dinámica?
              </p>
              <br />
              
              <p>
                <span className={styles.green}>
                  En LudiClass podrás compartir tus ideas con otras personas,
                </span>{" "}
                  para que entre todos cambiemos la manera tradicional de enseñar. ​
                  <br /> Ánimate a incluir la lúdica en{" "}
                  <span className={styles.green}>cualquier tema</span> que enseñes y para{" "}
                  <span className={styles.green}>cualquier edad.</span>
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Que;