export function areArraysEqualAnyOrder(arr1: number[] | undefined, arr2: number[] | undefined): boolean {
    if(arr1 == undefined && arr2 == undefined) {
        return true
    }else if(arr1 == undefined || arr2 == undefined) {
        return false
    }

    if (arr1.length !== arr2.length) {
        return false;
    }

    const sortedArr1 = [...arr1].sort((a, b) => a - b);
    const sortedArr2 = [...arr2].sort((a, b) => a - b);

    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}