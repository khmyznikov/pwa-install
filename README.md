[![Published on NPM](https://img.shields.io/npm/v/@khmyznikov/pwa-install.svg)](https://www.npmjs.com/package/@khmyznikov/pwa-install)

## \<pwa-install\>

Installation dialog for Progressive web component. Provides more convenience user experience and fix lack of native dialogs in some browsers.


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
- pwa-installed-success-event
- pwa-installed-fail-event
- pwa-user-choice-result-event
- pwa-install-available-event

```html
<script type="text/javascript">
  var pwaInstall = document.getElementsByTagName('pwa-install')[0];

  pwaInstall.addEventListener('pwa-installed-success-event', (event) => {console.log(event.detail.message)});
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
- more params/methods/events
- manual mode
- style customization