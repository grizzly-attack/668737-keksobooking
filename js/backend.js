'use strict';

(function () {
  var TIMEOUT = 10000;
  var XHR_STATUS = 200;

  window.backend = {
    getData: getData,
    sendData: sendData
  };

  function sendRequest(method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === XHR_STATUS && typeof onLoad === 'function') {
        onLoad(xhr.response);
      } else {
        if (typeof onError === 'function') {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  }

  function getData(onLoad, onError) {
    sendRequest('GET', 'https://js.dump.academy/keksobooking/data', onLoad, onError);
  }

  function sendData(data, onLoad, onError) {
    sendRequest('POST', 'https://js.dump.academy/keksobooking', onLoad, onError, data);
  }
})();
