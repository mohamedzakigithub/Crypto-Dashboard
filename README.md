# Cryptocurrency Dashboard

## Demo

https://crypto-dashboard-psi.vercel.app/

## Description

This is a React app built with NextJs that fetches data from CoinGecko API endpoints and displays a table with all listed coins and a subset of global market data.

## Packages

- NextJs
- Chakra UI
- React Query
- Axios
- Jest
- React testing library

## Components

The app contains three components in three different tabs.

- This first tab displays all listed cryptocurrencies ordered by market cap.
- The second tab displays trending currencies ordered by trading volume.
- The third tab displays a pie chart listing global market share for the top currencies.

## Features

- You can navigate forward and backwards between pages using the previous and next buttons on the top of the table

- You can search for a coin in the displayed list on any page by typing part of the coin symbol or coin name.

## Testing

The app contains a unit test for the Cryptocurrencies list. It loads the component and wait for the loading spinner to disappear and checks for if the table is rendered.
