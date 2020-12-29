import React, {useEffect, useState} from 'react';
import FeaturedMovie from './components/FeaturedMovie';
import Footer from './components/Footer';
import Header from './components/Header';
import MovieRow from './components/MovieRow';
import Tmdb from './Tmdb';
import './App.css';

const App = () => {

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

      <Footer/>

      { !movieList.length &&
        <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"/>
        </div>
      }

    </div>
  )
}

export default App;
