## Hint 1

`new StringDecoder("utf8")`, a w pętli `for await` doklejaj
`decoder.write(Buffer.from(chunk))`.

## Hint 2

`decoder.write` zwraca tylko **kompletne** znaki; niedokończone bajty czekają
w dekoderze na kolejny chunk — to cała magia tego API.

## Hint 3

Nie zapomnij o `+ decoder.end()` na końcu — bez tego ostatnie buforowane bajty
przepadną.
