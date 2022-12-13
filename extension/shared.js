var base_url = "http://127.0.0.1:8783";
var DEBUG = 0;   // set to '1' to see console logging
var logger = () => { if (DEBUG) console.log.apply(console, arguments); };


function req(uri, data) {
  let url = base_url + uri;

  let opts = {
    method: 'GET',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  };

  if (data) {
    opts.method = 'POST';
    opts.body = data;
  };

  fetch(url, opts)
    .then(res => res.text())
    .then(res => logger('Response: ', res))
    .catch(err => logger('Error message: ', err));
}
