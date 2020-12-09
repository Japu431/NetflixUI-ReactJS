import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow.js";
import FeaturedMovie from "./components/FeaturedMovie.js";
import Header from "./components/Header.jsx";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {

    const loadAll = async () => {
      //Pega lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o filme em destaque ( Feature )
      let originals = list.filter((i) => i.slug === "originals");

      let randomChosen = Math.floor(

        Math.random() * (originals[0].items.results.length - 1)

      );

      let chosen = originals[0].items.results[randomChosen];

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");

      setFeatureData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {

    const scrollListenener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListenener);
    return () => {
      window.removeEventListener("scroll", scrollListenener);
    };

  }, []);


  return (

    <div className="page">

      <Header black={blackHeader} />

      {featureData && <FeaturedMovie item={featureData} />}

      <section className="lists">

        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}

      </section>

      <footer>
          Github: Yusuke-kun <br/>
          Direitos de Images para Netflix <br/>
          Dados pegtos do site Themoviedb.org
      </footer>
    </div>
  );
};
