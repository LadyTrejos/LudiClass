import React from "react";
import styles from './Sugerencias.module.css'
import Instagram from "./Instagram";

export default function Sugerencias() {
  return (
    <div class="container-fluid" className={styles.main}>
        <div class="row justify-content-center">
          <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex flex-column">
            <h1 className={styles.header}>Comentarios y sugerencias</h1>
            <p>
            ¿Te ha gustado nuestra idea?
            ¿Tienes alguna duda o sugerencia?
            <br />
            ¿Quieres que incluyamos algo más?
            </p>
            <p>¡Déjanos aqui tu opinión!</p>
            
            <div className={styles.formulario}>
              <form action="https://formspree.io/gertiven@gmail.com" method="POST">
                {/*name*/}
                <div class="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    id="name"
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                {/*email*/}
                <div class="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    id="email"
                    placeholder="Ingresa tu correo"
                  />
                </div>
                {/*descripcion*/}
                <div class="form-group">
                  <label htmlFor="descripcion">Déjanos un mensaje</label>
                  <textarea
                    name="descripcion"
                    id="descripcion"
                    class="form-control"
                    rows="5"
                    placeholder="Escribe aquí tu mensaje"
                  />
                </div>
                {/*submit*/}
                <button
                  type="submit"
                  class="btn btn-danger"
                  className={styles.btn}
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <h1 className={styles.header}>Síguenos en Instagram</h1>
            <Instagram/>
          </div>
        </div>

    </div>
  );
}