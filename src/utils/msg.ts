export const welcomeMsg = ({name}:{name:string}): string => {
  return `Welcome to FVM Bot ${name}. You can use me to keep a real-time track of all the transactions that are happening on any FVM actor or FVM-enabled wallet. Just reply with the address and I will ping you anytime there is any activity related to that address! Of course, you can ping me multiple addresses and I will keep you posted for all of them!

I can work with:
1. Robut address, e.g. t410fjlkt2molcbgpl53cf4npr3ijypfjqbjdnzjcl3a
2. FVM Smart contract deployment address, e.g. 0x3088B4e915Ee772A5c4fb888fEC696420B890633
3. FVM Wallet ETH address, e.g. 0x4ad53d31Cb104Cf5f7622f1AF8Ed09C3ca980523
4. FVM Wallet Filecoin address (F4Address), e.g. f410fjlkt2molcbgpl53cf4npr3ijypfjqbjdnzjcl3a

Also, if you want to stop tracking any address, just type:

remove <address>
e.g. remove t410fjlkt2molcbgpl53cf4npr3ijypfjqbjdnzjcl3a

Lesssss goooooo 🚀`;
}

export const errorMsg = ({name}:{name:string}): string => {
  return `Uh oh! Looks like you entered something I don't understand 😵‍💫.

Here is the welcome message I sent you in the beginning, maybe check what capabilities I have...

${welcomeMsg({name})}
`;
}