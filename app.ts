import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client/core';
import fetch from 'cross-fetch';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.studio.thegraph.com/query/72520/basecamp-nft/version/latest',
    fetch,
  }),
  cache: new InMemoryCache(),
});

declare global {
  interface Window {
    checkWallet: () => void;
  }
}

window.checkWallet = async () => {
  const address = (document.getElementById('walletInput') as HTMLInputElement).value.trim().toLowerCase();
  const resultDiv = document.getElementById('result')!;

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    resultDiv.innerHTML = '<p class="text-red-500">⚠️ Địa chỉ ví không hợp lệ.</p>';
    return;
  }

  try {
    const result = await client.query({
      query: gql`
        query CheckEnlisted($account: Bytes!) {
          enlisteds(where: { account: $account }) {
            id
            transactionHash
            blockNumber
          }
        }
      `,
      variables: { account: address.toLowerCase() }, // ✅ chắc chắn là lowercase
    });

    const enlisteds = result.data.enlisteds;

    if (enlisteds.length === 0) {
      resultDiv.innerHTML = `<p class="text-gray-700">❌ Ví <code>${address}</code> chưa từng enlist.</p>`;
    } else {
      resultDiv.innerHTML = `
        <p class="text-green-600">✅ Ví <code>${address}</code> đã enlist ${enlisteds.length} lần:</p>
        <ul class="list-disc ml-6 mt-2">
          ${enlisteds.map((e: any) => `<li>TX: ${e.transactionHash}</li>`).join('')}
        </ul>`;
    }
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = `<p class="text-red-500">🚫 Lỗi khi truy vấn: ${(err as Error).message}</p>`;
  }
};
