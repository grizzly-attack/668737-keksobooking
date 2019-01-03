'use strict';

(function () {
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

      var MainPinTop = window.mapLock.pinMain.offsetTop - shift.y;
      var MainPinLeft = window.mapLock.pinMain.offsetLeft - shift.x;

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

      window.mapLock.pinMain.style.top = MainPinTop + 'px';
      window.mapLock.pinMain.style.left = MainPinLeft + 'px';

      address.value = window.mapLock.getPinCoordinates(MainPinLeft, MainPinTop, window.mapLock.PIN_TAIL);
    };

    var MouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);
    };

    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mouseup', MouseUpHandler);
  }

  window.mapLock.pinMain.addEventListener('mousedown', PinMainMouseupHandler);
}) ();
