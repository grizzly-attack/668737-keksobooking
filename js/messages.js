'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var container = document.querySelector('main');

  function createSuccessMessage() {
    var successTpl = document.querySelector('#success').content.querySelector('.success');
    var success = successTpl.cloneNode(true);

    success.addEventListener('click', function () {
      success.parentNode.removeChild(success);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        success.parentNode.removeChild(success);
      }
    });

    container.appendChild(success);
  }

  function createSendErrorMessage() {
    var errorTpl = document.querySelector('#error').content.querySelector('.error');
    var error = errorTpl.cloneNode(true);
    var button = error.querySelector('.error__button');

    error.addEventListener('click', function () {
      error.parentNode.removeChild(error);
    });

    button.addEventListener('click', function () {
      error.parentNode.removeChild(error);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        error.parentNode.removeChild(error);
      }
    });

    container.appendChild(error);
  }

  function createGetErrorMessage() {
    var errorTpl = document.querySelector('#error').content.querySelector('.error');
    var error = errorTpl.cloneNode(true);
    var button = error.querySelector('.error__button');
    var errorText = error.querySelector('.error__message');

    errorText.textContent = 'Произошла ошибка';
    button.textContent = 'OK';

    button.addEventListener('click', function () {
      document.location.reload(true);
    });

    container.appendChild(error);
  }

  window.messages = {
    createSuccessMessage: createSuccessMessage,
    createSendErrorMessage: createSendErrorMessage,
    createGetErrorMessage: createGetErrorMessage,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
