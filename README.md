[![Published on NPM](https://img.shields.io/npm/v/@khmyznikov/pwa-install.svg)](https://www.npmjs.com/package/@khmyznikov/pwa-install)
![npm](https://img.shields.io/npm/dt/@khmyznikov/pwa-install)
## \<pwa-install\>

Installation dialog for Progressive web application. Provides more convenience user experience and fix lack of native dialogs in some browsers. **13.5kB brotli** compressed bundle.

Use it as [Web Component with any modern framework](https://academind.com/tutorials/web-components-introduction/#consuming-the-web-component-in-react). No polyfill is required.
## Gallery
| iOS | iOS install | iOS gallery |
|---|---|---|
|![IMG_0345-min](https://user-images.githubusercontent.com/6115884/115908516-f0e99900-a472-11eb-87cc-2474246141a4.jpg)|![IMG_1541-min](https://user-images.githubusercontent.com/6115884/122636524-6203a080-d0f2-11eb-8ace-6af6f9f78d7b.jpg)|![IMG_0346-min](https://user-images.githubusercontent.com/6115884/115908559-fe068800-a472-11eb-823f-f56cc7028145.jpg)|
| Android | Android gallery | Dark theme |
|![Screenshot_20210619-152257-min](https://user-images.githubusercontent.com/6115884/122636298-2c11ec80-d0f1-11eb-9cbe-6332e1816f52.jpg)|![Screenshot_20210619-152248-min](https://user-images.githubusercontent.com/6115884/122636302-3207cd80-d0f1-11eb-8fbd-28be5e32bc00.jpg)|![Screenshot_20210619-151933-min](https://user-images.githubusercontent.com/6115884/122636317-51065f80-d0f1-11eb-8729-8403f430e534.jpg)|

| Chrome | Chrome gallery |
|---|---|
|![Screenshot 2021-06-19 153758-min](https://user-images.githubusercontent.com/6115884/122636673-21585700-d0f3-11eb-823a-ff470f31abd4.jpg)|![Screenshot 2021-06-19 153810-min](https://user-images.githubusercontent.com/6115884/122636677-24ebde00-d0f3-11eb-9b62-2897d6da2176.jpg)|

## Install

```bash
npm i @khmyznikov/pwa-install
```

Alternatively, you can use [unpkg](https://unpkg.com).

---

## Import

```js
import '@khmyznikov/pwa-install';
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
  manual-apple="true"
  manual-chrome="true"
  disable-chrome="true"

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
- more params/methods/events
- translation
- style customization
