export const getAjax = (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.addEventListener('load', () => resolve(JSON.parse(xhr.responseText)));
      xhr.addEventListener('error', () => reject(JSON.parse(xhr.statusText)));
      xhr.send();
    });
}