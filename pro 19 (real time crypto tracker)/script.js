const tableBody = document.getElementById("crypto-data");

async function fetchCryptoPrices() {
  tableBody.innerHTML = `<tr><td colspan="3">Loading...</td></tr>`;

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("API limit or network issue");
    }

    const data = await response.json();
    tableBody.innerHTML = "";

    data.forEach(coin => {
      const row = document.createElement("tr");
      const cls = coin.price_change_percentage_24h >= 0 ? "green" : "red";

      row.innerHTML = `
        <td>${coin.name}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td class="${cls}">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </td>
      `;

      tableBody.appendChild(row);
    });

  } catch (err) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="3">
          ⚠️ API temporarily unavailable. Please wait & refresh.
        </td>
      </tr>`;
    console.error(err);
  }
}

fetchCryptoPrices();
setInterval(fetchCryptoPrices, 15000);
