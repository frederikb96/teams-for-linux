(function () {
	const path = require('path');
	const { ipcRenderer, remote } = require('electron');
	const pageTitleNotifications = require('./pageTitleNotifications');
	require('./onlineOfflineListener')();
	require('./rightClickMenuWithSpellcheck');
	require('./zoom')();

	const iconPath = path.join(__dirname, '../assets/icons/icon-96x96.png');

	pageTitleNotifications({
		ipc: ipcRenderer,
		iconPath,
	});

	// HACK: changing the userAgent to chrome after 5 seconds to fix the issue of notifications disapearing.
	document.addEventListener(
		'DOMContentLoaded',
		() => {
			setTimeout( () => {
				angular.element(document).injector().get('callingSupportService').isChromeVideoMultipartyEnabled = true;
				angular.element(document).injector().get('callingSupportService').isChromeVideoOneOnOneEnabled = true;
				angular.element(document).injector().get('callingSupportService').isChromeVideoMultipartyEnabled = true;
				angular.element(document).injector().get('settingsService').appConfig.enableCallingChromeOneOnOne = true;
				angular.element(document).injector().get('settingsService').appConfig.callingEnableChromeMeetingSingleVideo = true;
				angular.element(document).injector().get('settingsService').appConfig.callingEnableChromeMultipartyVideo = true;
				angular.element(document).injector().get('settingsService').appConfig.enableChromeScreenSharing = true;
				angular.element(document).injector().get('settingsService').appConfig.enableAddToChatButtonForMeetings = true;
				angular.element(document).injector().get('settingsService').appConfig.enableCallingScreenPreviewLabel = true;
				
				// // others... 
				// enableAddToChatButtonForMeetings
				// enableCallingScreenPreviewLabel 	
			}, 5000);	
			//setTimeout(navigator.__defineGetter__('userAgent', () => remote.getGlobal('edgeUserAgent')), 5000);
		},
	);
}());
