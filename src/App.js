import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import PokemonCard from "./components/PokemonCard";
import AboutPokemonCard from "./components/AboutPokemonCard";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=12"
  );
  const [style, setStyle] = useState('isHidden');

  const getPokemonList = async () => {
    const response = await fetch(loadMore);
    const data = await response.json();

    setLoadMore(data.next);

    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await response.json();
        setPokemonList((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  function isOpen() {
    setStyle('isOpen')
  }

  return (
    <Router>
      <div className="content">
        <div className="all-pokemons" onClick={isOpen}>
          {pokemonList.map((pokemonStats, index) => (
            <PokemonCard
              key={index}
              id={pokemonStats.id}
              img={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />
          ))}
        </div>
        <div className={style}>
        <Router>
          <Switch>
            <Route exact path="/main" component={PokemonCard} />
            <Route path="/:id" component={AboutPokemonCard} />
            <Route path="/" exact render={() => <Redirect to="/main" />} />
          </Switch>
        </Router>
        </div>
      </div>
      <button onClick={() => getPokemonList()} className="load-more">
          Lead more
        </button>
    </Router>
  );
}

export default App;
