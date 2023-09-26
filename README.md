# UniSwap & PancakeSwap Sniper Bot

![alt text](https://github.com/sniperbotapp/Crypto-Sniper-Bot-App/blob/main/assets/images/1.png?raw=true)

![alt text](https://github.com/sniperbotapp/Crypto-Sniper-Bot-App/blob/main/assets/images/2.png?raw=true)


UniSwap & PancakeSwap Sniper Bot is a versatile token sniper for the blockchain. It should work with any decentralized exchange compatible with the Uniswap V2 API on any blockchain compatible with Ethereum. 

The Honeypot Check functionality is available for the Ethereum, Binance Smart Chain, opBNB, Polygon, Fantom, Avalanche, Dogechain, EthereumPoW, Huobi ECO, Proof of Memes - POM, Exosama, CoreDAO, BeanEco SmartChain, PulseChain, Flare, Base 
(Coinbase), Arbitrum One and Linea (including their mainnets and some testnets).

The Safe-buy functionality is available for the Binance Smart Chain, Polygon, Fantom and Dogechain (mainnets and testnets).



## Installation
This bot only works on windows operating systems.
```sh
git clone https://github.com/sniperbotapp/Crypto-Sniper-Bot-App.git
cd sniper-bot
"Build & Start.bat"
```


For example, just to mention a few:

#### Chains
- Ethereum
- EthereumPoW (ETHW)
- BNB Smart Chain (former Binance Smart Chain)
- opBNB
- Avalanche C-Chain
- Polygon
- Fantom Opera
- Harmony ONE
- Dogechain
- EthereumPoW
- Huobi ECO
- Proof of Memes - POM
- Exosama
- Flare
- Arbitrum One
- CoreDAO
- Base (Coinbase)
- Linea

#### DEXs
- UniswapV2
- SushiSwap
- PancakeSwap
- ApeSwap
- Biswap
- BakerySwap
- Traderjoexyz
- Dogeswap


## Main features

- Support for multiple chains, decentralised exchanges and liquidity pairs.
- Support for EIP1559 gas fees in the blockchains that implement it.
- Automatic selection of the liquidity pair with the best price when buying.
- Able to monitor, buy and sell multiple tokens from different sources simultaneously.
- Can snipe directly from token contract addresses as well as from liquidity pair addresses
- Multiple methods for sniping tokens:
	- From a list of token addresses to watch.
	- From PairCreated events.
	- From AddLiquidity transactions from confirmed blocks or mempool.
	- From Telegram channels/groups or private messages, including private ones and obfuscated addresses.
	- Customisable event rules.
	- Customisable rules that let you trigger a buy depending on sender or receiver addresses of a transaction, its method signature, values in the input, etc.
	- Dynamic activation of rules based on counters or flags.
- Tokens auditing, including:
	- Very quick and efficient in-house and in-chain honeypot check, that checks if a token can be approved and sold, with configurable limits for buy and sell taxes and gas usage.
	- Contract source verification and filtering by a configurable list of expressions.
	- Minimum and maximum liquidity amount and minimum percentage.
	- Running external programs for additional checks.
- Optional buy using a safety contract that checks for honeypot, liquidity and drawdown within the same buy transaction and reverts it back if the token doesn't fulfil the requirements.
- Whitelisting of token addresses.
- Blacklisting of addresses, symbols and names.
- Stops buying tokens when the account balance is below a configurable threshold.
- Monitoring of bought tokens that supports:
	- Profit estimation, including estimation of sell tax and gas.
	- Taking profit after reaching a certain value.
	- Setting a fixed stop loss or based on the estimated drawdown.
	- Setting a trailing stop.
	- Disabling the sell of a token for a certain time after being bought.
	- Selling a token after a certain amount of time after buying.
	- Selling a token if the trailing stop doesn't change after a certain amount of time.
	- Mempool monitoring to frontrun RemoveLiquidity transactions.
- Simulation mode to test your sources and settings without risking any real funds.
- Support for Polygon-edge gRPC TxPool (Dogechain)
