[![Published on NPM](https://img.shields.io/npm/v/@khmyznikov/pwa-install.svg)](https://www.npmjs.com/package/@khmyznikov/pwa-install)

## \<pwa-install\> - 13.5kB brotli compressed

Installation dialog for Progressive web component. Provides more convenience user experience and fix lack of native dialogs in some browsers.

## Gallery
| iOS | iOS install | iOS gallery |
|---|---|---|
|![IMG_0345-min](https://user-images.githubusercontent.com/6115884/115908516-f0e99900-a472-11eb-87cc-2474246141a4.jpg)|![IMG_0347-min](https://user-images.githubusercontent.com/6115884/115908574-0494ff80-a473-11eb-8842-4a9e5a62ee7a.jpg)|![IMG_0346-min](https://user-images.githubusercontent.com/6115884/115908559-fe068800-a472-11eb-823f-f56cc7028145.jpg)|
| Android | Android gallery |
|![Screenshot_20210423-201134-min](https://user-images.githubusercontent.com/6115884/115908742-3a39e880-a473-11eb-90b0-e8ded05a9509.jpg)|![Screenshot_20210423-201144-min](https://user-images.githubusercontent.com/6115884/115908762-3f973300-a473-11eb-8feb-d895433fd2f3.jpg)|

## Install

```bash
npm i @khmyznikov/pwa-install
```

Alternatively, you can use [unpkg](https://unpkg.com).

---

## Import

```js
import '../node_modules/@khmyznikov/pwa-install/dist/bundle.js';
```

---

## Use

```html
<pwa-install></pwa-install>
```

### **[Demo](https://www.khmyznikov.com/pwa-install/)**

---

## Supported params
```html
<pwa-install       
  manifest-url="/manifest.json"
  name="PWA"
  description="Progressive web application"
  icon="/icon.png">
</pwa-install>
```
*Make a good manifest file and don't use name/descr/icon params*

---

## Supported events
- pwa-install-success-event
- pwa-install-fail-event
- pwa-install-available-event
- pwa-user-choice-result-event

```html
<script type="text/javascript">
  var pwaInstall = document.getElementsByTagName('pwa-install')[0];

  pwaInstall.addEventListener('pwa-install-success-event', (event) => {console.log(event.detail.message)});
</script>
```

---

## Supported properties (readonly)
- userChoiceResult: string;
- isDialogHidden: boolean
- isInstallAvailable: boolean
- isAppleMobilePlatform: boolean
- isUnderStandaloneMode: boolean
- isRelatedAppsInstalled: boolean

```html
<script type="text/javascript">
  var pwaInstall = document.getElementsByTagName('pwa-install')[0];

  console.log(pwaInstall.isUnderStandaloneMode);
</script>
```

---

## Supported methods
- install
- hideDialog
- showDialog
- getInstalledRelatedApps: async

```html
<script type="text/javascript">
  var pwaInstall = document.getElementsByTagName('pwa-install')[0];

  pwaInstall.install();
</script>
```

---

## ROADMAP
- dark theme
- more params/methods/events
- translation
- manual mode
- style customization
