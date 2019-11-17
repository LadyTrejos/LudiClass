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
          height: 500px;
          background: #f6f4ea;
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
        }
        .item h2 {
          font-family: "Kaushan Script";
          font-size: 2.5rem;
          justify-content: center;
          text-align: center;
          margin: 2.5rem 10px;
          color: #000;
        }
        .item h3 {
          text-align: center;
          font-size: 1.5rem;
          font-family: "Chelsea Market";
          padding: 0 1px;
          color: #f6f4ea;
        }
      `}
    </style>
  </div>
);

export default Frases;
