export async function fetchJson(url) {
  // TODO: fetch(url); gdy !res.ok -> throw new Error(`HTTP ${res.status}`); inaczej res.json()
}

export async function postJson(url, body) {
  // TODO: fetch(url, { method: "POST", headers: {...}, body: JSON.stringify(body) })
  //       + ta sama obsługa !res.ok
}
