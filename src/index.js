// callback #1
// import { getAjax } from './callbackBasic';
// getAjax('https://jsonplaceholder.typicode.com/users', 
// (data) => {
//     const html = data.sort((a,b)=>{
//         if(a.name > b.name){
//             return 1;
//         }
//         if(a.name < b.name){
//             return -1;
//         }
//         return 0
//     }).map(user => `<li><strong>[${user.id}]${user.name}</strong><span>${user.email}</span></li>`).join('');
//     document.getElementById('user-list').innerHTML = html;    
// }, 
// (error) => {
//     console.log(error)
// })

// callback hell #2
// getAjax('https://jsonplaceholder.typicode.com/users', 
// (data) => {
//     const html = []
//     data.forEach(user => {
//         getAjax(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
//         , (data) => {
//             data.forEach(post => {
//                 html.push(`<li><strong>${post.title}</strong><span>${post.body}</span></li>`)
//                 document.getElementById('user-list').innerHTML = html.join('');
//             })
//         }
//         , (error) => {
//             console.log(error)
//         })
//     }
//     );
// }, 
// (error) => {
//     console.log(error)
// })


// promise
// import { getAjax } from './promiseBasic';
// getAjax('https://jsonplaceholder.typicode.com/users')
//     .then(data => {
//         const html = data.map(user => `<li><strong>${user.name}</strong><span>${user.email}</span></li>`).join('');
//         document.getElementById('user-list').innerHTML = html;
//     })
//     .catch(error => console.log(error))

// await/async
// import { getAjax } from './promiseBasic';
// const asyncBasic = async () => {
//     try {
//         const data = await getAjax('https://jsonplaceholder.typicode.com/users');
//         const html = data.map(user => `<li><strong>${user.name}</strong><span>${user.email}</span></li>`).join('');
//         document.getElementById('user-list').innerHTML = html;    
//     } catch (error) {
//         console.log(error);
//     }
// }
// asyncBasic();


// import { getAjax } from './promiseAxios';
// getAjax('https://jsonplaceholder.typicode.com/users')
//     .then(rep => {
//         const html = rep.data.map(user => `<li><strong>${user.name}</strong><span>${user.email}</span></li>`).join('');
//         document.getElementById('user-list').innerHTML = html;
//     })
//     .catch(error => console.log(error))
