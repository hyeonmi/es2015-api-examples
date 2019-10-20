# Promise vs. async/await

## 들어가며
ES6 promise와 ES7의 async/await 사용법을 살펴 봅니다.

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