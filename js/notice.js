'use strict';

(function () {
  var TYPES_PRICES_SYNC = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var ROOMS_CAPACITIES_SYNC = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');

  typeSelect.addEventListener('change', onHouseTypeChanged);
  onHouseTypeChanged();

  function onHouseTypeChanged() {
    var typeValue = typeSelect.value;
    priceInput.min = TYPES_PRICES_SYNC[typeValue];
    priceInput.placeholder = TYPES_PRICES_SYNC[typeValue];
  }

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeIn.addEventListener('change', onTimeChanged);
  timeOut.addEventListener('change', onTimeChanged);
  onTimeChanged();

  function onTimeChanged(evt) {
    if (evt && evt.target === timeIn) {
      timeOut.value = timeIn.value;
    } else {
      timeIn.value = timeOut.value;
    }
  }

  var roomsSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');

  roomsSelect.addEventListener('change', onRoomsChanged);
  onRoomsChanged();

  function onRoomsChanged() {
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
