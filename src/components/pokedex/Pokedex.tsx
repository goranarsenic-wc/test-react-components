import React, { useState } from "react";
import Pokemon from "../pokemon";
import { search } from "../../api/pokeApi";

interface PokemonData {
  name: string;
  url: string;
}

const Pokedex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemon, setPokemon] = useState<PokemonData>();

  const handleSearch = async () => {
    if (searchQuery) {
      const response = await search(searchQuery);
      setPokemon(response);
    } 
  };
  return (
    <div>
      <div>
        <h1>Pokedex</h1>
      </div>
      <div>
        <div>
          <label>Pokemon name:</label>
          <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div>
          <button onClick={() => void handleSearch()}>Search</button>
        </div>
      </div>
      <div>{pokemon ? <Pokemon pokemon={pokemon} /> : <p>No Pokemon :(</p>}</div>
    </div>
  );
};

export default Pokedex;
