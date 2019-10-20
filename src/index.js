// promise
// import { getUsers } from './promiseBasic';
// getUsers()
//     .then(res => JSON.parse(res))
//     .then(data => {
//         const html = data.map(user => `<li><strong>${user.name}</strong><span>${user.email}</span></li>`).join('');
//         document.getElementById('user-list').innerHTML = html;
//     })
//     .catch(error => console.log(error))

// await/async
// import { getUsers } from './promiseBasic';
// const asyncBasic = async () => {
//     try {
//         const res = await getUsers();
//         const html = JSON.parse(res).map(user => `<li><strong>${user.name}</strong><span>${user.email}</span></li>`).join('');
//         document.getElementById('user-list').innerHTML = html;    
//     } catch (error) {
//         console.log(error);
//     }
// }
// asyncBasic();



// import { getUsers } from './promiseAxios';
// getUsers()
//     .then(rep => {
//         const html = rep.data.map(user => `<li><strong>${user.name}</strong><span>${user.email}</span></li>`).join('');
//         document.getElementById('user-list').innerHTML = html;
//     })
//     .catch(error => console.log(error))

