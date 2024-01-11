var cacheName = 'PWAinstallDemo-' + BUILD_TIMESTAMP;

var filesToCache = [
	'/pwa-install/',
	'manifest.json',
];

self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Install');

	e.waitUntil(
		caches.open(cacheName).then(function (cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);

	self.skipWaiting();
});


self.addEventListener('activate', function (e) {
	console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== cacheName) {
					console.log('[ServiceWorker] Removing old cache', key);
						sendMessageToAll('NEW_VERSION');
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request, { ignoreSearch: true }).then(function (response) {
            return response || fetch(e.request);
        })
    );
});

// --- events from/to js application ---
function sendMessage(client, msg) {
	return new Promise(function (resolve, reject) {
		var msg_chan = new MessageChannel();

		client.postMessage(msg, [msg_chan.port2]);
	});
}

function sendMessageToAll(msg, callback) {
	clients.matchAll().then(clients => {
		clients.forEach(client => {
			sendMessage(client, msg);
		})
		if (callback && typeof callback == 'function') {
			callback();
		}
	})
}

// --- message from js application ---
self.addEventListener('message', event => {
	if (event && event.data) {
		if (event.data.message) {
			console.log('SW MESSAGE: ', event.data.message, event.data.data);
		}
	}
});


// --- web push ---

// self.addEventListener('push', (event) => {
// 	let payload = event.data.json();
// 	let options = payload.notification;
// 	// let data = payload.data;

// 	options.data = {};
// 	options.requireInteraction = true;
// 	options.data.url = options.click_action || (event.currentTarget ? event.currentTarget.origin : null);

// 	options.body = options.body || 'Need your attention';
// 	options.icon = options.icon || '/images/logo-512.png';
// 	options.badge = options.badge || '/images/badge-72.png';

// 	let title = options.title;

// 	event.waitUntil(
// 		self.registration.showNotification(title, options)
// 	);
// });

// self.addEventListener('notificationclick', (event) => {
// 	event.notification.close();

// 	let url = event.notification.data && event.notification.data.url ? event.notification.data.url : event.currentTarget ? event.currentTarget.origin : null;
// 	let clickResponsePromise = Promise.resolve();

// 	if (url) {
// 		event.waitUntil(clients.matchAll({
// 			type: "window"
// 		}).then((clientList) => {
// 			for (let i = 0; i < clientList.length; i++) {
// 				let client = clientList[i];
// 				if (client.url && 'focus' in client)
// 					return client.focus();
// 			}
// 			if (clients.openWindow)
// 				return clients.openWindow(url);
// 		}));
// 	} else {
// 		event.waitUntil(
// 			clickResponsePromise
// 		);
// 	}
// });