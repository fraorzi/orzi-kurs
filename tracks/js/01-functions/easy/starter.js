export function min(a, b) {
    if (a < b) return a;
    return b;
}

export function pow(x, n) {
    let sum = 1;
    for (let i = 0; i < n; i++) {
        sum *= x;
    }
    return sum;
}

export function greet(name, greeting = "Cześć") {
    return `${greeting}, ${name}!`;
}
