// src/pages/_app.tsx
import '../style/globals.css'
import type { AppProps } from 'next/app'
import { PokemonProvider } from "../context/PokemonContext";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";

interface Pokemon {
  name: string;
  url: string;
}

interface HomeProps {
  pokemons: Pokemon[];
}

function MyApp({ Component, pageProps }: AppProps, { pokemons }: HomeProps) {
  return (
    <Layout>
       <PokemonProvider>
        <Component {...pageProps} pokemons={pokemons}/>
      </PokemonProvider>
    </Layout>
  );
}

export default MyApp;


export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  const data = await res.json();

  return {
    props: {
      pokemons: data.results,
    },
  };
};