import React, {useEffect, useState} from 'react';
import MovieRow from './components/MovieRow';
import Tmdb from './Tmdb';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista toda
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      // Pegando o Featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomNumber = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomNumber];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if ( window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
      window.addEventListener('scroll', scrollListener);
      return () => {
        window.removeEventListener('scroll', scrollListener);
      }
  }, [])

  return (
    <div className="page">

      <Header black={blackHeader}/>

      { featuredData && <FeaturedMovie item={featuredData}/> }

      <section className="lists">
        {movieList.map((item,i) => (
          <MovieRow key={i} title={item.title} items={item.items}/>
        ) )}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">♥</span> por Ian Ribeiro. <br/>
        Direitos de imagem para Netflix <br/>
        Dados fornecidos pelo Themoviedb.org
      </footer>

    </div>
  )
}
