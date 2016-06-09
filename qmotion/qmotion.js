/**
 * Copyright 2016 Alisdair Smyth
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
module.exports = function (RED) {
    "use strict";

    function validateMsg(node, msg) {
        var validMsg = true;
        var msgProperty = [
            "channel",
            "blindPosition"
        ];

        if (!(typeof msg.payload === "object")) {
            node.error("qmotion.error.invalid-msg-payload", msg);
            validMsg = false;
        } else {
            var i;

            for (i in msgProperty) {
                if (!(msgProperty[i] in msg.payload)) {
                    node.error("qmotion.error.property-" + msgProperty[i] + "-missing", msg);
                    validMsg = false;
                }
            }
            if (validMsg) {
                if ((typeof msg.payload.channel != "number")) {
                    node.error("qmotion.error.invalid-channel: " + msg.payload.channel, msg);
                    validMsg = false;
                }
                if ((typeof msg.payload.blindPosition != "number") ||
                    (msg.payload.blindPosition < 0) ||
                    (msg.payload.blindPosition > 100)) {
                    node.error("qmotion.error.invalid-blindChannel: " + msg.payload.blindPosition, msg);
                    validMsg = false;
                }
            }
        }
    }

    function qmotion(config) {
        RED.nodes.createNode(this, config);
        this.ip    = config.ip;

        var qsync  = require('qmotion');

        try {
            var device = new qsync(this.ip);
        }
        catch (err) {
            this.error(err);
        }

        this.on('input', function (msg) {
            if (validateMsg(this, msg)) {
                var blind = device.blinds(msg.payload.channel);
                blind.move(msg.payload.blindPosition);
            }
        });
    }

    RED.nodes.registerType("qmotion", qmotion);
}