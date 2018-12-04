'use strict';

var OFFERS_COUNT = 8;
var offers = generateOffers(OFFERS_COUNT);

var offersTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offersType = ['palace', 'flat', 'house', 'bungalo'];
var offersCheckin = ['12:00', '13:00', '14:00'];
var offersCheckout = ['12:00', '13:00', '14:00'];
var offersFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offersPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function generateOffers(count){
	var result = [];

	for (var i = 1; i <= count; i++){
		result.push(getOffer[i]);
	}

	return result;

	function getOffer(index){

		return {
			'author': {
				'avatar': 'img/avatars/user' + getTwoDigits(index) + '.png'
			},
			'offer': {
        'title': getOfferTitle(),
        'address': getAdressX() + getAdressY(),
        'price': getOfferPrice(),
        'type': getOfferType(),
        'rooms': getOfferRooms(),
        'guests': getOfferGuests(),
        'checkin': getOfferCheckin(),
        'checkout': getOfferCheckout(),
        'features': getOfferFeatures(),
        'description': ' ',
        'photos': getOfferPhotos()
      },
      'location': {
        'x': getLocationX(),
        'y': getLocationY()
      }
		};

		function getTwoDigits(number) {
			return (number < 10) ? '0' + number : number;
		}
		function getOfferTitle() {
			return offersTitles.splice(getRandomFromRange(0, offersTitles.length - 1), 1);
    }

    function getOfferPrice() {
      return getRandomFromRange(1000, 1000000);
    }

    function getOfferType() {
      return offersType[getRandomFromRange(0, offersType.length)];
    }

    function getOfferRooms() {
      return getRandomFromRange(1, 5);
    }

    function getOfferGuests() {
      return getRandomFromRange(1, 10);
    }

    function getOfferCheckin() {
      return offersCheckin[getRandomFromRange(0, offersCheckin.length)];
    }

    function getOfferCheckout() {
      return offersCheckout[getRandomFromRange(0, offersCheckout.length)];
    }

    function getOfferPhotos() {
      return offersPhotos.sort();
    }

    function getAdressX (sum) {
      sum =  getRandomFromRange(0, 1200) + ', '
      return sum;
    }

    function getAdressY () {
      return getRandomFromRange(0, 750);
    }

    function getLocationX () {
      return getRandomFromRange(0, 1200);
    }

    function getLocationY () {
      return getRandomFromRange(130, 630);
    }

    function getOfferFeatures () {
      var random = getRandomFromRange(0, offersFeatures.length);
      var randomArr =[];
      for (var i = 0; i <= random; i++) {
        randomArr[i]= offersFeature[i];
      }
      return randomArr;
    }

	}

	function getRandomFromRange(min, max){
		return (min + Math.floor(Math.random()*(max-min) + 1));
  }
}

