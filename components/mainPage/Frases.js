import React from "react";

const Frases = () => (
  <div>
    <div className="main">
      <div className="main-content">
        <div className="item">
          <h2>Albert Einstein</h2>
          <h3>"El juego es la forma más elevada de la investigación"</h3>
        </div>
        <div className="item">
          <h2>Ernesto Yturralde</h2>
          <h3>
            "El juego es el disfraz del aprendizaje, un disfraz libre, divertido
            y transparente. Que no pretende ocultar nada, más bien enseñar todo"
          </h3>
        </div>
        <div className="item">
          <h2>George Bernard Shaw</h2>
          <h3>
            "No dejamos de jugar porque envejecemos; envejecemos porque dejamos
            de jugar"
          </h3>
        </div>
      </div>
    </div>
    <style jsx>
      {`
        .main {
          height: 70vh;
          background: #fff;
        }
        .main-content {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(3, 1fr) 50px;
          grid-gap: 150px;
          margin-left: 3.5em;
        }
        .item {
          display: block;
          border-radius: 25%;
          grid-template-rows: 1fr min-content;
          box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 50vh;
          flex-wrap: wrap;
          background: rgba(70, 42, 213, 0.6) 48%;
          margin: 30px 15px;
          padding-bottom: 15px;
        }
        .item h2 {
          font-family: "Boogaloo";
          font-size: 2.5rem;
          justify-content: center;
          text-align: center;
          margin: 2.5rem 10px;
          color: #ff8b1c;
          font-style: italic;
        }
        .item h3 {
          text-align: center;
          font-family: "Delius";
          padding: 0 1rem;
          color: #fff;
        }
      `}
    </style>
  </div>
);

export default Frases;
