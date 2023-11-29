// 1.1 Что выведет следующий код
console.log('start') // 1 as a sync task

const promise11 = new Promise((resolve, reject) => {
  console.log(1) // will be called as the fourth because within the promis constructor,there is no call for resolve or reject, so basically in this promise will never be allowed or rejected. As a result, the code within the promiss will only be executed until the output of console.log(1).
})

const fn1 = () => {
  console.log('3')//2
}

console.log('end')//3

// 1.2 Какой результат выполнения этого кода?

console.log('start')//1 as sync task

const promise12 = new Promise((resolve, reject) => {
  console.log(1)//2 will be executed directly after promise creation
  resolve(200)//4 will be executed as the last with a method then()
})

promise12.then((response) => {
  console.log(response)
})

console.log('end')//3

// 1.3 Какой результат выполнения этого кода?

console.log('start')//1

const promise13 = new Promise((resolve, reject) => {
  console.log(1)//3
})

promise13.then((res) => {
  console.log(2)// won't be executed for a reason that there is no call resolve or reject, so this promise will never be allowed or rejected. 
})

console.log('end')//2

// 1.4 Какой результат выполнения этого кода?

console.log('start')//1

setTimeout(() => {
  console.log('setTimeout')//4
})

Promise.resolve().then(() => {
  console.log('resolve')//3
})

console.log('end')//2
//start the end as sync tasks
//after will be 'resolves' 
//finally will be settimeout even with 0 delay as a macrotask

// 1.5

function job() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello world')
    }, 2000)
  })
}

job().then((data) => console.log(data))

// the function job will return3 the promise with a string 'hello world' in 2 sec after the function had been called.

// 1.6

function job(data) {
  return new Promise((resolve, reject) => {
    if (isNaN(data)) {
      reject('error')
    } else if (data % 2 === 0) {
      setTimeout(() => {
        reject('even')
      }, 2000)
    } else {
      setTimeout(() => {
        resolve('odd')
      }, 1000)
    }
  })
}

job('aasd')
  .then((data) => console.log(data))
  .catch((error) => console.log(error))

job(2)
  .then((data) => console.log(data))
  .catch((error) => console.log('rejected: ' + error))

job(3).then((data) => console.log(data))
// i think the result of this task will be following: 
//the first value of function job is NaN, so promis will be rejected with the message 'error'.
//in the second case 2 is an even number and this value will be rejected in 2 sec with a message'even'
//and finally for the third case 3 is odd number and it will be resolved after 1 sec with a message 'odd'

// 1.7
console.log('start')

const promise1 = new Promise((resolve, reject) => {
  console.log(1)

  resolve(200)
  console.log(3)
})

promise1.then((res) => {
  console.log(res)
})

console.log('end')
//the result in console will be as following: 
//start
//1
//3
//end
//200, it will be called after '1' and sent to the queue and even when the result will be resolved still it will be waiting for its queue till all the requests will be done

//1.8
console.log('start')

const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1)
    resolve('success')
  })

console.log('middle')

fn().then((res) => {
  console.log(res)
})

console.log('end')
//the result will be following:
//start
//1
//middle
//end
//success,  as per my explanation of the previous task(value:200)

//1.9
const promise = new Promise((resolve, reject) => {
  console.log(1)

  setTimeout(() => {
    console.log('timerStart')
    resolve('success')
    console.log('timerEnd')
  }, 0)

  console.log(2)
})

promise.then((res) => {
  console.log(res)
})

console.log(4)
// the result will be quite complicated:
// the first what we will see in console will be 1
//The setTimeout is running with 0 delay. However, the code inside setTimeout becomes a macrotask and it is not executed instantly. Therefore, code execution continues.
//then 2
//timerStart
//timerEnd
//4
//success will be running as the last because it will be executed wilh a method then() inside the function expression


//1.10
console.log(1)//1

setTimeout(() => console.log(2))//5

Promise.resolve().then(() => console.log(3))//3

Promise.resolve().then(() => setTimeout(() => console.log(4)))//6

Promise.resolve().then(() => console.log(5))//4

setTimeout(() => console.log(6))//7

console.log(7)//2
// the first results will be the microtasks without settimeouts '1' and '7'
// 3 and 5 will running directly after the previous taks
//2 and 4the first result from the queue with settimeout
// 6 will runing after all tasks with settimeouts are finished as per the sync queue




// 1.11
let promise1111 = new Promise(function (resolve, reject) {
  resolve(1)

  setTimeout(() => resolve(2), 1000)
})

promise.then((data) => console.log(data))

//I guess there is a mistake done on purpose in the name of variable(promise1111 and promise with a method then()). In this particular case we will observe an error
//in case if there are no mistakes, the result will be: 1 and after 1 second - 2
