# FVM Bot
_Real-time notification for any activity relating to any FVM smart contract, actor or FVM wallet; just let the bot know which address you wanna track! 🧐!_

## Problem Statement
DAO need tooling to keep track of the sensitive smart contracts and sensitive wallets that belong to them. Very often, these are instruments which have a lot of wealth/value locked in them and DAO would want to take quick actions in the event of any attack or compromise. To do this, they can't rely on tracking system that are passive (like report generators or analytics tools) and would need them to log into their systems; they need a solution which is real-time and easily accessible.

## Solution: Enters FVM Bot 😎
FVM Bot (https://t.me/fvm_notification_bot) is a Telegram Bot where any user can ask the bot to:
1. track any address on FVM; it could be an FVM smart contract address, FVM actor address or even an FVM wallet!
2. notify them real-time whenever there is any activity(transaction) where that address is involved.

The user can also ask the bot to forget about any address that they asked it to track in the past.

## What is in this repository?
This repository contains:
1. API server code (NodeJS)
2. Cron job (Python)
3. A Demo smart contract deployed on FVM wallabynet (at address 0x3088B4e915Ee772A5c4fb888fEC696420B890633)

## [Hack FEVM 2022][Hack FEVM]
This project is developed as part of the [Hack FEVM][Hack FEVM]. If you are a panelist/judge/reviewer, please check out the following steps.

I have included a demo smart contract in the repo. It is the SimpleCoin smart contract and deployed at wallabynet at 0x3088B4e915Ee772A5c4fb888fEC696420B890633. The deployer's keys are below:
| Wallet address | Private key |
| ------ | ------ |
| 0x4ad53d31Cb104Cf5f7622f1AF8Ed09C3ca980523 | dec5213b700bc944b06584aaf3d508f88a1ce0221b77067b7e7b95d7b88d2ae3 |

To see it in action, you will first need to interact with the telegram bot (https://t.me/fvm_notification_bot) and send the address you want to track. Let's say you want to track the demo smart contract itself! So, you will need to DM the bot with the contract address, i.e. 0x3088B4e915Ee772A5c4fb888fEC696420B890633. Now, you can send some SimpleCoins to any FVM-enabled wallet address (We are using 0x5d905Cd5734A457139bc04c77CAAf3DFCBf0bA33 for illustration) using the following command:
```
git clone git@github.com:ankitshubham97/fvmbot.git
cd fvmbot/smart-contracts
export PRIVATE_KEY=dec5213b700bc944b06584aaf3d508f88a1ce0221b77067b7e7b95d7b88d2ae3
yarn install
yarn hardhat send-coin --contractaddress '0x3088B4e915Ee772A5c4fb888fEC696420B890633' --amount '1' --toaccount '0x5d905Cd5734A457139bc04c77CAAf3DFCBf0bA33'
```
When the transaction finalizes, you would see the notification from the FVM bot on your Telegram.

To stop tracking that smart contract, you would need to reply with
```
remove 0x3088B4e915Ee772A5c4fb888fEC696420B890633
```

[Hack FEVM]: <https://ethglobal.com/events/hackfevm/home>
[Temple wallet]: <https://templewallet.com/>
