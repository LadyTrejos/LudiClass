import React from "react";

export default function Team() {
  return (
    <div>
      <div className="main">
        <div className="header">
          <h1>¡Conoce al equipo!</h1>
        </div>
        <div className="main-content">
        <div className="item">
          <img src="/static/img/" alt='pic' />
          <h2>Lady Trejos</h2>
          <h3></h3>
        </div>
        <div className="item">
          <img src="/static/img/" alt='pic' />
          <h2>Ivan Lizarazo</h2>
          <h3></h3>
        </div>
        <div className="item">
          <img src="/static/img/" alt='pic' />
          <h2>Germán Grandas</h2>
          <h3></h3>
        </div>
        </div>
      </div>
      <style jsx>
        {`
          .main {
            height: 500px;
            background: #000D80;
          }
          .header {
            margin-top: 0.5rem;
            text-aling: center;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Boogaloo";
            color: #ff530e;
          }
          .main-content {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(3, 1fr) 50px;
            grid-gap: 150px;
            margin-left: 3.5em;
            background: transparent;
          }
        `}
      </style>
    </div>
  );
}
