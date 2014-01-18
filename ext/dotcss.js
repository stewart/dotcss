var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:1243/' + window.location.host.replace(/^www\./, '') + '.css');

xhr.onreadystatechange = function() {
  if(xhr.readyState !== 4) {
    return;
  } else if(xhr.status !== 200) {
    throw new Error('No dotcss server found at localhost:1243');
  }

  var style = document.createElement('style');
  style.textContent = xhr.responseText;
  document.head.appendChild(style);
};

xhr.send();