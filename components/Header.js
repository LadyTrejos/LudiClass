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
                ¿Qué es ludiclass?
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
            <Link href="/registro">
              <button>Empieza Ahora!</button>
            </Link>
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
            nav li button {
              border: 1px solid #ff8b1c;
              border-radius: 50px;
              padding: 0.3rem 1.1rem;
              background: #ff8b1c;
              color: #fff;
              font-family: "Delius";
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
        <Frases />
      </Element>

      <Element name="equipo" className="element">
        <Team />
      </Element>
      <Element name="sug" className="element">
        <Sugerencias />
      </Element>
      <footer style={{ height: "150px" }}>
        <div className="social-wrapper">
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
        <nav className="footer-nav" role="navigation">
          <p>ludiclass &copy;{new Date().getFullYear().toString()}.</p>
        </nav>
        <style jsx>
          {`
            footer {
              background: rgb(36, 17, 144, 0.7);
              text-align: center;
              margin: 0 0;
              padding: 10px 0;
            }
            .social-wrapper {
              text-align: center;
              color: #fff;
            }

            .social-wrapper ul li {
              display: inline;
              margin: 0 5px;
            }

            .twitter-icon,
            .facebook-icon,
            .instagram-icon,
            .linkedin-icon,
            .googleplus-icon,
            .youtube-icon,
            .foursquare-icon {
              margin-top: 0.625em;
              width: 40px;
              height: 40px;
              opacity: 0.6;
              filter: alpha(opacity=60); /* For IE8 and earlier */
              border-radius: 25px;
            }

            .twitter-icon:hover,
            .facebook-icon:hover,
            .instagram-icon:hover,
            .linkedin-icon:hover,
            .googleplus-icon:hover,
            .youtube-icon:hover,
            .foursquare-icon:hover {
              opacity: 1;
              filter: alpha(opacity=100); /* For IE8 and earlier */
            }
            .footer-nav p {
              text-align: center;
              color: #fff;
            }
          `}
        </style>
      </footer>
    </div>
  );
}
