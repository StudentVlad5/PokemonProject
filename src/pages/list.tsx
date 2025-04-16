import { useState, useEffect } from 'react'
import { usePokemonContext, Pokemon } from "../context/PokemonContext";
import MemeImage from '@/components/MemeImage';

export default function ListPage() {
    const { pokemons } = usePokemonContext();
      const [memes, setMemes] = useState<Pokemon[]>([]);

        useEffect(() => {
  const savedMemes = localStorage.getItem('memes');
  if (savedMemes) {
    setMemes(JSON.parse(savedMemes));
  } else {
    setMemes(pokemons);
     console.log(pokemons)
  }
}, [pokemons]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {memes.map((meme) => (
          <div key={meme.id} className="rounded-lg border p-4 shadow-md flex flex-col justify-center items-center">
            <MemeImage src={meme.url} alt={meme.name} />
            <h3 className="text-lg font-bold mb-1">{meme.name}</h3>
            <p className="text-gray-600 mb-2">Likes: {meme.likes}</p>
            <a href={meme.url} className="text-blue-600 hover:underline" target="_blank">
              Open image
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
