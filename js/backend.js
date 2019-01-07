'use strict';
// принимает данные
(function () {

  window.backend = {
    getData: getData,
    sendData: sendData
  }

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });
  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = 10000;

  function getData(onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  function sendData (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
