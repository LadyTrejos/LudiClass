import React from "react";
import { Link as LinkScroll } from "react-scroll";
import './Header.css'
import Beneficios from "./Beneficios";
import Que from "./Que";
import Frases from "./Frases";
import Team from "./Team";
import Sugerencias from "./Sugerencias";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function Header() {
  return (
    <div>
      <Navbar collapseOnSelect expand="md" bg="primary" variant="dark" fixed="top">
        <Navbar.Brand href="#home">
          <img className="navbrand" src={require('../../static/img/brand_logo.png')} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav " className="justify-content-end">
          <Nav>
            <Nav.Link href="#section-beneficios">Beneficios</Nav.Link>
            <Nav.Link eventKey={2} href="#section-que">¿Qué es LudiClass?</Nav.Link>
            <Nav.Link eventKey={3} href="#section-equipo">Equipo</Nav.Link>
            <Nav.Link eventKey={4} href="#section-sug">Sugerencias</Nav.Link>
            <a className="btn-outline" href="/iniciar">Ingresar</a>
            <a className="button" href="/registro">Registrarse</a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <header >
        <div class="row">
          <div className=" col-12 col-sm-12 col-md-8 col-lg-7 col-xl-7">
            <div className="infoText">
              <img src={require(`../../static/img/ludiclass.png`)} alt="LudiClass" class="brand"/>
              <p className="p1">
                La aplicación que te ayuda a hacer tus clases{" "}
                <span>más divertidas</span>
              </p>
              <br />
              <p className="p2">
                Encuentra actividades lúdicas para cualquier tema que enseñes y
                ¡comparte las tuyas!
              </p>
              <a className="button" href="/iniciar">¡Empieza ahora!</a>
            </div>
          </div>
          <div className=" col-12 col-sm-12 col-md-4 col-lg-5 col-xl-5">
            <img src={require(`../../static/img/logo.png`)} alt="Logo de LudiClass" className="bigLogo"/>
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
      <footer >
        <div className="social-wrapper">
          <p>LudiClass &copy;{new Date().getFullYear().toString()}.</p>
        </div>
      </footer>
    </div>
  );
}