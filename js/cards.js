'use strict';

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
        if (features != null && features.length > 0) {
          fragment.appendChild(getFeature(features[i]));
        } else {
          block.parentNode.removeChild(block);
        }
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
        if (imgs != null && imgs.length > 0) {
          fragment.appendChild(generatePhoto(imgs[i]));
        } else {
          photoPopup.parentNode.removeChild(photoPopup);
        }
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
})();
