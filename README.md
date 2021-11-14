# Next.js Web3-React Starter Template.
A Next.js starter template with web3-react support out of the box, allowing for you to quickly start building a web3-enabled dapps.

This app comes equipped with both web3-react and ethers. This frontend also has web3-react's NetworkConnector and multichain support. Happy hacking!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Adding support for more chains
By default, this template comes with support for Ethereum Mainnet, but you can add on to the list of networks with ease. The list of supported chains can be found in ``connectors/index.ts``.