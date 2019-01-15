'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var container = document.querySelector('main');


  function createSuccess() {
    var successTpl = document.querySelector('#success').content.querySelector('.success');
    var success = successTpl.cloneNode(true);

    function onSuccessrKeydown(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        onSuccessClose();
      }
    }

    function onSuccessClose() {
      success.parentNode.removeChild(success);
      success.removeEventListener('click', onSuccessClose);
      document.removeEventListener('keydown', onSuccessrKeydown);
    }

    success.addEventListener('click', onSuccessClose);
    document.addEventListener('keydown', onSuccessrKeydown);

    container.appendChild(success);
  }

  function createSendError() {
    var errorTpl = document.querySelector('#error').content.querySelector('.error');
    var error = errorTpl.cloneNode(true);

    function onErrorKeydown(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        onErrorClose();
      }
    }

    function onErrorClose() {
      error.parentNode.removeChild(error);
      error.removeEventListener('click', onErrorClose);
      document.removeEventListener('keydown', onErrorKeydown);
    }

    error.addEventListener('click', onErrorClose);
    document.addEventListener('keydown', onErrorKeydown);

    container.appendChild(error);
  }

  function createGetError() {
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
    createSuccess: createSuccess,
    createSendError: createSendError,
    createGetError: createGetError,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
