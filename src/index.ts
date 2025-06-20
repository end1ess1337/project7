import fetch from 'cross-fetch';
import * as readlineSync from 'readline-sync';
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client/core';

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/ourzora/zora-v3-base';

const client = new ApolloClient({
  link: new HttpLink({ uri: SUBGRAPH_URL, fetch }),
  cache: new InMemoryCache(),
});

async function checkNFTs(address: string) {
    const result = await client.query({
      query: gql`
        query CheckEnlisted($account: Bytes!) {
          enlisteds(where: { account: $account }) {
            id
            blockNumber
            transactionHash
          }
        }
      `,
      variables: { account: address.toLowerCase() },
    });
  
    const enlisteds = result.data.enlisteds;
  
    if (enlisteds.length === 0) {
      console.log(`❌ Ví ${address} chưa từng Enlist hoặc không sở hữu NFT từ BaseCamp.`);
    } else {
      console.log(`✅ Ví ${address} đã từng Enlist ${enlisteds.length} lần (có thể sở hữu NFT).`);
      enlisteds.forEach((e: any, i: number) => {
        console.log(`  ${i + 1}. TX Hash: ${e.transactionHash}`);
      });
    }
  }
  