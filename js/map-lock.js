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

  form.addEventListener('submit', function() {
    window.backend.sendData(new FormData(form), function (response) {
      onPinMainMouseup();
      createSuccess();
      console.log(createSuccess);
    });
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
    window.backend.getData(window.pins.createPins);

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
    var succcessTpl = document.querySelector('#success');
    var succcess = succcessTpl.cloneNode(true);
    succcess.appendChild(container);
  }

  window.mapLock = {
    pinMain: pinMain,
    PIN_TAIL: PIN_TAIL,
    getPinCoordinates: getPinCoordinates,
    address: address
  };

}) ();
