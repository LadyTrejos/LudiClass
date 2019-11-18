import React from "react";

const Beneficios = () => {
  return (
    <div>
      <div className="main">
        <div className="header">
          <h1>¿Por qué elegir LudiClass?</h1>
        </div>

        <div className="main-content">
          <div className="item">
            <img src="static/img/variedad.JPG" alt="variedad" />
            <p>Variedad de temas</p>
          </div>
          <div className="item">
            <img src="static/img/compartir.JPG" alt="compartir" />
            <p>Comparte tus lúdicas</p>
          </div>
          <div className="item">
            <img src="static/img/sugerencias.JPG" alt="sugerencias" />
            <p>Obtén sugerencias según tus intereses</p>
          </div>
          <div className="item">
            <img src="static/img/facil.JPG" alt="facil" />
            <p>Fácil de usar</p>
          </div>
          <div className="item">
            <img src="static/img/favorito.JPG" alt="favorito" />
            <p>Guarda en tus favoritos las actividades que más te gusten</p>
          </div>
        </div>
        <div className="header">
          <p>
            ¿Tienes alguna sugerencia? ¿Te gustaría que LudiClass incluyera algo
            más?
            <br /> Déjanos tu comentario en nuestra sección de sugerencias!
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .main {
            height: 100vh;
            background: #fff;
          }
          .header {
            margin-top: 0.5rem;
            text-align: center;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Boogaloo";
            color: #ff530e;
          }
          .header p {
            margin-top: 10px;
            font-family: "Delius";
            font-size: 1.5rem;
            color: black;
            font-weight: bold;
            text-shadow: 0 5px 25px rgba(0, 0, 0, 0.6);
            justify-content: space-between;
          }
          .main-content {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(5, 1fr) 50px;
            grid-gap: 10px;
            margin-left: 1.5em;
            text-align: center;
          }
          .item {
            align-items: center;
            background: rgba(70, 42, 213, 1) 48%;
            border-radius: 20px;
            box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
            display: grid;
            flex-wrap: wrap;
            grid-template-rows: 1fr min-content;
            border-radius: 25px;
            box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
            align-items: center;
            justify-content: center;
            height: 50vh;
            flex-wrap: wrap;
            background: rgba(70, 42, 213, 0.8);
            margin: 15px 15px;
            text-align: center;
          }
          .item p {
            font-family: "Delius";
            font-size: 1rem;
            justify-content: center;
            margin: 0 12px;
            margin-bottom: 15px;
            padding-bottom: 1rem;
            color: #fff;
          }
          .item img {
            border-radius: 50%;
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 60%;
            height: 60%;
          }
        `}
      </style>
    </div>
  );
};

export default Beneficios;
