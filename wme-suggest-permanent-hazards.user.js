// ==UserScript==
// @name         WME Suggest Permanent Hazards
// @namespace    https://github.com/WazeDev/wme-suggest-permanent-hazards
// @version      0.0.1
// @description  Allow lower map editors to add a map note for a permanent hazard.
// @author       Gavin Canon-Phratsachack (https://github.com/gncnpk)
// @match        https://beta.waze.com/*editor*
// @match        https://www.waze.com/*editor*
// @exclude      https://www.waze.com/*user/*editor/*
// @exclude      https://www.waze.com/discuss/*
// @license      MIT
// @grant        none
// @require https://cdn.jsdelivr.net/gh/WazeSpace/wme-sdk-plus@06108853094d40f67e923ba0fe0de31b1cec4412/wme-sdk-plus.js
// ==/UserScript==

(function() {
    'use strict';
    window.SDK_INITIALIZED.then(initialize);
    let sdk;
    let sdkPlus;
    let wmeSdk;
    async function initialize() {
  wmeSdk = await getWmeSdk({ scriptId: "wme-suggest-permanent-hazards", scriptName: "WME Suggest Permanent Hazards" }); // Assuming getWmeSdk is your method to get the native SDK.
  sdkPlus = await initWmeSdkPlus(wmeSdk, {
      hooks:["DataModel.MapComments"]
  });
  sdk = sdkPlus || wmeSdk;
  sdk.Shortcuts.createShortcut({callback: function() {createSpeedBumpMapNote()}, description:"Create Speed Bump Note", shortcutId:"create-speed-bump-note",shortcutKeys:null})
}
 async function createSpeedBumpMapNote() {
     const point = await sdk.Map.drawPoint();
     await sdk.DataModel.MapComments.addMapComment({geometry: point, subject: "Speed Bump", body:"Add a speed bump permanent hazard here, once added, delete this map comment."})
 }
})();
