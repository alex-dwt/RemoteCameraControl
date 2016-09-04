/*
 * This file is part of the RemoteCameraControl package.
 * (c) Alexander Lukashevich <aleksandr.dwt@gmail.com>
 * For the full copyright and license information, please view the LICENSE file that was distributed with this source code.
 */

'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import HttpException from './http_exception'
import Camera from './camera'

let app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

	if (req.method.toLowerCase() === 'options') {
		res.status(204).send();
	} else {
		next();
	}
});

/**
 * Get
 */
app.get('/camera', (req, res, next) => {
	Camera.getVideo(req, res);
});

/**
 * Start
 */
app.put('/camera', (req, res, next) => {
	Camera.start();
	res.json({ success: true });
});

/**
 * Stop
 */
app.delete('/camera', (req, res, next) => {
	Camera.stop();
	res.json({ success: true });
});

/**
 * Errors handlers
 */
app.use((req, res, next) => {
    next(new HttpException(404, 'Url does not exist'));
});

app.use((err, req, res, next) => {
	if (err instanceof HttpException) {
		res.status(err.code).json(err);
	} else {
		console.error(err.stack);
		res.status(500).end();
	}
});

app.listen(80);