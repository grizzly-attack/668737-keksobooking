'use strict';

(function () {
  var MIN_PRICES = ['0', '1000', '5000', '10000'];
  var TYPE_OPTIONS = ['bungalo', 'flat', 'house', 'palace'];
  var TIME_IN_OUT = ['12:00', '13:00', '14:00'];

  var ROOMS_CAPACITIES_SYNC = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');

  typeSelect.addEventListener('change', generteMinPrice);
  generteMinPrice();

  function generteMinPrice() {

    for (var i = 0; i < typeSelect.length; i++) {
      if (typeSelect.querySelector('[value="' + TYPE_OPTIONS[0] + '"]').selected) {
        priceInput.min = MIN_PRICES[0];
        priceInput.placeholder = MIN_PRICES[0];
      } else if (typeSelect.querySelector('[value="' + TYPE_OPTIONS[1] + '"]').selected) {
        priceInput.min = MIN_PRICES[1];
        priceInput.placeholder = MIN_PRICES[1];
      } else if (typeSelect.querySelector('[value="' + TYPE_OPTIONS[2] + '"]').selected) {
        priceInput.min = MIN_PRICES[2];
        priceInput.placeholder = MIN_PRICES[2];
      } else if (typeSelect.querySelector('[value="' + TYPE_OPTIONS[3] + '"]').selected) {
        priceInput.min = MIN_PRICES[3];
        priceInput.placeholder = MIN_PRICES[3];
      }
    }
  }

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

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

  roomsSelect.addEventListener('change', synchronizeRooms);
  synchronizeRooms();

  function synchronizeRooms() {
    var roomsValue = roomsSelect.value;
    var availableCapacities = ROOMS_CAPACITIES_SYNC[roomsValue];
    var currentActiveCapacity = capacitySelect.querySelector('option[selected]');

    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].disabled = (availableCapacities.indexOf(capacityOptions[i].value) === -1);
    }

    if (currentActiveCapacity.disabled) {
      capacitySelect.querySelector('option[value="' + availableCapacities[0] + '"]').selected = true;
    }
  }
})();
