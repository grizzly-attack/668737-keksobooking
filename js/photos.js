'use strict';
(function () {
  var PREVIEW_WIDTH = 70;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var userPhotoChooser = document.querySelector('.ad-form-header__upload input[type=file]');
  var housingPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var imgContainer = document.querySelector('.ad-form__photo');

  function renderImg(preview, chooser) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function onUserPhotoChooserChanged() {
    var userPhoto = document.querySelector('.ad-form-header__preview img');

    renderImg(userPhoto, userPhotoChooser);
  }

  function onHousingPhotoChooserChanged() {
    var img = document.createElement('img');
    img.width = PREVIEW_WIDTH;

    while (imgContainer.firstChild) {
      imgContainer.removeChild(imgContainer.firstChild);
    }

    imgContainer.appendChild(img);

    renderImg(img, housingPhotoChooser);
  }

  userPhotoChooser.addEventListener('change', onUserPhotoChooserChanged);
  housingPhotoChooser.addEventListener('change', onHousingPhotoChooserChanged);
})();
