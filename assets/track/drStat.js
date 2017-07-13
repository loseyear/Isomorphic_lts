'use strict';

(function (root, factory) {
  var drStat = factory(root);
  if (typeof define === 'function' && define.amd) {
    define('drStat', function() { return drStat; });
  } else if (typeof exports === 'object') {
    module.exports = drStat;
  } else {
    root.drStat = drStat;
  }
})(this, function () {
  var m = {};
  m.track = function(params, cb) {
    var url = 'http://172.25.47.49:8889/api/track';
    const bodies = [];
    Object.entries(params).forEach(
      ([k, v]) => {
        if (v) bodies.push(`${k}=${v.toString()}`);
      },
    );

    url = url + (url.indexOf('?') == -1 ? '?' : '&') + bodies.join('&');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        var data = xhr.responseText;
        try {
          data = JSON.parse(data);
        } catch (exc) {
          data = JSON.parse(exc);
        }
        if(cb) {
          cb(data);
        }
      }
    }
    xhr.send();
  }

  return m;
});
var timer = true;
window.onerror = function (errMsg, errUri, errLine, errColumn, errError) {
  var opt = {
    proUri: window.location.host,
    proTitle: document.title,
    errMsg: errMsg,
    errUri: errUri,
    errLine: errLine,
    errColumn: errColumn,
    errError: errError,
    errUserTime: Date.parse(new Date()),
  }

  timer === true ? drStat.track(opt) & (timer = false) : '';
}

