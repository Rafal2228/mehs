$(document).ready(function() {

  var removeButtons = $('.owners-remove');

  function removeOwner(event) {
    if (!confirm('Removing the owner will also delete all his cars. Are you sure?')) {
      return;
    }

    var id = $(this).data('owner');

    $.ajax({
      url: `/owner/${id}`,
      method: 'delete',
    }).then(function (res) {
      if (res !== 'OK') return;

      $('.list-group-item[data-owner=' + id + ']').remove();
    });
  };

  removeButtons.on('click', removeOwner);

});
