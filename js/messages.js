'use strict';

(function () {
  var ESC_KEYCODE = 27;

  function createSuccessMessage() {
    var container = document.querySelector('main');
    var successTpl = document.querySelector('#success').content.querySelector('.success');
    var success = successTpl.cloneNode(true);
    container.appendChild(success);
    success.addEventListener('click', function () {
      success.parentNode.removeChild(success);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        success.parentNode.removeChild(success);
      }
    });
  }

  function createSendErrorMessage() {
    var container = document.querySelector('main');
    var errorTpl = document.querySelector('#error').content.querySelector('.error');
    var error = errorTpl.cloneNode(true);
    var button = error.querySelector('.error__button');
    container.appendChild(error);
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
  }

  function createGetErrorMessage() {
    var container = document.querySelector('main');
    var errorTpl = document.querySelector('#error').content.querySelector('.error');
    var error = errorTpl.cloneNode(true);
    var button = error.querySelector('.error__button');
    container.appendChild(error);
    var errorText = error.querySelector('.error__message');
    errorText.textContent = 'Произошла ошибка';
    button.textContent = 'OK';

    button.addEventListener('click', function () {
      document.location.reload(true);
    });
  }

  window.messages = {
    createSuccessMessage: createSuccessMessage,
    createSendErrorMessage: createSendErrorMessage,
    createGetErrorMessage: createGetErrorMessage,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
