const p1 = Promise.resolve('promise 1');
const p2 = Promise.resolve('promise 2');
const p4 = Promise.reject(new Error('promise 4'));
const p3 = Promise.resolve('promise 3');
const p5 = Promise.reject(new Error('promise 5'));
const p6 = Promise.reject(new Error('promise 6'));

const promises = [p1, p2, p3, p4, p5];
const promisesReject = [p1, p2, p3, p4, p5, p6]; // pass this array as parameter in promiseAllWithThreshold method
const THRESHOLD_VALUE = 3;

const promiseAllWithThreshold = (
  arrayOfPromises: Promise<unknown>[],
  threshold: number
): Promise<unknown[]> => {
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;

    for (let i = 0; i < arrayOfPromises.length; i++) {
      const promise = arrayOfPromises[i];

      promise
        .then((data) => {
          result.push(data);
        })
        .catch((err) => {
          count += 1;
        })
        .finally(() => {
          const isLast = i === arrayOfPromises.length - 1;

          if (isLast) {
            if (threshold > count) {
              resolve(result);
            } else {
              reject(new Error('Threshold is exceeded'));
            }
          }
        });
    }
  });
};

promiseAllWithThreshold(promises, THRESHOLD_VALUE)
  .then((data) => {
    console.log('data', data);
  })
  .catch((error) => console.log('error', error.message));
