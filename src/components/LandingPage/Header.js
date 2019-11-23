import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import styles from './Header.module.css'

import Beneficios from "./Beneficios";
import Que from "./Que";
import Frases from "./Frases";
import Team from "./Team";
import Sugerencias from "./Sugerencias";
import { BackTop } from "antd";

export default function Header() {
  return (
    <div>
      <BackTop />
      <Navbar collapseOnSelect expand="md" bg="primary" variant="dark" fixed="top" className={styles.navbar}>
        <Navbar.Brand href="#home">
          <img className={styles.navbrand} src={require('../../static/img/brand_logo.png')} alt="Logo LudiClass"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav " className="justify-content-end">
          <Nav>
            <Nav.Link href="#section-beneficios">Beneficios</Nav.Link>
            <Nav.Link eventKey={2} href="#section-que">¿Qué es LudiClass?</Nav.Link>
            <Nav.Link eventKey={3} href="#section-equipo">Equipo</Nav.Link>
            <Nav.Link eventKey={4} href="#section-sug">Sugerencias</Nav.Link>
            <a className={styles.btnoutline} href="/iniciar">Ingresar</a>
            <a className={styles.btn} href="/registro">Registrarse</a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <header id="home" className={styles.header}>
        <div class="row">
          <div class=" col-12 col-sm-12 col-md-8 col-lg-7 col-xl-7">
            <div className={styles.infoText}>
              <img src={require(`../../static/img/ludiclass.png`)} alt="LudiClass" className={styles.brand}/>
              <p className={styles.p1}>
                La aplicación que te ayuda a hacer tus clases{" "}
                <span>más divertidas</span>
              </p>
              <br />
              <p className={styles.p2}>
                Encuentra actividades lúdicas para cualquier tema que enseñes y
                ¡comparte las tuyas!
              </p>
              <a className={styles.button} href="/iniciar">¡Empieza ahora!</a>
            </div>
          </div>
          <div class=" col-12 col-sm-12 col-md-4 col-lg-5 col-xl-5">
            <img src={require(`../../static/img/logo.png`)} alt="Logo de LudiClass" className={styles.bigLogo}/>
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
        <div className={styles.socialwrapper}>
          <p>LudiClass &copy;{new Date().getFullYear().toString()}.</p>
        </div>
      </footer>
    </div>
  );
}