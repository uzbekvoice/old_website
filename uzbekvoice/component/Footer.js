import React from 'react'
import styles from '../styles/Footer.module.css'
export default function Footer() {
  return (
    <footer className={styles.footer}>
    <div className="container__fluid">
      <div className={styles.footer__body}>
        <div className={styles.footer__main}>
          <img className={styles.footer__logo} src="./logo.png"  alt='logofooter'/>
          <h3>Powered by:</h3>
          <img className={styles.footer__logo2} src="./footer__logo-img.png" />
        </div>
        <div className={styles.footer__menu}>
          <div className={styles.menu_footer}>
            <ul >
              <li><a  href="docs.html">Qo‘llanma </a></li>
              <li>
                <a  href="/#howto">Loyihada qatnashish </a>
              </li>
              <li><a href="/#partners">Hamkorlar </a></li>
            </ul>
          </div>
          <div className={styles.menu_footer}>
            <ul >
              <li>
                <a  href="https://github.com/uzbekvoice">
                  <img
                   
                    src="./github.png"
                  />
                  <span >Github</span>
                </a>
              </li>
              <li>
                <a  href="https://t.me/joinchat/P84ptL81sN8yNWRi">
                  <img
                  
                    src="./telegramm.png"
                  />
                  <span>Telegram jamoa</span>
                </a>
              </li>
              <li>
                <a  href="https://discourse.mozilla.org/c/voice/uz/">
                  <img
                    className="menu-footer-block-img"
                    src="./mozila.png"
                  />
                  <span>Mozilla discourse</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h3 >UzbekVoice.ai © 2021. Barcha huquqlar himoyalangan.</h3>
    </div>
  </footer>
  )
}
