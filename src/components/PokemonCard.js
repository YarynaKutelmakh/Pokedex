import React from "react";
import { useHistory } from "react-router-dom";

import "./PokemonCard.css";

export default function PokemonCard({ name, img, type, id }) {
  let history = useHistory();

  const AboutPokemonCard = () => {
    history.push(`/${id}`);
  };

  const style = `card ${type}`;

  return (
    <div className={style} key={id} onClick={AboutPokemonCard}>
      <img className="imgPokemon" alt="Pokemon" src={img} />
      <div className="detail=wrapper">
        <p className="names"> {name} </p> 
        <span className='type'> {type} </span>
      </div>
    </div>
  );
}
