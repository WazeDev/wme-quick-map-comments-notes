// ==UserScript==
// @name         WME Suggest Permanent Hazards
// @namespace    https://github.com/WazeDev/wme-suggest-permanent-hazards
// @version      0.0.3
// @description  Allow lower level map editors to add a map note for a permanent hazard.
// @author       Gavin Canon-Phratsachack (https://github.com/gncnpk)
// @match        https://beta.waze.com/*editor*
// @match        https://www.waze.com/*editor*
// @exclude      https://www.waze.com/*user/*editor/*
// @exclude      https://www.waze.com/discuss/*
// @license      MIT
// @grant        none
// @require https://cdn.jsdelivr.net/gh/WazeSpace/wme-sdk-plus@06108853094d40f67e923ba0fe0de31b1cec4412/wme-sdk-plus.js
// @downloadURL https://update.greasyfork.org/scripts/538361/WME%20Suggest%20Permanent%20Hazards.user.js
// @updateURL https://update.greasyfork.org/scripts/538361/WME%20Suggest%20Permanent%20Hazards.meta.js
// ==/UserScript==

(function() {
    'use strict';
    window.SDK_INITIALIZED.then(initialize);
    let sdk;
    let sdkPlus;
    let wmeSdk;
    async function initialize() {
        wmeSdk = await getWmeSdk({
            scriptId: "wme-suggest-permanent-hazards",
            scriptName: "WME Suggest Permanent Hazards"
        }); // Assuming getWmeSdk is your method to get the native SDK.
        sdkPlus = await initWmeSdkPlus(wmeSdk, {
            hooks: ["DataModel.MapComments"]
        });
        sdk = sdkPlus || wmeSdk;
        addShortcuts();
    }
    async function addShortcuts() {
        sdk.Shortcuts.createShortcut({
            callback: function() {
                createSpeedBumpMapNote()
            },
            description: "Create Speed Bump Note",
            shortcutId: "create-speed-bump-note",
            shortcutKeys: null
        })
        sdk.Shortcuts.createShortcut({
            callback: function() {
                createRailroadCrossingNote()
            },
            description: "Create Railroad Crossing Note",
            shortcutId: "create-railroad-crossing-note",
            shortcutKeys: null
        })
        sdk.Shortcuts.createShortcut({
            callback: function() {
                createSharpCurveNote()
            },
            description: "Create Sharp Curve Note",
            shortcutId: "create-sharp-curve-note",
            shortcutKeys: null
        })
        sdk.Shortcuts.createShortcut({
            callback: function() {
                createComplexIntersectionNote()
            },
            description: "Create Complex Intersection Note",
            shortcutId: "create-complex-intersection-note",
            shortcutKeys: null
        })
        sdk.Shortcuts.createShortcut({
            callback: function() {
                createMultipleLanesMergingNote()
            },
            description: "Create Multiple Lanes Merging Note",
            shortcutId: "create-multiple-lanes-merging-note",
            shortcutKeys: null
        })
        sdk.Shortcuts.createShortcut({
            callback: function() {
                createTollboothNote()
            },
            description: "Create Tollbooth Note",
            shortcutId: "create-tollbooth-note",
            shortcutKeys: null
        })
    }
    async function createSpeedBumpMapNote() {
        const point = await sdk.Map.drawPoint();
        await sdk.DataModel.MapComments.addMapComment({
            geometry: point,
            subject: "Speed Bump",
            body: "Add a speed bump permanent hazard here, once added, delete this map comment."
        })
    }
    async function createRailroadCrossingNote() {
        const point = await sdk.Map.drawPoint();
        await sdk.DataModel.MapComments.addMapComment({
            geometry: point,
            subject: "Railroad Crossing",
            body: "Add a railroad crossing permanent hazard here, once added, delete this map comment."
        })
    }
    async function createSharpCurveNote() {
        const point = await sdk.Map.drawPoint();
        await sdk.DataModel.MapComments.addMapComment({
            geometry: point,
            subject: "Sharp Curve",
            body: "Add a Sharp Curve permanent hazard here, once added, delete this map comment."
        })
    }
    async function createComplexIntersectionNote() {
        const point = await sdk.Map.drawPoint();
        await sdk.DataModel.MapComments.addMapComment({
            geometry: point,
            subject: "Complex Intersection",
            body: "Add a Complex Intersection permanent hazard here, once added, delete this map comment."
        })
    }
    async function createMultipleLanesMergingNote() {
        const point = await sdk.Map.drawPoint();
        await sdk.DataModel.MapComments.addMapComment({
            geometry: point,
            subject: "Multiple Lanes Merging",
            body: "Add a Multiple Lanes Merging permanent hazard here, once added, delete this map comment."
        })
    }
    async function createTollboothNote() {
        const point = await sdk.Map.drawPoint();
        await sdk.DataModel.MapComments.addMapComment({
            geometry: point,
            subject: "Tollbooth",
            body: "Add a Tollbooth permanent hazard here, once added, delete this map comment."
        })
    }
})();
