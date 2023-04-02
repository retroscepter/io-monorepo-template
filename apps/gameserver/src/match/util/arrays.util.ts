export function shuffle(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
}

export function isAscendingByOne(arr: number[]) {
    return arr.every((x, i) => i === 0 || x - arr[i - 1] === 1)
}

export function isDescendingByOne(arr: number[]) {
    return arr.every((x, i) => i === 0 || arr[i - 1] - x === 1)
}
