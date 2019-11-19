import React from "react";
import styles from './Instagram.module.css'

export default function Instagram() {
  return (
    <div class="container-fluid" className={styles.main}>
        <div class="row">
            <div class="col-3">
                <img src={require('../../static/img/logo.png')} className={styles.profile} />
            </div>
            <div class="col-9">
                <p className={styles.user}>ludiclass</p>
                <p className={styles.bio}>LudiClass</p>
                <p className={styles.bio}> 📱💻 Aplicación <br/>
                    🎲 Encuentra actividades lúdicas para cualquier tema que enseñes y ¡Comparte las tuyas!
                    <br/>
                    ⬇️⬇️ Síguenos ⬇️⬇️</p>
                <a 
                    className={styles.follow}
                    href="https://www.instagram.com/ludiclass/"
                    target="_blank"
                >
                    Seguir
                </a>
            </div>
        </div>
        
        
    </div>
  );
}