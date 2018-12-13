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


var pinWidth = 62;
var pinHeight = 84;

function getRandomFromRange(min, max){
  return (min + Math.floor(Math.random()*(max-min) + 1));
}

function generateOffers(count){
  var result = [];

	for (var i = 1; i <= count; i++){
		result.push(getOffer(i));
  }

	return result;

  function getOffer(index)
  {
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

    function getOfferFeatures () {
      var result = [];
      var featuresClone = offersFeatures.slice();
      var featuresCount = getRandomFromRange(0, featuresClone.length - 1);

      for (var i = 0; i < featuresCount; i++){
      result.push(featuresClone.splice(getRandomFromRange(0, featuresClone.length - 1), 1)[0]);
      }
      return result;
    }
	}
}

var pinTpl = document.querySelector('#pin').content.querySelector('.map__pin');
var container = document.querySelector('.map__pins');

var fragment = document.createDocumentFragment();

function createPins(offers) {

  for (var i = 0; i < offers.length; i++) {
   generateOnePin(offers[i]);
  }

  function generateOnePin(offer) {
    var pin = pinTpl.cloneNode(true);
    var pinImg = pin.querySelector('img');
    pinImg.src = offer.author.avatar;
    pinImg.alt = offer.offer.title;
    pin.style = 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px';
    fragment.appendChild(pin);
  }

  container.appendChild(fragment);
}

var cardTpl = document.querySelector('#card').content.querySelector('.popup');
var map = document.querySelector('.map');
var filtersContainer = document.querySelector('.map__filters-container');

function generateCard(offers) {

    generateOneCard(offers[0]);

function generateOneCard(offer) {
  var card = cardTpl.cloneNode(true);
  cardTpl.querySelector('.popup__title').textContent = offer.offer.title;
  cardTpl.querySelector('.popup__text--address').textContent = offer.offer.address;
  cardTpl.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
  cardTpl.querySelector('.popup__type').textContent = getType();
  cardTpl.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  cardTpl.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  cardTpl.querySelector('.popup__features').textContent = offer.offer.features;
  cardTpl.querySelector('.popup__description').textContent = offer.offer.description;
  cardTpl.querySelector('.popup__photos').querySelector('img').src = offer.offer.photos;
  cardTpl.querySelector('.popup__avatar').src = offer.author.avatar;

  function getType() {
  var type = offer.offer.type;
    if (type === 'palace') {
      type = 'Дворец';
    } else if (type === 'flat') {
      type = 'Квартира';
    } else if (type === 'house') {
      type = 'Дом';
    } else if (type === 'bungalo') {
      type = 'Бунгало';
    };

  return type
  }

  map.insertBefore(card, filtersContainer);
  }
}

newOffers = generateOffers(OFFERS_COUNT);
createPins (newOffers);
generateCard (newOffers)
