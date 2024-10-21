// const array2D_1 = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ];

// function sumRow(arr: number[][], rowIdx: number): Promise<number> {
//     return new Promise((resolve, reject) => {
//         if (rowIdx < 0 || rowIdx >= arr.length) {
//             reject("Row index out of bounds");
//         } else {
//             let sum = 0;
//             for (let num of arr[rowIdx]) {
//                 sum += num;
//             }
//             resolve(sum);
//         }
//     });
// }

// function sum2DArrayConcurrent(arr: number[][]): Promise<number> {
//     return new Promise((resolve, reject) => {
//         if (arr.length === 0) {
//             reject('Cannot sum an empty array');
//         }

//         const perRowPromises: Promise<number>[] = [];

//         for (let x = 0; x < arr.length; x++) {
//             perRowPromises.push(sumRow(arr, x));
//         }

//         Promise.all(perRowPromises)
//             .then((rowSums) => {
//                 const totalSum = rowSums.reduce((acc, sum) => acc + sum, 0);
//                 resolve(totalSum);
//             })
//             .catch((error) => reject(error));
//     });
// }

// sum2DArrayConcurrent(array2D_1)
//     .then(sum => {
//         console.log('Sum of array2D_1:', sum); 
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });


const array2D_1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

function sumRow(arr: number[][], rowIdx: number): Promise<number> {
    return new Promise((resolve, reject) => {
        if (rowIdx < 0 || rowIdx >= arr.length) {
            reject("Row index out of bounds");
        } else {
            let sum = 0;
            for (let num of arr[rowIdx]) {
                sum += num;
            }
            resolve(sum);
        }
    });
}

async function sum2DArrayConcurrent(arr: number[][]): Promise<number> {
    if (arr.length === 0) {
        throw new Error('Cannot sum an empty array');
    }

    const perRowPromises: Promise<number>[] = [];

    for (let x = 0; x < arr.length; x++) {
        perRowPromises.push(sumRow(arr, x));
    }

    try {
        const rowSums = await Promise.all(perRowPromises);
        return rowSums.reduce((acc, sum) => acc + sum, 0);
    } catch (error) {
        throw new Error("error");
    }
}

(async () => {
    try {
        const sum = await sum2DArrayConcurrent(array2D_1);
        console.log('Sum of array2D_1:', sum); 
    } catch (error) {
        console.error('Error:', error);
    }
})();
