$.ajax({
  url: 'https://localhost:1243/' + window.location.host.replace('www.', '') + '.css',
  dataType: 'text',
  success: function (data) {
    var head = $("head");
    $('<style></style>').appendTo(head).text(data);
  },
  error: function() {
    console.log("No dotcss server found at localhost:1243");
  }
});
