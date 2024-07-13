
import { PWAInstallElement } from '../index';
import { createComponent, ReactWebComponent } from '@lit/react';
import react from 'react';

const PWAInstall = createComponent({
	react,
	tagName: 'pwa-install',
	elementClass: PWAInstallElement,
	events: {
	  onPwaInstallSuccessEvent: 'pwa-install-success-event',
	  onPwaInstallFailEvent: 'pwa-install-fail-event',
	  onPwaUserChoiceResultEvent: 'pwa-user-choice-result-event',
	  onPwaInstallAvailableEvent: 'pwa-install-available-event',
	  onPwaInstallHowToEvent: 'pwa-install-how-to-event',
	  onPwaInstallGalleryEvent: 'pwa-install-gallery-event'
	}
});

export default PWAInstall;