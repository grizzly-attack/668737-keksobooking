'use strict';

// offers

(function () {
  var OFFERS_COUNT = 8;
  var newOffers = [];

  var priceMin = 1000;
  var priceMax = 1000000;
  var roomMin = 1;
  var roomMax = 5;
  var guestsMin = 1;
  var guestsMax = 10;
  var coordXMin = 0;
  var coordXMax = 1200;
  var coordYMin = 130;
  var coordYMax = 630;

  var offersTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var offersType = ['palace', 'flat', 'house', 'bungalo'];
  var offersCheckin = ['12:00', '13:00', '14:00'];
  var offersCheckout = ['12:00', '13:00', '14:00'];
  var offersFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var offersPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  function getRandomFromRange(min, max) {
    return (min + Math.floor(Math.random() * (max - min) + 1));
  }

  function generateOffers(count) {
    var result = [];

    for (var i = 1; i <= count; i++) {
      result.push(getOffer(i));
    }

    return result;

    function getOffer(index) {
      var coordX = getRandomFromRange(coordXMin, coordXMax);
      var coordY = getRandomFromRange(coordYMin, coordYMax);

      return {
        'author': {
          'avatar': 'img/avatars/user' + getTwoDigits(index) + '.png'
        },
        'offer': {
          'title': offersTitles.splice(getRandomFromRange(0, offersTitles.length - 1), 1),
          'address': coordX + ', ' + coordY,
          'price': getRandomFromRange(priceMin, priceMax),
          'type': offersType[getRandomFromRange(0, offersType.length)],
          'rooms': getRandomFromRange(roomMin, roomMax),
          'guests': getRandomFromRange(guestsMin, guestsMax),
          'checkin': offersCheckin[getRandomFromRange(0, offersCheckin.length)],
          'checkout': offersCheckout[getRandomFromRange(0, offersCheckout.length)],
          'features': getOfferFeatures(),
          'description': ' ',
          'photos': offersPhotos.sort()
        },
        'location': {
          'x': coordX,
          'y': coordY
        }
      };

      function getTwoDigits(number) {
        return (number < 10) ? '0' + number : number;
      }

      function getOfferFeatures() {
        var resultArr = [];
        var featuresClone = offersFeatures.slice();
        var featuresCount = getRandomFromRange(0, featuresClone.length - 1);

        for (var j = 0; j < featuresCount; j++) {
          resultArr.push(featuresClone.splice(getRandomFromRange(0, featuresClone.length - 1), 1)[0]);
        }
        return resultArr;
      }
    }
  }

  window.offers = {
    OFFERS_COUNT: OFFERS_COUNT,
    newOffers: newOffers,
    generateOffers: generateOffers
  };
}) ();

// pins

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

//cards

(function () {
  var cardTpl = document.querySelector('#card').content.querySelector('.popup');
  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');

  function generateCard(offer) {
    var card = cardTpl.cloneNode(true);
    card.querySelector('.popup__title').textContent = offer.offer.title;
    card.querySelector('.popup__text--address').textContent = offer.offer.address;
    card.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = getType(offer.offer.type);
    card.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    card.querySelector('.popup__description').textContent = offer.offer.description;
    card.querySelector('.popup__avatar').src = offer.author.avatar;

    generateFeatures(offer.offer.features);
    generatePhotos(offer.offer.photos);

    function getType(type) {
      switch (type) {
        case 'palace':
          return 'Дворец';
        case 'flat':
          return 'Квартира';
        case 'house':
          return 'Дом';
        default:
          return 'Бунгало';
      }
    }

    function generateFeatures(features) {
      var fragment = document.createDocumentFragment();
      var block = card.querySelector('.popup__features');

      for (var i = 0; i < features.length; i++) {
        fragment.appendChild(getFeature(features[i]));
      }

      while (block.firstChild) {
        block.removeChild(block.firstChild);
      }

      block.appendChild(fragment);

      function getFeature(feature) {
        var li = document.createElement('li');

        li.classList.add('popup__feature', 'popup__feature--' + feature);

        return li;
      }
    }

    function generatePhotos(imgs) {
      var fragment = document.createDocumentFragment();
      var photoPopup = card.querySelector('.popup__photos');
      var imgTpl = card.querySelector('.popup__photos').querySelector('img');

      for (var i = 0; i < imgs.length; i++) {
        fragment.appendChild(generatePhoto(imgs[i]));
      }
      while (photoPopup.firstChild) {
        photoPopup.removeChild(photoPopup.firstChild);
      }

      photoPopup.appendChild(fragment);

      function generatePhoto(imgSrc) {
        var photo = imgTpl.cloneNode(true);
        photo.style.display = 'inline';
        photo.src = imgSrc;

        return photo;
      }
    }

    var closePopup = card.querySelector('.popup__close');
    closePopup.addEventListener('click', function () {
      var popup = map.querySelector('.popup');
      popup.parentElement.removeChild(popup);
    });

    map.insertBefore(card, filtersContainer);
  }

  window.cards = {
    generateCard: generateCard,
    map: map
  };

  window.offers.newOffers = window.offers.generateOffers(window.offers.OFFERS_COUNT);
}) ();

// map-lock

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
    window.pins.createPins(window.offers.newOffers);

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
    getPinCoordinates: getPinCoordinates
  }
}) ();

//pin-coords

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


//form-sync

(function () {
  var MIN_PRICE = ['0', '1000', '5000', '10000'];
  var TYPE_OPTIONS = ['bungalo', 'flat', 'house', 'palace'];

  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');

  typeSelect.addEventListener('change', generteMinPrice);
  generteMinPrice();

  function generteMinPrice() {

    for (var i = 0; i < typeSelect.length; i++) {
      if (typeSelect.querySelector('[value="' + TYPE_OPTIONS[0] + '"]').selected) {
        priceInput.min = MIN_PRICE[0];
        priceInput.placeholder = MIN_PRICE[0];
      } else if (typeSelect.querySelector('[value="' + TYPE_OPTIONS[1] + '"]').selected) {
        priceInput.min = MIN_PRICE[1];
        priceInput.placeholder = MIN_PRICE[1];
      } else if (typeSelect.querySelector('[value="' + TYPE_OPTIONS[2] + '"]').selected) {
        priceInput.min = MIN_PRICE[2];
        priceInput.placeholder = MIN_PRICE[2];
      } else if (typeSelect.querySelector('[value="' + TYPE_OPTIONS[3] + '"]').selected) {
        priceInput.min = MIN_PRICE[3];
        priceInput.placeholder = MIN_PRICE[3];
      }
    }
  }

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var TIME_IN_OUT = ['12:00', '13:00', '14:00'];

  timeIn.addEventListener('change', synchronizeInTimes);
  timeOut.addEventListener('change', synchronizeOutTimes);
  synchronizeInTimes();
  synchronizeOutTimes();

  function synchronizeInTimes() {
    for (var i = 0; i < timeIn.length; i++) {
      if (timeIn.querySelector('[value="' + TIME_IN_OUT[0] + '"]').selected) {
        timeOut.querySelector('[value="' + TIME_IN_OUT[0] + '"]').selected = true;
      } else if (timeIn.querySelector('[value="' + TIME_IN_OUT[1] + '"]').selected) {
        timeOut.querySelector('[value="' + TIME_IN_OUT[1] + '"]').selected = true;
      } else if (timeIn.querySelector('[value="' + TIME_IN_OUT[2] + '"]').selected) {
        timeOut.querySelector('[value="' + TIME_IN_OUT[2] + '"]').selected = true;
      }
    }
  }

  function synchronizeOutTimes() {
    for (var j = 0; j < timeOut.length; j++) {
      if (timeOut.querySelector('[value="' + TIME_IN_OUT[0] + '"]').selected) {
        timeIn.querySelector('[value="' + TIME_IN_OUT[0] + '"]').selected = true;
      } else if (timeOut.querySelector('[value="' + TIME_IN_OUT[1] + '"]').selected) {
        timeIn.querySelector('[value="' + TIME_IN_OUT[1] + '"]').selected = true;
      } else if (timeOut.querySelector('[value="' + TIME_IN_OUT[2] + '"]').selected) {
        timeIn.querySelector('[value="' + TIME_IN_OUT[2] + '"]').selected = true;
      }
    }
  }

  var roomsSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');

  var ROOM_CAPACITY_SYNC = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  roomsSelect.addEventListener('change', synchronizeRooms);
  synchronizeRooms();

  function synchronizeRooms() {
    var roomsValue = roomsSelect.value;
    var availableCapacities = ROOM_CAPACITY_SYNC[roomsValue];
    var currentActiveCapacity = capacitySelect.querySelector('option[selected]');

    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].disabled = (availableCapacities.indexOf(capacityOptions[i].value) === -1);
    }

    if (currentActiveCapacity.disabled) {
      capacitySelect.querySelector('option[value="' + availableCapacities[0] + '"]').selected = true;
    }
  }
}) ();
