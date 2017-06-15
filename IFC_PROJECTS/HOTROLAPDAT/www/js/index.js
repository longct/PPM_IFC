/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var model;
var cordova;
var platform;
var uuid;
var version;
var deviceInfo;
var simInfo;
var intervals = [];
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener("backbutton", onBackKeyDown, false);
        function onBackKeyDown() {
            $('.modal').modal('hide');
        }
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            deviceInfo = {
                model: device.model,
                uuid: device.uuid,
                platform: device.platform
            }

            localStorage.setItem("DEVICE", (JSON.stringify(deviceInfo)));
            window.plugins.sim.getSimInfo(successCallback, errorCallback);
        }
        function successCallback(result) {
            localStorage.setItem("SIM",(JSON.stringify(result)));
        }
        function errorCallback(error) {
            alert(JSON.stringify(result));
        }
        //document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
      
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        deviceInfo = {
            model: device.model,
            uuid: device.uuid,
            platform: device.platform
        }

    }
};

app.initialize();

function callLoad() {
    $("#loading_over").show();
    $(".huyload").click(function () {
        stopLoad();
    })
}
function stopLoad() {
    $("#loading_over").fadeOut();
}
function callProcess(div) {
    $(".process_img").remove();
    $("." + div).append('<div class="process_img"></div>');
    $(".process_img").css("width", $("." + div).width());
    $(".process_img").css("margin-top", -($("." + div).height()));
    $(".process_img").css("height", $("." + div).height());
    //$(".process_img").click(function () {
    //    stopProcess("process_img");
    //})
}
function stopProcess(div) {
    $(".process_img").fadeOut();
}
function clearTimer() {
    console.log("XÓA");
    intervals.forEach(clearInterval);
}