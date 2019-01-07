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
  var adForm = document.querySelector('.ad-form');

  var address = document.querySelector('#address');

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
    window.backend.getData(function (offers) {
      var pinTpl = document.querySelector('#pin').content.querySelector('.map__pin');
      var container = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < offers.length; i++) {
        generateOnePin(offers[i]);
      }

      function generateOnePin(offer) {
        var pin = pinTpl.cloneNode(true);
        var pinImg = pin.querySelector('img');
        pinImg.src = offer.author.avatar;
        pinImg.alt = offer.offer.title;
        pin.style = 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px';

        function removeCard() {
          var popup = window.cards.map.querySelector('.popup');

          if (popup) {
            popup.parentElement.removeChild(popup);
          }
        }

        pin.addEventListener('click', function () {
          removeCard();
          window.cards.generateCard(offer);
        });

        fragment.appendChild(pin);
      }

      container.appendChild(fragment);
    }
    );

    for (i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = false;
    }

    for (i = 0; i < filterFieldsets.length; i++) {
      filterFieldsets[i].disabled = false;
    }

    window.cards.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    address.value = getPinCoordinates(MAIN_PIN_LEFT, MAIN_PIN_TOP, PIN_TAIL);

    pinMain.removeEventListener('mouseup', onPinMainMouseup);
  }

  if (document.querySelector('.map--faded')) {
    pinMain.addEventListener('mouseup', onPinMainMouseup);
  }

  window.mapLock = {
    pinMain: pinMain,
    PIN_TAIL: PIN_TAIL,
    getPinCoordinates: getPinCoordinates,
    address: address
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.sendData(new FormData(form), function (response) {
      adForm.classList.remove('ad-form--disabled');
    });
    evt.preventDefault();
  });
}) ();
