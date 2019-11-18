import React from "react";
import styles from './Team.module.css'

export default function Team() {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1>¡Conoce al equipo!</h1>
        </div>
        <div className={styles.maincontent}>
          <div className={styles.item}>
            <img src={require("../../static/img/team/lady.jpeg")} alt="pic" />
            <h2>Lady Trejos</h2>
            <h3></h3>
          </div>
          <div className={styles.item}>
            <img src={require("../../static/img/team/ivan.jpeg")} alt="pic" />
            <h2>Ivan Lizarazo</h2>
            <h3></h3>
          </div>
          <div className={styles.item}>
            <img src={require("../../static/img/team/german.jfif")} alt="pic" />
            <h2>Germán Grandas</h2>
            <h3></h3>
          </div>
        </div>
      </div>
    </div>
  );
}