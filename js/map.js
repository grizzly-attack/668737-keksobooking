'use strict';

(function () {
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 62;
  var PIN_TAIL = 22;
  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;

  var LEFT_LAST_COORD = 130 - (PIN_HEIGHT + PIN_TAIL);
  var RIGHT_LAST_COORD = 630 - (PIN_HEIGHT + PIN_TAIL);
  var TOP_LAST_COORD = 0;
  var BOTTOM_LAST_COORD = 1138;

  var formFieldsets = document.querySelector('.ad-form').querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var filterFieldsets = filterForm.querySelectorAll('select');
  var pinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var features = document.querySelector('.map__features');
  var address = document.querySelector('#address');
  var resetButton = document.querySelector('.ad-form__reset');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.sendData(new FormData(form), function () {
      onMapReset(evt);
      window.messages.createSuccess();

    }, window.messages.createSendError);
  });

  resetButton.addEventListener('click', onMapReset);

  function getPinCoordinates(coordX, coordY, coordTail) {
    var mainPinCoord = ((PIN_WIDTH / 2) + coordX) + ', ' + ((PIN_HEIGHT / 2) + coordY);
    if (coordTail) {
      mainPinCoord = ((PIN_WIDTH / 2) + coordX) + ', ' + (PIN_HEIGHT + coordY + coordTail);
    }
    return mainPinCoord;
  }
  blockMap();

  function blockMap() {
    address.value = getPinCoordinates(MAIN_PIN_LEFT, MAIN_PIN_TOP);

    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = true;
    }

    for (i = 0; i < filterFieldsets.length; i++) {
      filterFieldsets[i].disabled = true;
    }

    features.disabled = true;
  }

  function onMapReset(evt) {
    if (evt) {
      evt.preventDefault();
      var mapPins = document.querySelector('.map__pins').querySelectorAll('button[type="button"]');
      var popup = window.cards.map.querySelector('.popup');
      var activePin = window.cards.map.querySelector('.map__pin--active');

      form.reset();
      filterForm.reset();

      pinMain.style.top = MAIN_PIN_TOP + 'px';
      pinMain.style.left = MAIN_PIN_LEFT + 'px';

      pinMain.addEventListener('mouseup', onPinMainMouseup);
      document.querySelector('#capacity').options[2].selected = true;

      for (var i = 0; i < mapPins.length; i++) {
        mapPins[i].parentNode.removeChild(mapPins[i]);
      }

      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }

      if (popup) {
        popup.parentElement.removeChild(popup);
      }

      blockMap();
      window.cards.map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');
    }
  }

  function onPinMainMouseup() {
    window.backend.getData(window.pins.create, window.messages.createGetError);

    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = false;
    }

    for (i = 0; i < filterFieldsets.length; i++) {
      filterFieldsets[i].disabled = false;
    }

    features.disabled = false;

    window.cards.map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    pinMain.removeEventListener('mouseup', onPinMainMouseup);
  }

  if (document.querySelector('.map--faded')) {
    pinMain.addEventListener('mouseup', onPinMainMouseup);
  }

  function pinMainMouseupHandler(evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinTop = pinMain.offsetTop - shift.y;
      var mainPinLeft = pinMain.offsetLeft - shift.x;

      if (mainPinTop < LEFT_LAST_COORD) {
        mainPinTop = LEFT_LAST_COORD;
      }

      if (mainPinTop > RIGHT_LAST_COORD) {
        mainPinTop = RIGHT_LAST_COORD;
      }

      if (mainPinLeft < TOP_LAST_COORD) {
        mainPinLeft = TOP_LAST_COORD;
      }

      if (mainPinLeft > BOTTOM_LAST_COORD) {
        mainPinLeft = BOTTOM_LAST_COORD;
      }

      pinMain.style.top = mainPinTop + 'px';
      pinMain.style.left = mainPinLeft + 'px';

      address.value = getPinCoordinates(mainPinLeft, mainPinTop, PIN_TAIL);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  pinMain.addEventListener('mousedown', pinMainMouseupHandler);
})();
