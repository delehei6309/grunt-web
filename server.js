/**
 * Edit by chunting on 2018/6/28.
 */
var path = require('path');
var express = require('express');
var app = express();
app.use('/public', express.static(path.resolve('./src')));
var port = 8086;
app.get('/*', function (req, res) {
	let param = req.params[0];
    res.sendFile(path.resolve(`./src/html/${param}.html`));
});
app.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {

        console.info("==>  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});