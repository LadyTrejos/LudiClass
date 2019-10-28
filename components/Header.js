import React from "react";
import { Link, Element } from "react-scroll";

import Beneficios from "./mainPage/Beneficios";
import Que from "./mainPage/Que";

export default function Header() {
  return (
    <div>
      <header style={{ height: "550px" }}>
        <nav>
          <ul>
            <li className="nav-item">
              <Link
                activeClass="active"
                to="beneficios"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Beneficios
              </Link>
            </li>
            <li className="nav-item">
              <Link
                activeClass="active"
                to="que"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                ¿Qué es ludiclass?
              </Link>
            </li>
            <li className="nav-item">
              <Link
                activeClass="active"
                to="equipo"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Equipo
              </Link>
            </li>
            <li className="nav-item">
              <Link
                activeClass="active"
                to="sug"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Sugerencias
              </Link>
            </li>
          </ul>
        </nav>
        <div className="info">
          <div className="infoText">
            <img src={`static/img/ludiclass.png`} alt="ludi" />
            <p className="p1">
              La aplicación que te ayuda a hacer tus clases{" "}
              <span>más divertidas</span>
            </p>
            <br />
            <p className="p2">
              Encuentra actividades lúdicas para cualquier tema que enseñes y
              ¡comparte las tuyas!
            </p>
            <button>Empieza Ahora!</button>
          </div>
          <div className="bigLogo">
            <img src={`static/img/logo.png`} alt="logo" />
          </div>
        </div>
        <style jsx>
          {`
            nav {
              background: none;
              height: 100px;
              width: 100%;
            }
            nav ul {
              float: right;
            }
            nav li {
              display: inline-block;
              color: white;
              cursor: pointer;
              text-decoration: none;
              text-align: center;
              padding: 7px 10px;
              font-family: "Chelsea Market";
              font-size: 1.3rem;
            }
            header {
              color: #fff;

              background: #5433ff; /* fallback for old browsers */
              background: -webkit-linear-gradient(
                to right,
                #5433ff,
                #20bdff,
                #1d2671
              ); /* Chrome 10-25, Safari 5.1-6 */
              background: linear-gradient(to right, #5433ff, #20bdff, #1d2671);
              padding: 15px;
              text-align: center;
            }
            button {
              background: transparent;
              color: #fff;
              border: 3px solid #fff;
              border-radius: 50px;
              padding: 0.8rem 2rem;
              font: 24px "Margarine", sans-serif;
              outline: none;
              cursor: pointer;
              position: relative;
              transition: 0.2s ease-in-out;
              font-family: "Chelsea Market";
              letter-spacing: 2px;
            }
            .info {
              display: grid;
              grid-gap: 250px;
              padding: 15px;
              grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
            }
            .infoText {
              margin-top: 0.5rem;
              text-aling: center;
            }
            .p1 {
              font-family: "Delius";
              font-size: 2rem;
              color: #fff8ec;
              font-weight: bold;
              text-shadow: 0 10px 25px rgba(0, 0, 0, 0.9);
              justify-content: space-between;
            }
            .p2 {
              font-family: "Kaushan Script";
              font-size: 1.5rem;
              font-style: italic;
              font-weight: 100;
              font-height: 100;
              justify-content: space-between;
            }
            br {
              height: 5px;
            }
            .bigLogo img {
              width: 400px;
              height: 400px;
            }
          `}
        </style>
      </header>
      <Element name="beneficios" className="element">
        <Beneficios />
      </Element>
      <Element name="que" className="element">
        <Que />
      </Element>
      <Element name="equipo" className="element">
        <div className="text">
          <h1>This is a tes3t</h1>
          <style jsx>
            {`
              .text {
                height: 300px;
              }
              h1 {
                font-size: 10px;
              }
            `}
          </style>
        </div>
      </Element>
      <Element name="sug" className="element">
        <div className="text">
          <h1>This is a test2</h1>
          <style jsx>
            {`
              .text {
                height: 400px;
              }
              h1 {
                font-size: 10px;
              }
            `}
          </style>
        </div>
      </Element>
      <footer></footer>
    </div>
  );
}
