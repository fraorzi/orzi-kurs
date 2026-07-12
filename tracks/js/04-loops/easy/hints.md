## Hint 1

`fizzBuzz`: pętla `for` od 1 do n, w każdej iteracji push do tablicy wyniku.
Kolejność warunków ma znaczenie: najpierw wielokrotność 15 (albo `i % 3 === 0
&& i % 5 === 0`), potem 3, potem 5. `sumRange`: akumulator + pętla z warunkiem
`i <= b`. `countVowels`: `for..of` po `str.toLowerCase()`.

## Hint 2

`countVowels`: najczytelniej sprawdzać `"aeiou".includes(ch)`. `sumRange`:
gdy `a > b`, pętla `for (let i = a; i <= b; i++)` po prostu się nie wykona —
warunek jest fałszywy od startu, więc akumulator zostaje 0 bez żadnego ifa.
