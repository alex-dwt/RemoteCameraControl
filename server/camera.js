/*
 * This file is part of the RemoteCameraControl package.
 * (c) Alexander Lukashevich <aleksandr.dwt@gmail.com>
 * For the full copyright and license information, please view the LICENSE file that was distributed with this source code.
 */

import {execSync} from 'child_process';
import request from 'request';

const PATH = '/mjpg-streamer';
const FILE = 'mjpg_streamer';

export default class {
	static getVideo(req, res) {
		req.pipe(
			request(
				{ url: 'http://localhost:6100/?action=stream' },
				(error, response, body) => {
					// You should enable the camera at first
					res.status(503).send();
				}
			)
		).pipe(res);
	}

	static start() {
		kill();
		execSync(`/bin/sh -c "${PATH}/${FILE} -b -i \\"$IN_PARAM\\" -o \\"$OUT_PARAM\\""`);
	}

	static stop() {
		kill();
	}
}

function kill() {
	execSync(`pkill ${FILE}; exit 0`);
}