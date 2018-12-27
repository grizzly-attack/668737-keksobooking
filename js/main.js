'use strict';

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
      var popup = map.querySelector('.popup');

      if (popup) {
        popup.parentElement.removeChild(popup);
      }
    }

    pin.addEventListener('click', function () {
      removeCard();
      generateCard(offer);
    });

    fragment.appendChild(pin);
  }

  container.appendChild(fragment);
}

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

newOffers = generateOffers(OFFERS_COUNT);

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
  createPins(newOffers);

  for (i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = false;
  }

  for (i = 0; i < filterFieldsets.length; i++) {
    filterFieldsets[i].disabled = false;
  }

  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  address.value = getPinCoordinates(MAIN_PIN_LEFT, MAIN_PIN_TOP, PIN_TAIL);

  pinMain.removeEventListener('mouseup', onPinMainMouseup);
}

pinMain.addEventListener('mouseup', onPinMainMouseup);

function generteMinPrice() {
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var selind = type.options.selectedIndex;

  switch (selind) {
    case 0:
      price.min = '0';
      price.placeholder = '0';
      break;
    case 1:
      price.min = '1000';
      price.placeholder = '1000';
      break;
    case 2:
      price.min = '5000';
      price.placeholder = '5000';
      break;
    case 3:
      price.min = '10000';
      price.placeholder = '10000';
  }
}

generteMinPrice();

function synchronizeRooms() {
  var rooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var roomind = rooms.options.selectedIndex;

  switch (roomind) {
    case 0:
      capacity.options[2].disabled = false;
      break;
    case 1:
      capacity.options[1].disabled = false;
      break;
    case 2:
      capacity.options[0].disabled = false;
      break;
    case 3:
      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[2].disabled = true;
      capacity.options[3].disabled = false;
  }
}

synchronizeRooms();
