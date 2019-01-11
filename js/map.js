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
    window.backend.sendData(new FormData(form), function () {
      var mapPins = document.querySelectorAll('.map__pin');
      form.reset();
      pinMain.style = 'left: 570px; top: 375px';
      pinMain.addEventListener('mouseup', onPinMainMouseup);

      for (var i = 0; i < mapPins.length; i++) {
        if (i > 0) {
          mapPins[i].parentNode.removeChild(mapPins[i]);
        }
      }

      blockMap();
      window.messages.createSuccessMessage();
      window.cards.map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');

    }, window.messages.createSendErrorMessage);
  });

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
  }

  function onPinMainMouseup() {
    window.backend.getData(window.pins.createPins, window.messages.createGetErrorMessage);

    for (var i = 0; i < formFieldsets.length; i++) {
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


  function PinMainMouseupHandler(evt) {
    var LEFT_LAST_COORD = '130';
    var RIGHT_LAST_COORD = '630';
    var TOP_LAST_COORD = '0';
    var BOTTOM_LAST_COORD = '1138';

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var MouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var MainPinTop = pinMain.offsetTop - shift.y;
      var MainPinLeft = pinMain.offsetLeft - shift.x;

      if (MainPinTop < LEFT_LAST_COORD) {
        MainPinTop = LEFT_LAST_COORD;
      }

      if (MainPinTop > RIGHT_LAST_COORD) {
        MainPinTop = RIGHT_LAST_COORD;
      }

      if (MainPinLeft < TOP_LAST_COORD) {
        MainPinLeft = TOP_LAST_COORD;
      }

      if (MainPinLeft > BOTTOM_LAST_COORD) {
        MainPinLeft = BOTTOM_LAST_COORD;
      }

      pinMain.style.top = MainPinTop + 'px';
      pinMain.style.left = MainPinLeft + 'px';

      address.value = getPinCoordinates(MainPinLeft, MainPinTop, PIN_TAIL);
    };

    var MouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);
    };

    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mouseup', MouseUpHandler);
  }

  pinMain.addEventListener('mousedown', PinMainMouseupHandler);
})();
