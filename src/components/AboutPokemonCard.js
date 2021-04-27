import React, { useState, useEffect } from "react";

export default function AboutPokemonCard(props) {
  const id = props.match.params.id;

  const [pokemon, setPokemon] = useState(null);

  async function getPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    
    setPokemon(data);
  }
  useEffect(() => {
    getPokemon();
    
  }, [id]);
  
  if (!pokemon) {
    return null
  }

  const names = pokemon.stats.map(stat => stat.stat.name);
  const imgLink = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  const style = null;

  return (
    <div className={style}>
      <table>
        <tr><img src={imgLink} /></tr>
        <tr className='name-table'>{pokemon.name}</tr>
        <tr>
          <td> Type </td> 
          <td>{pokemon.types[0].type.name}</td>
        </tr>
        <tr>
                <td>{names[0]}</td>
                <td>{pokemon.stats[0].base_stat}</td>
              </tr>
              <tr>
                <td>{names[1]}</td>
                <td>{pokemon.stats[1].base_stat}</td>
              </tr>
              <tr>
                <td>{names[2]}</td>
                <td>{pokemon.stats[2].base_stat}</td>
              </tr>
              <tr>
                <td>{names[3]}</td>
                <td>{pokemon.stats[3].base_stat}</td>
              </tr>
              <tr>
                <td>{names[4]}</td>
                <td>{pokemon.stats[4].base_stat}</td>
              </tr>
              <tr>
                <td>{names[5]}</td>
                <td>{pokemon.stats[5].base_stat}</td>
              </tr>
        <tr>
          <td> Weight </td> <td> {pokemon.weight} </td>
        </tr>
      </table>
    </div>
  );
}
