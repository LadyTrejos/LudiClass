import React from "react";
import styles from './Sugerencias.module.css'

export default function Sugerencias() {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1>Comentarios y Sugerencias</h1>
        </div>
        <div class="col-10 col-sm-8 col-md-6 mx-auto form">
          <h3>
            ¿Te ha gustado nuestra idea?
            <br /> ¿Tienes alguna duda o sugerencia?
            <br />
            ¿Quieres que incluyamos algo más?
          </h3>

          <h2> Déjanos aqui tu opinión!</h2>
          <form action="https://formspree.io/gertiven@gmail.com" method="POST">
            {/*name*/}
            <div class="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                class="form-control"
                name="name"
                id="name"
                placeholder="Ingrese su nombre"
              />
            </div>
            {/*email*/}
            <div class="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                class="form-control"
                name="email"
                id="email"
                placeholder="Ingrese su correo"
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
                placeholder="Escribe tu mensaje."
              />
            </div>
            {/*submit*/}
            <button
              type="submit"
              class="btn-green btn-block text-capitalize mt-5"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}