'use strict';

var OFFERS_COUNT = 8;
var offers = generateOffers(OFFERS_COUNT);

var priceMin = 1000;
var priceMax = 1000000;
var roomMin = 1
var roomMax = 5;
var guestsMin = 1;
var guestsMax = 10;
var coordXMin = 0;
var coordXMax = 1200;
var coordYMin = 130;
var coordYMax = 630;

var coordX = getRandomFromRange(coordXMin, coordXMax);
var coordY = getRandomFromRange(coordYMin, coordYMax);

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
		result.push(getOffer[i]);
  }

	return result;

	function getOffer(index) {

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


var pins = document.querySelector('#pin').content.querySelector('button');
var container = document.querySelector('.map__pins');
//var pinImg = document.querySelector('#pin').content.querySelector('img');


var createNewElement = function() {

  for (var i = 0; i < offers.length; i++) {
    var pin = offers[i];
    pin = pins.cloneNode(true);
    container.appendChild(pin);
  }

  var coordPinX = this.x + pinWidth / 2;
  var coordPinY = this.y + pinHeight;
  var coordPin = 'left: ' + coordPinX + 'px; top: ' + coordPinY + 'px';

  pin.style = coordPin;

  return pin;
}

createNewElement()
