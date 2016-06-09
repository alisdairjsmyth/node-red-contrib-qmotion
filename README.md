# node-red-contrib-qmotion
A <a href="http://nodered.org" target="_new">Node-RED</a> node to control QMotion blinds using a QSync device

Install
-------
Run the following command in the root directory of your Node-RED install
    npm install node-red-contrib-qmotion

Usage
-----
This node sends commands to a QMotion blind via a QSync device.  It is configured with the following properties:
* IP: the IP address of the QSync device
* debug: enables debugging within qmotion package

It receives input messages containing:
* channel: identifier of the blind
* blindPosition: the new position of the blind

The commands are submitted to the QSync device using the <a hred"https://www.npmjs.com/package/qmotion">qmotion</a> package published by <a href="https://www.npmjs.com/~devbobo">devbobo</a>.  It should be noted the qmotion package has been developed based on observations rather than a published API.  The QSync device then interacts with the blinds over 433MHz RF.
