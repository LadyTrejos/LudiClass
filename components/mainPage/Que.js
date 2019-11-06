import React from "react";

const Que = () => {
  return (
    <div>
      <div className="main">
        <div className="header">
          <h1>¿Qué es LudiClass?</h1>
        </div>

        <div className="main-content">
          <p>
            LudiClass es la aplicación que te permite buscar y compartir
            actividades lúdicas para hacer tus clases más divertidas.
          </p>
          <br />
          <p>
            Creemos que el juego nos ayuda a crear experiencias que nos permitan
            <span className="green">
              {" "}
              aprender al mismo tiempo que salimos de la rutina .
            </span>
            <br /> ​ ¿Haz creado actividades? ¿Tienes tu propia versión de una
            dinámica?
          </p>
          <br />
          <p>
            <span className="green">
              En LudiClass podrás compartir tus ideas con otras personas,
            </span>{" "}
            para que entre todos cambiemos la manera tradicional de enseñar. ​
            <br /> Ánimate a incluir la lúdica en{" "}
            <span className="green">cualquier tema</span> que enseñes y para{" "}
            <span className="green">cualquier edad.</span>
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .main {
            height: 750px;
            background: #cbd0ef;
          }
          .header {
            margin-top: 0.5rem;
            text-aling: center;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Chelsea Market";
            color: #25b334;
            font-style: italic;
          }

          .main-content {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(1, 1fr) 100px;
            grid-gap: 15px;
            margin-left: 1.5em;
          }
          .main-content p {
            margin-left: auto;
            margin-right: auto;
            font-family: "Delius";
            color: #000;
            font-size: 1.5rem;
            text-align: center;
          }
          .green {
            color: #ff8b1c;
            font-family: "Chelsea Market";
            font-style: italic;
          }
        `}
      </style>
    </div>
  );
};

export default Que;
