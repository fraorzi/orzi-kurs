export function makeArmy() {
  const shooters = [];

  for (let i = 0; i < 10; i++) {
    shooters.push(() => i);
  }

  return shooters;
}
