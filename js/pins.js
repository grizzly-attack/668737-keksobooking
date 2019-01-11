'use strict';

(function () {
  var MAX_PINS_COUNT = 5;
  var DEBOUNCE_INTERVAL = 500;

  var Price = {
    'low': 10000,
    'middle': 50000
  };

  var pinTpl = document.querySelector('#pin').content.querySelector('.map__pin');
  var container = document.querySelector('.map__pins');

  var dataOffers = [];
  initFilterForm();

  function createPins(offers) {
    dataOffers = offers;
    generatePins(offers);
  }

  function generatePins(offers) {
	  var pins = container.querySelectorAll('.map__pin:not([class*="map__pin--main"])');
    var fragment = document.createDocumentFragment();

    pins.forEach(function (pin) {
      pin.parentNode.removeChild(pin);
    });
    removeCard();

    for (var i = 0; i < Math.min(offers.length, MAX_PINS_COUNT); i++) {
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

      pin.addEventListener('click', function (evt) {
        removeCard();
        window.cards.generateCard(offer);
        evt.target.classList.add('map__pin--active');
      });

      fragment.appendChild(pin);
    }

    function removeCard() {
      var popup = window.cards.map.querySelector('.popup');
      var activePin = window.cards.map.querySelector('.map__pin--active');

      if (popup) {
        popup.parentElement.removeChild(popup);
      }

      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
    }
    container.appendChild(fragment);
  }

  function initFilterForm() {
    var filterform = document.querySelector('.map__filters');
    var typeSelect = filterform.querySelector('#housing-type');
    var priceSelect = filterform.querySelector('#housing-price');
    var roomsSelect = filterform.querySelector('#housing-rooms');
    var guestsSelect = filterform.querySelector('#housing-guests');
    var featuresCheckboxes = filterform.querySelectorAll('[name="features"]');

    typeSelect.addEventListener('change', onFilterChanged);
    priceSelect.addEventListener('change', onFilterChanged);
    roomsSelect.addEventListener('change', onFilterChanged);
    guestsSelect.addEventListener('change', onFilterChanged);

    featuresCheckboxes.forEach(function (checkbox) {
      checkbox.addEventListener('change', onFilterChanged);
    });

    function onFilterChanged() {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      var lastTimeout = window.setTimeout(function () {
        var values = {
          type: typeSelect.value,
          price: priceSelect.value,
          rooms: roomsSelect.value,
          guests: guestsSelect.value,
          features: getCheckedFeatures()
        };

        generatePins(getFilteredOffers());

        function getFilteredOffers() {
          return dataOffers
            .filter(function (offer) {
              return offer.offer.type === values.type || values.type === 'any';
            })
            .filter(function (offer) {
              return checkFilterPrice(offer.offer.price, values.price);
            })
            .filter(function (offer) {
              return offer.offer.rooms === parseInt(values.rooms, 10) || values.rooms === 'any';
            })
            .filter(function (offer) {
              return offer.offer.guests === parseInt(values.guests, 10) || values.guests === 'any';
            })
            .filter(function (offer) {
              return checkFilterFeatures(offer.offer.features, values.features);
            });
          }

        function checkFilterFeatures(offerFeatures, filterFeatures) {
          var isSuitable = true;

          for (var i = 0; i < filterFeatures.length; i++) {
            if (offerFeatures.indexOf(filterFeatures[i]) === -1) {
              isSuitable = false;
              break;
            }
          }

          return isSuitable;
        }

        function checkFilterPrice(offerPrice, filterValue) {
          switch (filterValue) {
            case 'low':
              return offerPrice < Price.low;
            case 'middle':
              return offerPrice > Price.low && offerPrice < Price.middle;
            case 'high':
              return offerPrice > Price.middle;
            default:
            return true;
          }
        }

        function getCheckedFeatures() {
          var result = [];

          featuresCheckboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
              result.push(checkbox.value);
            }
          });

          return result;
        }
      },
      DEBOUNCE_INTERVAL);
    }
  }

  window.pins = {
    createPins: createPins,
  };
})();
