import React from "react";
import styles from './Frases.module.css'

const Frases = () => (
  <div>
    <div className={styles.main}>
      <div class="row justify-content-center">
        <div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 d-flex justify-content-center">
          <div className={styles.item}>
            <h2>Albert Einstein</h2>
            <h3>"El juego es la forma más elevada de la investigación"</h3>
          </div>
        </div>

        <div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 d-flex justify-content-center">
          <div className={styles.item}>
            <h2>Ernesto Yturralde</h2>
            <h3>
              "El juego es el disfraz del aprendizaje, un disfraz libre, divertido
              y transparente. Que no pretende ocultar nada, más bien enseñar todo"
            </h3>
          </div>
        </div>

        <div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 d-flex justify-content-center">
          <div className={styles.item}>
            <h2>George Bernard Shaw</h2>
            <h3>
              "No dejamos de jugar porque envejecemos; envejecemos porque dejamos
              de jugar"
            </h3>
          </div>
        </div>
      </div>
    </div>
    <style jsx>
      {`
        
      `}
    </style>
  </div>
);

export default Frases;