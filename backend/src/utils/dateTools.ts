export function compareDates(
    a: Date | string | number,
    b: Date | string | number
): -1 | 0 | 1 {
    const tA = new Date(a).getTime();
    const tB = new Date(b).getTime();

    if (Number.isNaN(tA) || Number.isNaN(tB)) {
        throw new Error("Invalid date");
    }

    if (tA < tB) return -1;
    if (tA > tB) return 1;
    return 0;
}