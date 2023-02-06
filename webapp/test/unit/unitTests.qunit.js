/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"search_image/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
