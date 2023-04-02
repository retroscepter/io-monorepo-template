export function rand(min: number, max: number) {
    return Math.random() * (max - min) + min
}

export function randInt(min: number, max: number) {
    return Math.floor(rand(min, max))
}
