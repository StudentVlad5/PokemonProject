# 📸 Meme Directory with Pokémon API Integration

A fun, interactive meme management app built with **Next.js**, featuring Pokémon data from the [PokéAPI](https://pokeapi.co/).  
Users can view, edit, and like memes, with images and stats inspired by Pokémon characters.

Створити React-додаток що відповідає вимогам (див. нижче) використовуючи бібліотеку HeroUI, https://www.heroui.com
Зареєструвати безкоштовний обліковий запис Railway, https://railway.com
Задеплоїти цей додаток на Railway, https://docs.railway.com/guides/react
Надати доступ до додатку по URL

---

## 🚀 Features

- 🧠 Global state with `useContext` (Pokémon data accessible across pages)
- ⚙️ Integration with [PokéAPI](https://pokeapi.co/)
- 💾 Meme persistence via `localStorage`
- 🖼️ Image fallback logic when URL fails
- ✍️ Editable meme modals (name, image, likes)
- 📱 Fully responsive UI with Tailwind CSS

---

## 📁 Project Structure
```bash
.
├── components/ # UI components 
├── context/ # Global context (PokemonContext) 
├── lib/ # API fetch logic 
├── pages/ # Next.js pages 
├── public/ # Static assets (fallback.jpg) 
├── styles/ # Tailwind configs 
├── next.config.js # Image domains setup 
└── README.md
```

---

## 🧑‍💻 Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
```
### 2. Start the dev server
```bash
npm run dev
# or
yarn dev
```
### 3. Open your browser
```bash
http://localhost:3000
```

### 🛠 Tech Stack

 - Next.js

 - React

 - Tailwind CSS

 - Headless UI

 - PokéAPI

###  License

MIT