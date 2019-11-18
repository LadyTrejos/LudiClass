import React from "react";
import Link from "next/link";
export default function login() {
  return (
    <main>
      <section className="form">
        <h1>Bienvenido a Ludiclass!</h1>
        <form action="" className="form-login">
          <div className="input_wrapper">
            <label htmlFor="email" className="label-form">
              Email
            </label>
            <input
              type="text"
              placeholder="email@email.com"
              className="input-form"
            />
          </div>
          <div className="input_wrapper">
            <label htmlFor="password" className="label-form">
              Password
            </label>
            <input type="password" className="input-form" />
          </div>
          <button type="submit" className="button">
            Ingresar
          </button>
          <Link href="/registro">
            <a>Aun no tiene una cuenta. Registrarse!</a>
          </Link>
        </form>
      </section>
      <style jsx>
        {`
      :root {
        --accentColor: #4e5166;
        --foregroundColor: #e3f2fd;
        --canvasColor: #111;
        --backgroundColor: #2a313b;
        --borderRadius: 6px;
      }
      @import url("https://fonts.googleapis.com/css?family=Chelsea+Market&display=swap");
      @import url("https://fonts.googleapis.com/css?family=Delius&display=swap");
      @import url("https://fonts.googleapis.com/css?family=Kaushan+Script&display=swap");
      body {
        background: #111;
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        line-height: 1.5;
        font-size: 16px;
        text-align: center;
        transition: all 0.3s ease;
      }

      * {
        box-sizing: border-box;
      }
      main {
        width: 90%;
        max-width: 1050px;
        margin: 3em auto 0;
        border: 1px solid #009688;
        display: grid;
        grid: repeat(5, fit-content(300px)) / 100%;
        color: #000;
        text-align: left;
      }
      main section {
        border: 1px solid #009688;
        position: relative;
        padding: 40px 40px 50px;
      }
      section .forms {
        grid-column: 1 / 3;
        border-width: 0;
      }
      .form-login {
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
        background: #fff;
        margin-top: 30px;
        position: relative;
        overflow: hidden;
      }
      .input_wrapper {
        margin-bottom: 30px;
      }
      .label-form {
        font-weight: 500;
        display: block;
        margin-bottom: 10px;
      }
      input.input-form,
      select,
      textarea {
        height: 50px;
        font-size: 16px;
        border: 2px solid #b3e5fc;
        width: 100%;
        padding: 12px;
        font-family: "Poppins";
        border-radius: 5px;
        color: #558b2f;
        background: #fff;
      }
      input.input-form,
      select,
      textarea:focus&.active {
        outline: none;
        border-color: #b3e5fc;
      }
      input.input-form,
      select,
      textarea:focus&:disabled {
        cursor: not-allowed;
        background: #f2f2f2;
        opacity: 0.6;
      }
      a.button,
      input.button,
      button {
        outline: none;
        width: 100%;
        text-align: center;
        display: inline-block;
        border: none;
        font: 500 16px/1 "Poppins", sans-serif;
        margin: 10px;
        padding: 20px;
        cursor: pointer;
        border-radius: 5px;
        background: #0277bd;
        color: #f2f2f2;
        position: relative;
        top: 0;
        transition: 0.2s ease;
      }
      h1 {
        font: 700 48px/1.2 "Kaushan Script", sans-serif;
        margin-bottom: 10px;
      }
      a {
    text-decoration: none;
    text-align : center;
    color: #333;
    margin : 10px;
    padding: 3px 0;
    border-bottom: 1px dashed;
      }
    a:hover {
        border-bottom: 1px solid;
    }
}
    `}
      </style>
    </main>
  );
}
