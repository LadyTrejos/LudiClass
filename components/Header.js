import React from "react";
import Link from "next/link";
import { Link as LinkScroll, Element } from "react-scroll";

import Beneficios from "./mainPage/Beneficios";
import Que from "./mainPage/Que";
import Frases from "./mainPage/Frases";
import Team from "./mainPage/Team";
import Sugerencias from "./mainPage/Sugerencias";

export default function Header() {
  return (
    <div>
      <header style={{ height: "550px" }}>
        <nav>
          <ul>
            <li className="nav-item">
              <LinkScroll
                activeClass="active"
                to="beneficios"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Beneficios
              </LinkScroll>
            </li>
            <li className="nav-item">
              <LinkScroll
                activeClass="active"
                to="que"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                ¿Qué es LudiClass?
              </LinkScroll>
            </li>
            <li className="nav-item">
              <LinkScroll
                activeClass="active"
                to="equipo"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Equipo
              </LinkScroll>
            </li>
            <li className="nav-item">
              <LinkScroll
                activeClass="active"
                to="sug"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Sugerencias
              </LinkScroll>
            </li>
            <li className="nav-item">
              <Link href="/login">
                <button>Ingresar</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/registro">
                <button>Registrarse</button>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="info">
          <div className="infoText">
            <img src={`static/img/ludiclass.png`} alt="LudiClass" />
            <p className="p1">
              La aplicación que te ayuda a hacer tus clases{" "}
              <span>más divertidas</span>
            </p>
            <br />
            <p className="p2">
              Encuentra actividades lúdicas para cualquier tema que enseñes y
              ¡comparte las tuyas!
            </p>
            <Link href="/registro">
              <button>¡Empieza ahora!</button>
            </Link>
          </div>
          <div className="bigLogo">
            <img src={`static/img/logo.png`} alt="Logo de LudiClass" />
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
              font-family: "Delius";
              font-size: 1.1rem;
            }
            nav li button {
              border: 1px solid #ff530e;
              border-radius: 15px;
              padding: 0.3rem 1rem;
              background: #ff530e;
              color: #fff;
              font-family: "Delius";
              font-size: 1.1rem;
            }
            header {
              color: #fff;
              background: rgb(36, 17, 144); /* fallback for old browsers */
              background: -webkit-linear-gradient(
                to right,
                rgba(36, 17, 144, 1) 0%,
                rgba(70, 42, 213, 1) 48%,
                rgba(52, 174, 222, 1) 100%
              ); /* Chrome 10-25, Safari 5.1-6 */
              background: linear-gradient(
                to right,
                rgba(36, 17, 144, 1) 0%,
                rgba(70, 42, 213, 1) 48%,
                rgba(52, 174, 222, 1) 100%
              );
              padding: 15px;
              text-align: center;
            }
            button {
              background: #25b334;
              color: #fff;
              border: 3px solid #25b334;
              border-radius: 15px;
              padding: 0.3rem 1rem;
              font: 1.2rem "Poppins", sans-serif;
              outline: none;
              cursor: pointer;
              position: relative;
              transition: 0.2s ease-in-out;
              font-family: "Delius";
              letter-spacing: 1px;
            }
            .info {
              display: grid;
              grid-gap: 1rem;
              padding: 15px;
              grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
            }
            .infoText {
              margin-top: 0.5rem;
              margin-left: 5rem;
              text-aling: center;
            }
            .p1 {
              font-family: "Delius";
              font-size: 2rem;
              color: #fff8ec;
              font-weight: bold;
              text-shadow: 0 6px 25px rgba(0, 0, 0, 0.7);
              justify-content: space-between;
              padding-bottom: 15px;
              border-color: white;
              box-shadow: 0 1em 1em -1em rgba(255, 255, 255, .3);
            }
            .p2 {
              font-family: "Poppins";
              font-size: 1rem;
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
        <Frases />
      </Element>

      <Element name="equipo" className="element">
        <Team />
      </Element>
      <Element name="sug" className="element">
        <footer>
          <Sugerencias />
        </footer>
      </Element>
    </div>
  );
}
