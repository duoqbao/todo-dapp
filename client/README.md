# Create Solana Todo Dapp with Next.JS

Want to start develop with Solana fetching NFTs from the blockchain or power-up your [Anchor](https://project-serum.github.io/anchor/getting-started/introduction.html) app with UI?  
This boilerplate can be used to setup your UI with React.JS / Next.JS and deploy it to [Vercel Platform](https://vercel.com/) in just a minutes.

This project includes:

- Next.JS
- TypeScript
- [@solana/wallet-adapter](https://github.com/solana-labs/wallet-adapter) and [@solana/web3.js](https://solana-labs.github.io/solana-web3.js) for interactions with wallets & blockchain.

## Getting Started

First, run the development server:

```bash
yarn
yarn run dev
```

// TODO
If you deploy new Candy Machine you can update UI config here: `./src/config/candy-machine.config.js`.

## Style

[Tailwind CSS](https://tailwindcss.com/) is selected tools for rapid style development.

This app encourage you to use CSS Modules over other style technics (like SASS/LESS, Styled Components, usual CSS).
It have modular nature and supports modern CSS. [Read more on Next.JS site](https://nextjs.org/docs/basic-features/built-in-css-support).
Anyway, if you want to connect LESS there is example code in `./next.config.js`
