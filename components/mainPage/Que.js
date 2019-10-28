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
            aprender al mismo tiempo que salimos de la rutina. ​ ¿Haz creado
            actividades? ¿Tienes tu propia versión de una dinámica? En LudiClass
            podrás compartir tus ideas con otras personas, para que entre todos
            cambiemos la manera tradicional de enseñar. ​ Ánimate a incluir la
            lúdica en cualquier tema que enseñes y para cualquier edad.
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .main {
            height: 750px;
            background: #ff8da3;
          }
          .header {
            margin-top: 0.5rem;
            text-aling: center;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Chelsea Market";
            color: #fff8ec;
            font-style: italic;
          }

          .main-content {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(5, 1fr) 50px;
            grid-gap: 10px;
            margin-left: 1.5em;
          }
        `}
      </style>
    </div>
  );
};

export default Que;
