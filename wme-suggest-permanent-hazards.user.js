// ==UserScript==
// @name         WME Suggest Permanent Hazards
// @namespace    https://github.com/WazeDev/wme-suggest-permanent-hazards
// @version      0.0.9
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
    const localStorageShortcutsItemName = "WME_Suggest_Permanent_Hazards_Shortcuts";
    let sdk;
    let sdkPlus;
    let wmeSdk;
    let shortcutsLocalStorage;
    let shortcutsArray = [];
    async function initialize() {
        wmeSdk = await getWmeSdk({
            scriptId: "wme-suggest-permanent-hazards",
            scriptName: "WME Suggest Permanent Hazards"
        }); // Assuming getWmeSdk is your method to get the native SDK.
        sdkPlus = await initWmeSdkPlus(wmeSdk, {
            hooks: ["DataModel.MapComments"]
        });
        sdk = sdkPlus || wmeSdk;
        console.log("wme-suggest-permanent-hazards: Initalizing...")
        shortcutsLocalStorage = localStorage.getItem(localStorageShortcutsItemName);
        if (shortcutsLocalStorage === [] || shortcutsLocalStorage === null || shortcutsLocalStorage === '[]') {
            console.log("wme-suggest-permanent-hazards: No shortcuts found, creating shortcuts...")
            createShortcuts();
        } else {
            console.log("wme-suggest-permanent-hazards: Shortcuts found in local storage, importing shortcuts...")
            importShortcuts();
        }
        sdk.Events.on({eventName: "wme-after-edit", eventHandler: function () {storeShortcuts()}})
    }
    async function importShortcuts() {
        let shortcutsJSObject = JSON.parse(shortcutsLocalStorage)
        for (let shortcut in shortcutsJSObject) {
            registerShortcut(shortcut);
        }
    }
    async function storeShortcuts() {
        let shortcutsJSON = JSON.stringify(shortcutsArray);
        localStorage.setItem(localStorageShortcutsItemName, shortcutsJSON)
    }
    async function registerShortcut(shortcutData) {
        shortcutArray.append(shortcutData)
        sdk.Shortcuts.createShortcut(shortcutData)
    }
    async function createShortcuts() {
        const registeredShortcuts = wmeSdk.Shortcuts.getAllShortcuts().map((x) => x.shortcutId)
        if (!registeredShortcuts.includes("create-railroad-crossing-note")) {
            registerShortcut({
                callback: function() {
                    createRailroadCrossingNote()
                },
                description: "Create Railroad Crossing Note",
                shortcutId: "create-railroad-crossing-note",
                shortcutKeys: null
            })
        }
        if (!registeredShortcuts.includes("create-school-zone-note")) {
            registerShortcut({
                callback: function() {
                    createSchoolZoneMapNote()
                },
                description: "Create School Zone Note",
                shortcutId: "create-school-zone-note",
                shortcutKeys: null
            })
        }
        if (!registeredShortcuts.includes("create-sharp-curve-note")) {
            registerShortcut({
                callback: function() {
                    createSharpCurveNote()
                },
                description: "Create Sharp Curve Note",
                shortcutId: "create-sharp-curve-note",
                shortcutKeys: null
            })
        }
        if (!registeredShortcuts.includes("create-complex-intersection-note")) {
            registerShortcut({
                callback: function() {
                    createComplexIntersectionNote()
                },
                description: "Create Complex Intersection Note",
                shortcutId: "create-complex-intersection-note",
                shortcutKeys: null
            })
        }
        if (!registeredShortcuts.includes("create-multiple-lanes-merging-note")) {
            registerShortcut({
                callback: function() {
                    createMultipleLanesMergingNote()
                },
                description: "Create Multiple Lanes Merging Note",
                shortcutId: "create-multiple-lanes-merging-note",
                shortcutKeys: null
            })
        }
        if (!registeredShortcuts.includes("create-speed-bump-note")) {
            registerShortcut({
                callback: function() {
                    createSpeedBumpMapNote()
                },
                description: "Create Speed Bump Note",
                shortcutId: "create-speed-bump-note",
                shortcutKeys: null
            })
        }
        if (!registeredShortcuts.includes("create-tollbooth-note")) {
            registerShortcut({
                callback: function() {
                    createTollboothNote()
                },
                description: "Create Tollbooth Note",
                shortcutId: "create-tollbooth-note",
                shortcutKeys: null
            })
        }
    }
    async function createRailroadCrossingNote() {
        const point = await sdk.Map.drawPoint();
        await sdk.DataModel.MapComments.addMapComment({
            geometry: point,
            subject: "Railroad Crossing",
            body: "Add a railroad crossing permanent hazard here, once added, delete this map comment."
        })
    }
    async function createSchoolZoneMapNote() {
        const polygon = await sdk.Map.drawPolygon();
        await sdk.DataModel.MapComments.addMapComment({
            geometry: polygon,
            subject: "School Zone",
            body: "Name:\nSpeed Limit (optional):\nExclude Road Types (optional):\nSchedule (optional):"
        })
    }
    async function createSharpCurveNote() {
        const point = await sdk.Map.drawPoint();
        await sdk.DataModel.MapComments.addMapComment({
            geometry: point,
            subject: "Sharp Curve",
            body: "Add a sharp curve permanent hazard here, once added, delete this map comment."
        })
    }
    async function createComplexIntersectionNote() {
        const point = await sdk.Map.drawPoint();
        await sdk.DataModel.MapComments.addMapComment({
            geometry: point,
            subject: "Complex Intersection",
            body: "Add a complex intersection permanent hazard here, once added, delete this map comment."
        })
    }
    async function createMultipleLanesMergingNote() {
        const point = await sdk.Map.drawPoint();
        await sdk.DataModel.MapComments.addMapComment({
            geometry: point,
            subject: "Multiple Lanes Merging",
            body: "Add a multiple lanes merging permanent hazard here, once added, delete this map comment."
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
    async function createTollboothNote() {
        const point = await sdk.Map.drawPoint();
        await sdk.DataModel.MapComments.addMapComment({
            geometry: point,
            subject: "Tollbooth",
            body: "Add a tollbooth permanent hazard here, once added, delete this map comment."
        })
    }
})();
