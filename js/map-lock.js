'use strict';

(function () {
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 62;
  var PIN_TAIL = 22;
  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;

  var formFieldsets = document.querySelector('.ad-form').querySelectorAll('fieldset');
  var filterFieldsets = document.querySelector('.map__filters').querySelectorAll('select');
  var pinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');

  var address = document.querySelector('#address');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.sendData(new FormData(form), function (response) {
      var mapPins = document.querySelectorAll('.map__pin');
      form.reset();
      pinMain.style='left: 570px; top: 375px';
      pinMain.addEventListener('mouseup', onPinMainMouseup);

      for (var i = 0; i < mapPins.length; i++) {
        if (i > 0) {
          mapPins[i].parentNode.removeChild(mapPins[i]);
        }
      }

      pinMain

      address.value = getPinCoordinates(MAIN_PIN_LEFT, MAIN_PIN_TOP);
      createSuccess();
      window.cards.map.classList.add('map--faded');

    }, createSendErrorMessage);
  });

  function getPinCoordinates(coordX, coordY, coordTail) {
    var mainPinCoord = ((PIN_WIDTH / 2) + coordX) + ', ' + ((PIN_HEIGHT / 2) + coordY);
    if (coordTail) {
      mainPinCoord = ((PIN_WIDTH / 2) + coordX) + ', ' + (PIN_HEIGHT + coordY + coordTail);
    }
    return mainPinCoord;
  }

  address.value = getPinCoordinates(MAIN_PIN_LEFT, MAIN_PIN_TOP);

  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = true;
  }

  for (i = 0; i < filterFieldsets.length; i++) {
    filterFieldsets[i].disabled = true;
  }

  function onPinMainMouseup() {
    window.backend.getData(window.pins.createPins, createGetErrorMessage);

    for (i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = false;
    }

    for (i = 0; i < filterFieldsets.length; i++) {
      filterFieldsets[i].disabled = false;
    }

    window.cards.map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    address.value = getPinCoordinates(MAIN_PIN_LEFT, MAIN_PIN_TOP, PIN_TAIL);

    pinMain.removeEventListener('mouseup', onPinMainMouseup);
  }

  if (document.querySelector('.map--faded')) {
    pinMain.addEventListener('mouseup', onPinMainMouseup);
  }

  function createSuccess() {
    var container = document.querySelector('main');
    var successTpl = document.querySelector('#success').content.querySelector('.success');
    var success = successTpl.cloneNode(true);
    container.appendChild(success);
    success.addEventListener('click', function () {
      success.parentNode.removeChild(success);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
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
      if (evt.keyCode === 27) {
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

  window.mapLock = {
    pinMain: pinMain,
    PIN_TAIL: PIN_TAIL,
    getPinCoordinates: getPinCoordinates,
    address: address
  };
})();
