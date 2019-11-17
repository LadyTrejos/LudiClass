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
            <h3>Variedad de temas</h3>
          </div>
          <div className="item">
            <img src="static/img/compartir.JPG" alt="compartir" />
            <h3>Comparte tus lúdicas</h3>
          </div>
          <div className="item">
            <img src="static/img/sugerencias.JPG" alt="sugerencias" />
            <h3>Obtén sugerencias según tus intereses</h3>
          </div>
          <div className="item">
            <img src="static/img/facil.JPG" alt="facil" />
            <h3>Fácil de usar</h3>
          </div>
          <div className="item">
            <img src="static/img/favorito.JPG" alt="favorito" />
            <h3>Guarda en tus favoritos las actividades que más te gusten</h3>
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
            height: 750px;
            background: #f6f4ea;
          }
          .header {
            margin-top: 0.5rem;
            text-aling: center;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Chelsea Market";
            color: #ff8b1c;
            font-style: italic;
          }
          .header p {
            margin-top: 10px;
            font-family: "Delius";
            font-size: 1.5rem;
            color: #ff8b1c;
            font-weight: bold;
            text-shadow: 0 10px 25px rgba(0, 0, 0, 0.7);
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
            display: grid;
            grid-template-rows: 1fr min-content;
            border-radius: 25px;
            box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
            align-items: center;
            justify-content: center;
            height: 50vh;
            flex-wrap: wrap;
            background: rgba(70, 42, 213, 0.8);
            margin: 15px 15px;
          }
          .item h3 {
            font-family: "Kaushan Script";
            font-size: 1.5rem;
            justify-content: center;
            margin: 0 12px;
            margin-bottom: 15px;
            color: #f6f4ea;
          }
          .item img {
            border-radius: 50%;
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 60%;
            height: 60%;
            padding: 0 20px;
          }
        `}
      </style>
    </div>
  );
};

export default Beneficios;
