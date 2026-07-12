export function getItem(cards, position) {
  return cards[position];
}

export function setItem(cards, position, replacement) {
  cards[position] = replacement;
  return cards;
}

export function insertItemAtTop(cards, item) {
  cards.push(item);
  return cards;
}

export function removeItem(cards, position) {
  cards.splice(position, 1);
  return cards;
}

export function removeItemFromTop(cards) {
  cards.pop();
  return cards;
}

export function checkSizeOfStack(cards, count) {
  return cards.length === count;
}
