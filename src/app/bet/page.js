import Head from "next/head";

export default function Home() {
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
                    Lucario
                </h3>
                <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/448.png" className="d-block mx-auto img-fluid rounded"/>
            </div>
            <div className="col">
                <h3 className="my-2 d-block mx-auto " style={{width: 250}}>
                    Goundom
                </h3>
                <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/383.png" className="d-block mx-auto img-fluid rounded"/>
            </div>
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
