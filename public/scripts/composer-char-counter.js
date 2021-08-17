$(document).ready(function () {
  let num = 0;
  $('textarea').on('input', function () {
    num = $(this).val().length;
    $(this).closest('section').find('output').html(`${140 - num}`).removeClass('warning');
    if (num > 140) {
      $(this).closest('section').find('output').addClass('warning');
    }
  })
  console.log('hello');

});