"use client"

import Head from "next/head";
import {useRouter} from "next/navigation";

export default function Home() {
  const {push} = useRouter()

  function btnLoginClick() {
    push("/bet")
  }

  return (
    <>
      <Head>
        <title>BetCandidate | Login</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <body className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-4">
            <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/383.png"className="d-block mx-lg-auto img-fluid"/>
          </div>
          <div className="col-4">
          <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/448.png"className="d-block mx-lg-auto img-fluid"/>
          </div>
          <div className="col-4">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">BetCandidate</h1>
            <p className="lead">Apostas on-chain!</p>
            <p className="lead">Agora no mundo pokemon</p>
            <p className="lead">Autentique-se com sua carteira ou usando uma pokedex e deixe a sua aposta para a proxima disputa</p>
            <div className="d-flex justify-content-start">
              <button className="btn btn-primary btn-lg px-4" onClick={btnLoginClick}>
                <img src="/metamask.svg" width={64} className="me-3" />
                Conectar com a MetaMask
              </button>
            </div>
          </div>
          <p className="message"></p>
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-4 mb-0 text-body-secondary">
            &copy; 2024 BetCandidate, Inc
          </p>
          <ul className="nav col-4 justify-content-end">
            <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Home</a></li>
            <li className="nav-item"><a href="/about" className="nav-link px-2 text-body-secondary">About</a></li>
          </ul>
        </footer>
      </body>
    </>
  );
}
