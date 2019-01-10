'use strict';

(function () {
  var HOUSING_TYPE = [
    'any',
    'palace',
    'flat',
    'house',
    'bungalo'
  ]

  var PRICE = [
    'any',
    'middle',
    'low',
    'high'
  ]

  var ROOMS = [
    'any',
    '1',
    '2',
    '3'
  ]

  var GUESTS = [
    'any',
    '2',
    '1',
    '0'
  ]

  var FEATUERS = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var pinTpl = document.querySelector('#pin').content.querySelector('.map__pin');
  var container = document.querySelector('.map__pins');

  var offers = [];
  console.log(offers);

  function updatePins () {
    offers.filter(function(it) {
      return it.selectedType === selectedType;
    });

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      if (offers[i].offer) {
        generateOnePin(offers[i]);
      }
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

  function createPins(data) {
    offers = data;
    updatePins();
    /*var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      if (offers[i].offer) {
        generateOnePin(offers[i]);
      }
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

    container.appendChild(fragment); */
  }

  var housingType = document.querySelector('#housing-type');
  var selectedType;
  housingType.addEventListener('change', filterPins);
  filterPins();

  function filterPins () {
    for (var i = 0; i < housingType.length; i++) {
      selectedType = housingType.querySelector('[value="' + HOUSING_TYPE[i] + '"]').selected;
        return
    }
    updatePins();
  }

  window.pins = {
    createPins: createPins,
  };
})();
