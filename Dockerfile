# This file is part of the RemoteCameraControl package.
# (c) Alexander Lukashevich <aleksandr.dwt@gmail.com>
# For the full copyright and license information, please view the LICENSE file that was distributed with this source code.

FROM ubuntu
MAINTAINER Alexander Lukashevich <aleksandr.dwt@gmail.com>

RUN apt-get update && apt-get install -y nodejs npm libjpeg8-dev
RUN ln -s /usr/bin/nodejs /usr/bin/node

ENV LD_LIBRARY_PATH /mjpg-streamer/
ENV IN_PARAM "input_uvc.so -d /dev/video0 -y"
ENV OUT_PARAM "output_http.so -p 6100"

COPY ./build/* /mjpg-streamer/
RUN chmod +x /mjpg-streamer/*

WORKDIR /remote-camera-control
COPY ./server/* /remote-camera-control/
RUN npm install

CMD ["npm","start"]