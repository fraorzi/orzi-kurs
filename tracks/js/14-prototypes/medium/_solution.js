export function Queue(initial = []) {
  this.items = [...initial];
}

Queue.prototype.enqueue = function (x) {
  this.items.push(x);
};

Queue.prototype.dequeue = function () {
  return this.items.shift();
};

Queue.prototype.size = function () {
  return this.items.length;
};

export function myObjectCreate(proto) {
  if (typeof proto !== "object" || proto === null) {
    throw new TypeError("proto musi być obiektem");
  }
  function Temp() {}
  Temp.prototype = proto;
  return new Temp();
}
