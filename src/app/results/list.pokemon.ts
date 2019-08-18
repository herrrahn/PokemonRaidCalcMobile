// class PokemonStats {
//   attack: number;
//   defense: number;
//   stamina: number;
//   level: string;
// }
// //
export class Pokemon {
  name: string;
  level: string;
  bestMoveFast: string;
  bestMoveCharge: string;
  timeToWin: number;
  deaths: number;
}

export class ListPokemon {
  pokemons: Pokemon[] = [];
}
