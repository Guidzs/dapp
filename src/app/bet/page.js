"use client"

import Web3 from "web3";
import { getDispute, palceBet } from "@/services/Web3Service";
import Head from "next/head";
import {useRouter} from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function Bet() {
  const {push} = useRouter()

  const [message, setMessage] = useState()
  const [dispute, setDispute] = useState({
    candidate1: "Loading...",
    candidate2: "Loading...",
    image1: "https://i.pinimg.com/originals/20/97/65/209765b3389f6d728783e6dadf47b67e.png",
    image2: "https://i.pinimg.com/originals/20/97/65/209765b3389f6d728783e6dadf47b67e.png",
    total1: 0,
    total2: 0,
    winner: 0
  })

  useEffect(() => {
    if (!localStorage.getItem("wallet")) return push("/")

    setMessage("Obtendo dados da disputa...aguarde...");
    getDispute()
      .then(dispute => {
        setDispute(dispute);
        setMessage("");
      })
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }, [])

  function renderBet(candidate) {
    setMessage("Conectando na carteira...aguarde...")
    const amount = prompt("Quantia em POl para apostar: ", 1);
    palceBet(candidate, amount)
      .then(() => {
        alert("Aposta recebida com sucesso. Pode demorar 1 minuto para que apareça no sistema.");
        setMessage("");
      })
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }

  return (
    <>
      <Head>
        <title>BetCandidate | Apostar</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <body className="container px-4 py-5">
        <div className="row align-items-center ">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">BetCandidate</h1>
            <p className="lead">Aposte seus conhecimentos de treinador pokemon</p>
            <p className="lead">com o mundo para ver qual leva a melhor!</p>
        </div>
        <div className="row flex-lg-row align-items-center g-5 py-5">
            <div className="col">
                <h3 className="my-2 d-block mx-auto" style={{width: 250}}>
                    {dispute.candidate1}
                </h3>
                <img src={dispute.image1} className="d-block mx-auto img-fluid rounded" width={250}/>
                <button onClick={() => renderBet(1)} className="btn btn-primary p-2 my-2 d-block mx-auto" style={{width: 250}}>Aposto nesse pokemon</button>
                <span className="badge text-bg-secondary d-block mx-auto" style={{width: 250}}>{Web3.utils.fromWei(dispute.total1, "ether")} POL Apostados</span>
            </div>
            <div className="col">
                <h3 className="my-2 d-block mx-auto " style={{width: 250}}>
                  {dispute.candidate2}
                </h3>
                <img src={dispute.image2} className="d-block mx-auto img-fluid rounded" width={250}/>
                <button onClick={() => renderBet(2)} className="btn btn-primary p-2 my-2 d-block mx-auto" style={{width: 250}}>Aposto nesse pokemon</button>
                <span className="badge text-bg-secondary d-block mx-auto" style={{width: 250}}>{Web3.utils.fromWei(dispute.total2, "ether")} POL Apostados</span>
            </div>
        </div>
        <div className="row align-items-center">
            <p className="message">{message}</p>
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
