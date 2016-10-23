var express = require('express');
var app = express();
var Dropbox = require('dropbox');
var Dropbox = require('../../src/dropbox');
var fs = require('fs');
var prompt = require('prompt');
var dbx = new Dropbox({ accessToken: 'knHVpSSQbDQAAAAAAAAPqo6qOVGouap_XreTatmJmnkoV_5ToLp7YerPawEsWHJl' });
dbx.filesListFolder({path: ''})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


prompt.start();

prompt.get({
  properties: {
    accessToken: {
      description: 'knHVpSSQbDQAAAAAAAAPqo6qOVGouap_XreTatmJmnkoV_5ToLp7YerPawEsWHJl'
    },
    sharedLink: {
      description: 'Please enter a shared link to a file'
    }
  }
}, function (error, result) {
  var dbx = new Dropbox({ accessToken: result.accessToken });
  dbx.sharingGetSharedLinkFile({ url: result.sharedLink })
    .then(function (data) {
      fs.writeFile(data.name, data.fileBinary, 'binary', function (err) {
        if (err) { throw err; }
        console.log('File: ' + data.name + ' saved.');
      });
    })
    .catch(function (err) {
      throw err;
    });
});
