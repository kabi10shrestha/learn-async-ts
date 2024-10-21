const array2D_3 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, -9]
];


function checkNegative(arr: number[], rowIdx: number): Promise<number[]> {
    return new Promise((resolve, reject) => {
        if (arr.some(num => num < 0)) {
            resolve(arr);
        } else {
            reject();
        }
    });
}

async function negativeRows(arr: number[][]): Promise<void> {
    const rowPromises = arr.map((row, index) => checkNegative(row, index));

    try {
        const negativeRows = await Promise.allSettled(rowPromises);
        negativeRows.forEach((result, index) => {
            if (result.status === "fulfilled") {
                console.log(`Row ${index} has a negative number:`, result.value);
            }
        });
    } catch (err) {
        console.error("Error:", err);
    }
}

negativeRows(array2D_3);
