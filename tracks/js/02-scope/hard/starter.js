export function makeArmy() {
  const shooters = [];

  let i = 0;
  while (i < 10) {
    const shooter = function () {
      return i;
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}
