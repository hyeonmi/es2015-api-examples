# Promise vs. async/await

## 들어가며
ES6 promise와 ES7의 async/await 사용법을 살펴 봅니다.

## 목차
- Promise 란?
- async/await 란?
- Ajax + Callback 예제
- Callback Hell 예제
- Ajax with Promise & then/catch 예제
- Ajax with Promise & async/await 예제
- Axios로 구현해보기

### Promise 
![promise](https://mdn.mozillademos.org/files/8633/promises.png)
- 대기(pending), 이행(fulfill), 거부(reject)
- 수행 후 처리를 하고 싶으면 .then(data => {})로 받아서 처리한다.
- 수행시 에러가 발생하면 .catch(err => {})로 해결하면 된다.

### async function
- AsyncFunction(비동기함수) 객체를 반환한다. 암시적으로 Promise 반환한다.
- await를 허용한다.

### await
- await는 async function 실행을 중단 시키고 fulfill, reject 될때까지 기다린 후 async function을 다시 실행한다.
- fulfill 된 값을 반환한다.
- reject되면 값을 throw 하기때문에 try catch로 처리 하면 된다.


### XMLHttpRequest(ajax) + Callback 예제
XMLHttpRequest 모듈를 활용해서 callback 방식으로 ajax를 호출 하는 예제를 만들어봅시다.

```js
// https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
export const getAjax = (url, success, fail) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener('load', () => success(JSON.parse(xhr.responseText)));
    xhr.addEventListener('error', () => fail(JSON.parse(xhr.statusText)));
    xhr.send();
}
```

```js
import { getAjax } from './callbackBasic';

getAjax('https://jsonplaceholder.typicode.com/users', 
(data) => {
    const html = data.map(user => `<li><strong>${user.name}</strong><span>${user.email}</span></li>`).join('');
    document.getElementById('user-list').innerHTML = html;    
}, 
(error) => {
    console.log(error)
})
```

이전 예제는 간단한 기능으라 단순해 보입니다. 그러나 다음과 같은 예제는 어떨까요?
사용자 데이터를 가져와서 각 사용자가 작성한 글을 노출 하려면 다음과 같인 api 호출을 2번 해야 합니다.

```js
getAjax('https://jsonplaceholder.typicode.com/users', 
(data) => {
    const html = []
    data.forEach(user => {
        getAjax(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
        , (data) => {
            data.forEach(post => {
                html.push(`<li><strong>${post.title}</strong><span>${post.body}</span></li>`)
                document.getElementById('user-list').innerHTML = html.join('');
            })
        }
        , (error) => {
            console.log(error)
        })
    }
    );
}, 
(error) => {
    console.log(error)
})
```

### XMLHttpRequest(ajax) + Promise 예제
XMLHttpRequest 모듈을 활용하여 특정 서버에 있는 데이터를 가져온 후 Promise를 반환하는 모듈을 만듭니다.

```js
export const getUsers = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", 'https://jsonplaceholder.typicode.com/users');
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
}
```

### Promise
promise 객체를 반환하는 경우 then으로 결과 값을 받을 수 있고 catch로 에러 값을 받을 수 있습니다.

```js
import { getUsers } from './promiseBasic';
getUsers()
    .then(res => JSON.parse(res))
    .then(data => {
        const html = data.map(user => `<li><strong>${user.name}</strong><span>${user.email}</span></li>`).join('');
        document.getElementById('user-list').innerHTML = html;
    })
    .catch(error => console.log(error))
```

### async/await
async/await는 then/catch 대신 바로 결과 값을 가져 올수 있고 try/catch로 에러를 처리 할수 있습니다. 

아래 코드를 넣고 실행하면 콘솔 로그에서 `regeneratorRuntime is not defined ...` 에러를 확인하게 됩니다.

```js
import { getUsers } from './promiseBasic';
const asyncBasic = async () => {
    try {
        const res = await getUsers();
        const html = JSON.parse(res).map(user => `<li><strong>${user.name}</strong><span>${user.email}</span></li>`).join('');
        document.getElementById('user-list').innerHTML = html;    
    } catch (error) {
        console.log(error);
    }
}
asyncBasic();
```

async/await를 지원하지 않는 다수의 브라우져를 대응하기 위해 `@babel/polyfill`를 추가 해야 합니다.
product 모드에서도 사용해야하기 때문에 `--save` 옵션으로 설치 합니다.

```
npm install --save @babel/polyfill
```

`webpack.config.js`에 `@babel/polyfill`를 추가합니다.

```js
    entry: ['@babel/polyfill','./src/index.js'],
```

재빌드 후 재실행하면 정상 동작합니다.


## 마치며
간단한 예제로 promise와 async/await 사용법을 알아봤습니다.
실무에서는 axios 라이브러리를 많이 사용합니다. axios로 동일한 기능을 구현해 봅시다.

## 참고
- API 테스트 사이트 : https://jsonplaceholder.typicode.com/
- axios 라이브러리 : https://github.com/axios/axios