// src/lib/api.ts

export interface Pokemon {
    name: string;
    url: string;
    likes?: number;
    id?: number
}

export async function fetchPokemons(limit = 10): Promise<Pokemon[]> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!res.ok) {
        throw new Error('Не вдалося завантажити покемонів');
    }

    const data = await res.json();
    data &&
        data.results.map((pokemon: Pokemon, ind: number) => {
            pokemon.likes = Math.floor(Math.random() * 100);
            pokemon.id = ind + 1;
            pokemon.url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
        });
    return data.results;
}
