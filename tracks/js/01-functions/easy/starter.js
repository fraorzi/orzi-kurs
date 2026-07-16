export function min(a, b) {
    return a < b ? a : b;
}

export function pow(x, n) {
    let res = 1;
    for (let i = 0; i < n; i++) {
        res *= x;
    }
    return res;
}

export function greet(name, greeting = "Cześć") {
    return `${greeting}, ${name}!`;
}
