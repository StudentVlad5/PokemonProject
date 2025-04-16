import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { fetchPokemons } from "../lib/api";

interface PokemonContextType {
  pokemons: Pokemon[];
  loading: boolean;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext must be used within a PokemonProvider");
  }
  return context;
};

export interface Pokemon {
    name: string;
    url: string;
    id?: number
    likes?: number
}

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPokemons(10);
        setPokemons(data);
      } catch (err) {
        console.error("Помилка при завантаженні покемонів", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemons, loading }}>
      {children}
    </PokemonContext.Provider>
  );
};
