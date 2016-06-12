$(document).ready(function() {

  var removeButtons = $('.cars-remove');

  function removeCar(event) {
    var id = $(this).data('car');

    $.ajax({
      url: `/cars/${id}`,
      method: 'delete',
    }).then(function (res) {
      if (res !== 'OK') return;

      $('.panel[data-car=' + id + ']').remove();
    });
  };

  removeButtons.on('click', removeCar);
});
