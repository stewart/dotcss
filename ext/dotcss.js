$.ajax({
  url: 'http://localhost:1243/' + window.location.host.replace('www.', '') + '.css',
  dataType: 'text',
  success: function (data) {
    var body = $("body");
    $('<style></style>').appendTo(body).text(data);
  },
  error: function() {
    console.log("No dotcss server found at localhost:1243");
  }
});
