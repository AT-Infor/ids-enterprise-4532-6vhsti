//Create a dialog on button click
$('#button-modal').on('click', function() {
  console.log('Creating dialog-modal-1');
  showDialog(
    'modal1',
    'Modal 1',
    '<p>This is the first message</p>',
    'Close (Triggers opening of another dialog)'
  );
});

function showDialog(modalId, modalTitle, message, buttonText) {
  var modal = $('body').message({
    title: modalTitle,
    message: message,
    buttons: [
      {
        text: buttonText,
        click: function(e, modal) {
          modal.close();
        }
      }
    ]
  });

  var data = $('.modal.message').data('modal');
  attachEventHandlers(modalId, modalTitle, data.element);
}

//Logging details of the dialog
function attachEventHandlers(modalId, modalTitle, modalElement) {
  modalElement.on('open.' + modalId, function() {
    toast(modalTitle + ' : open');
    console.log(modalTitle + ' : open');
  });
  modalElement.on('beforeclose.' + modalId, function() {
    toast(modalTitle + ' : beforeclose');
    console.log(modalTitle + ' : beforeclose');

    if (modalTitle === 'Modal 1') {
      console.log('Creating dialog-modal-2');
      showDialog(
        'modal2',
        'Modal 2',
        '<p>This is the second message</p>',
        'Close'
      );
    }

    return true;
  });
  modalElement.on('close.' + modalId, function() {
    toast(modalTitle + ' : close');
    console.log(modalTitle + ' : close');
  });
  modalElement.on('afterclose.' + modalId, function() {
    toast(modalTitle + ' : afterclose');
    console.log(modalTitle + ' : afterclose');

    modalElement.off('open.' + modalId);
    modalElement.off('beforeclose.' + modalId);
    modalElement.off('close.' + modalId);
    modalElement.off('afterclose.' + modalId);
  });
}

//create toast message
function toast(message) {
  $('body').toast({
    title: '',
    message: message,
    timeout: 3000
  });
}
