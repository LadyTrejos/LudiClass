import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "./Header";

const Layout = ({ children, title, main }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {main ? (
        <Header />
      ) : (
        <header>
          <Link href="/">
            <a>Podcasts</a>
          </Link>
        </header>
      )}

      {children}
      <style jsx>
        {`
          header {
            color: #fff;
            background: #862983; /* fallback for old browsers */
            background: -webkit-linear-gradient(
              to right,
              #ef32d9,
              #fff8ec
            ); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #ef32d9, #ffc66e); /* W3C,*/
            padding: 15px;
            text-align: center;
          }
          header a {
            color: #fff;
            text-decoration: none;
          }
          .info {
            display: grid;
            grid-gap: 250px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          }
          .infoText {
            margin-top: 20px;
            text-aling: center;
          }
          .bigLogo img {
            width: 500px;
            height: 500px;
          }
        `}
      </style>
      <style jsx global>
        {`
          @import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");
          @import url("https://fonts.googleapis.com/css?family=Delius&display=swap");
          @import url("https://fonts.googleapis.com/css?family=Boogaloo&display=swap");
          body {
            margin: 0;
            width: 100%;
            font-family: system-ui;
            background: #fff;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
