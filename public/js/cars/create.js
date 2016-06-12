$(document).ready(function() {

  $('.input-group.date').datepicker({
    startView: 2,
    orientation: 'bottom auto'
  });

  var owner = $('#owner');
  var displayOwnerName = $('#displayOwnerName');
  var selectOwnerBtn = $('#selectOwnerBtn');
  var selectOwnerModal = $('#selectOwnerModal');
  selectOwnerModal.modal({
    show: false,
  });
  var selectOwnerBody = $('#selectOwnerBody');
  var car = {
    owners: [],
  };

  function showOwnerModal(event) {
    selectOwnerModal.modal('show');
  }

  function selectOwner(event) {
    var id = $(this).data('owner');
    owner.val(id);
    var o = car.owners.filter((o) => o._id === id)[0];
    displayOwnerName.val(`${o.firstName} ${o.lastName}`);
    selectOwnerModal.modal('hide');
  }

  $.ajax({
    url: '/owner',
    method: 'GET',
  }).then(function (owners) {
    car.owners = owners;
    var template = '<ul class="list-group">';

    owners.forEach(function (owner) {
      template += `<li class="list-group-item clearfix">
                    <b>${owner.firstName} ${owner.lastName}</b> ${owner.phone}
                    <button type="button" class="btn btn-sm btn-default pull-right owner-select-btn" data-owner="${owner._id}">
                      <i class="fa fa-hand-pointer-o"></i>
                      <span class="hide-xs">&nbsp;Select</span>
                    </button>
                  </li>`;
    });

    template += '</ul>';
    selectOwnerBody.append(template);

    $('.owner-select-btn').on('click', selectOwner);

    selectOwnerBtn.on('click', showOwnerModal);
  });
});
