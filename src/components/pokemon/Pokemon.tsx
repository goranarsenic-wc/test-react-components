import React from "react";

interface Props {
  pokemon: any
}
const Pokemon = (props: Props) => {
  const { pokemon } = props;
  const { name, sprites, stats } = pokemon;
  const { front_default } = sprites;
  return (
    <div data-testid='pokemon-component'>
      <div>
        <p>{name.toUpperCase()}</p>
        <img src={front_default} alt={name} />
      </div>
      <div>
        <h3>Stats:</h3>
        {stats.map((s:any, index: number) => (
          <div key={`stat-${index}`}>
            <span>{s.stat.name}: <strong>{s.base_stat}</strong></span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pokemon;
