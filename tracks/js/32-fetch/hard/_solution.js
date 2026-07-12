export async function fetchWithRetry(url, retries = 2) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    let res;
    try {
      res = await fetch(url);
    } catch (err) {
      lastError = err; // błąd sieci — warto ponowić
      continue;
    }

    if (res.ok) {
      return res.json();
    }

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`HTTP ${res.status}`); // błąd żądania — ponawianie nic nie da
    }

    lastError = new Error(`HTTP ${res.status}`); // 5xx — ponawiamy
  }

  throw lastError;
}
