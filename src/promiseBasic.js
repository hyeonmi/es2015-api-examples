export const getUsers = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", 'https://jsonplaceholder.typicode.com/users');
      xhr.addEventListener('load', () => resolve(xhr.responseText));
      xhr.addEventListener('error', () => reject(xhr.statusText));
      xhr.send();
    });
}