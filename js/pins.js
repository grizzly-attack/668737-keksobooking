'use strict';

(function () {
  var pinTpl = document.querySelector('#pin').content.querySelector('.map__pin');
  var container = document.querySelector('.map__pins');

  function createPins(offers) {
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

  window.pins = {
    createPins: createPins
  };
}) ();
