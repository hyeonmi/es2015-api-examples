export const getAjax = (url, success, fail) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener('load', () => success(JSON.parse(xhr.responseText)));
    xhr.addEventListener('error', () => fail(JSON.parse(xhr.statusText)));
    xhr.send();
}