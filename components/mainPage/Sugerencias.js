import React from "react";

export default function Sugerencias() {
  return (
    <div>
      <div className="main">
        <div className="header">
          <h1>Comentarios y Sugerencias</h1>
        </div>
        <div className="col-10 col-sm-8 col-md-6 mx-auto form">
          <h3>
            ¿Te ha gustado nuestra idea?
            <br /> ¿Tienes alguna duda o sugerencia?
            <br />
            ¿Quieres que incluyamos algo más?
          </h3>

          <h2> Déjanos aqui tu opinión!!</h2>
          <form action="https://formspree.io/gertiven@gmail.com" method="POST">
            {/*name*/}
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                placeholder="Ingrese su nombre"
              />
            </div>
            {/*email*/}
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Ingrese su correo"
              />
            </div>
            {/*descripcion*/}
            <div className="form-group">
              <label htmlFor="descripcion">Déjanos un mensaje</label>
              <textarea
                name="descripcion"
                id="descripcion"
                className="form-control"
                rows="5"
                placeholder="Escribe tu mensaje."
              />
            </div>
            {/*submit*/}
            <button
              type="submit"
              className="btn btn-green btn-block text-capitalize mt-5"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
      <style jsx>
        {`
          @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
          .main {
            height: 800px;
            background: rgba(70, 42, 213, 0.8);
            width: 100%;
          }
          .header {
            margin: 0.5rem 1rem;
            text-aling: center;
            font-family: "Delius";

            display: flex;
            align-items: center;
            justify-content: center;
            color: #ff8b1c;
            font-style: italic;
          }
          .header h1 {
            font-size: 3.5rem;
          }
          .form {
            color: #fff;
          }
          .form h3,
          h2 {
            color: #fff;
            font-family: "Kaushan Script";
          }
          .btn-green {
            color: #ff8b1c;
            border-color: #ff8b1c;
            border-width: 0.21rem;
          }
        `}
      </style>
    </div>
  );
}
