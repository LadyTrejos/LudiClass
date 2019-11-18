import React from "react";
import { Link as LinkScroll } from "react-scroll";
import './Header.css'
import Beneficios from "./Beneficios";
import Que from "./Que";
import Frases from "./Frases";
import Team from "./Team";
import Sugerencias from "./Sugerencias";

export default function Header() {
  return (
    <div>
        <div className="topnav">
          <img className="navbrand" src={require('../../static/img/brand_logo.png')} />
          <a href="#section-beneficios">Beneficios</a>
          <a href="#section-que">¿Qué es LudiClass?</a>
          <a href="#section-equipo">Equipo</a>
          <a href="#section-sug">Sugerencias</a>
          <a className="button" href="/login">Ingresar</a>
          <a className="button" href="/registro">Registrarse</a>
        </div>
      <header style={{ height: "550px" }}>
        <div className="info">
          <div className="infoText">
            <img src={require(`../../static/img/ludiclass.png`)} alt="LudiClass" />
            <p className="p1">
              La aplicación que te ayuda a hacer tus clases{" "}
              <span>más divertidas</span>
            </p>
            <br />
            <p className="p2">
              Encuentra actividades lúdicas para cualquier tema que enseñes y
              ¡comparte las tuyas!
            </p>
            <button className="button" href="/registro">¡Empieza ahora!</button>
          </div>
          <div className="bigLogo">
            <img src={require(`../../static/img/logo.png`)} alt="Logo de LudiClass" />
          </div>
        </div>
      </header>
      <div id="section-beneficios">
        <Beneficios />
      </div>
      <div id="section-que">
        <Que />
        <Frases />
      </div>

      <div id="section-equipo">
        <Team />
      </div>
      <div id="section-sug">
        <Sugerencias />
      </div>
      <footer style={{ height: "150px" }}>
        <div classid="social-wrapper">
          <h3>Síguenos en nuestras redes sociales!</h3>
          <ul>
            <li>
              <a href="https://instagram.com/ludiclass" target="_blank">
                <img
                  src="https://www.mchenryvillage.com/images/instagram-icon.png"
                  alt="Instagram Logo"
                  className="instagram-icon"
                />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/ludiclass/" target="_blank">
                <img
                  src="http://www.iconarchive.com/download/i54037/danleech/simple/facebook.ico"
                  alt="Facebook Logo"
                  className="facebook-icon"
                />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-nav" role="navigation">
          <p>LudiClass &copy;{new Date().getFullYear().toString()}.</p>
        </div>
        
      </footer>
    </div>
  );
}