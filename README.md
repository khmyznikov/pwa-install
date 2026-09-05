[![Published on NPM](https://img.shields.io/npm/v/@khmyznikov/pwa-install.svg)](https://www.npmjs.com/package/@khmyznikov/pwa-install)
[![npm](https://img.shields.io/npm/dt/@khmyznikov/pwa-install)](https://www.npmjs.com/package/@khmyznikov/pwa-install)
## \<pwa-install\>

**New to PWAs? Unsure how to create a Web App? Check out these resources for a quick start: [PWA Intro](https://docs.pwabuilder.com/#/home/pwa-intro), [PWA Starter](https://docs.pwabuilder.com/#/starter/quick-start), [PWA Builder](https://www.pwabuilder.com/)**

Installation dialog for Progressive Web Application (PWA) and Add to Home Screen/Dock dialog for Web Apps. This offers an enhanced user experience and addresses the absence of native dialogs in certain browsers (Safari, Firefox, Opera, etc.). **28kB brotli** compressed bundle. Translation/localization is supported.

✨ **Now with iOS/iPadOS/MacOS 26+ support** for native look and feel!

Use it as [Web Component with any **modern** framework](https://custom-elements-everywhere.com/). No polyfill is required.
- [React <= 18 sample](https://stackblitz.com/edit/vite-react-ts-2eeiak?file=src%2FApp.tsx)
- [React 19+ sample](https://stackblitz.com/edit/react-19-web-components-shoelace-8rdjcfbb?file=src%2FApp.jsx)
- [Next.js 15 + React 19 sample](https://stackblitz.com/edit/github-xrnbtug5?file=src%2Fapp%2F(delete-this-and-modify-page.tsx)%2FPWAInstall.tsx)
- [Angular sample](https://stackblitz.com/edit/aozf92?file=package.json,src%2Fapp%2Fpwa-install%2Fpwa-install.component.html,src%2Fapp%2Fpwa-install%2Fpwa-install.component.ts)
- [Svelte](https://stackblitz.com/edit/svelte-tab-2-sng9wa?file=src%2Froutes%2F%2Bpage.svelte)
  
⚡Should work with any other modern framework or just vanila js as web component.

## **[Demo](https://khmyznikov.com/pwa-install/)**

## Gallery
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iOS default&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Install instruction | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;App gallery&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
|-|-|-|
|![iOS example default](https://github.com/user-attachments/assets/933a9669-2b1a-49e1-ad49-b4d8657bee8c)|![iOS example install instruction](https://github.com/user-attachments/assets/7f7bf553-8c7e-4840-a261-28b07534ca07)|![iOS example gallery](https://github.com/user-attachments/assets/be709716-bcc4-457c-a271-4e6696032f57)|

| MacOS 14-26+ (Tahoe) |
|---|
|![macos_default](https://github.com/user-attachments/assets/c868fa2a-283e-4dcb-b6c5-b2bacdc1749e)|



| &nbsp;&nbsp;&nbsp;&nbsp;iPadOS&nbsp;&nbsp;&nbsp;&nbsp; | Instruction |
|---|---|
|![iPadOS example default](https://github.com/user-attachments/assets/a9b94313-7a88-4042-88c4-be7cc585e236)|![iPadOS install instruction](https://github.com/user-attachments/assets/0f62be23-ba2a-4bf9-b979-058487ccc238)



| Android | Firefox/ Opera/ Others | &nbsp;&nbsp;App gallery&nbsp;&nbsp; |
|-|-|-|
|![Android example default](https://github.com/user-attachments/assets/cd973d85-a7e7-4699-84c3-dc7c54aac146)|![Firefox Opera and others](https://github.com/user-attachments/assets/dc238509-96f6-4a8e-a8ba-7df0997a2c16)|![Android gallery](https://github.com/user-attachments/assets/98ac4107-c55b-464a-9881-bbc51721ac6d)|

| Chrome&nbsp; | App Gallery&nbsp;&nbsp; |
|---|---|
|![Chrome example default](https://github.com/user-attachments/assets/7406b3ff-4282-4a07-a3c1-e78f8949c00b)|![Chrome example gallery](https://github.com/user-attachments/assets/7c9722f1-0435-4901-ba21-d7e54b228022)|

<br>

## Install

```bash
npm i @khmyznikov/pwa-install
```

Alternatively, you can use [unpkg](https://unpkg.com) or [esm.sh](https://esm.sh).


## Import

```js
import '@khmyznikov/pwa-install';
```

## TS Config
```json
"compilerOptions": {
  "moduleResolution": "Bundler",
  "types": ["dom-chromium-installation-events", "web-app-manifest"]
}
```

## Use

```html
<pwa-install></pwa-install>
```
- [React <= 18 polyfill](https://stackblitz.com/edit/vite-react-ts-2eeiak?file=src%2FApp.tsx)
- [React 19+ sample](https://stackblitz.com/edit/react-19-web-components-shoelace-8rdjcfbb?file=src%2FApp.jsx)
- [Next.js 15 + React 19 sample](https://stackblitz.com/edit/github-xrnbtug5?file=src%2Fapp%2F(delete-this-and-modify-page.tsx)%2FPWAInstall.tsx)

### **[Demo](https://khmyznikov.com/pwa-install/)**

<br>

## Supported params
```html
<pwa-install
  manual-apple
  manual-chrome
  disable-chrome
  disable-close
  use-local-storage

  install-description="Custom call to install text"
  disable-install-description
  disable-screenshots
  disable-screenshots-apple
  disable-screenshots-chrome
  manual-how-to

  disable-android-fallback

  manifest-url="/manifest.json"
  manifest-id="https://example.com/app-id"
  name="PWA"
  description="Progressive web application"         
  icon="/icon.png">
</pwa-install>
```

### Parameter behavior

- **`manual-apple` and `manual-chrome`**: Let you control the dialog manually with `showDialog()`.
- **`manual-chrome`**: Applies to all non-Apple devices. Chrome on iPad and iOS is in the `manual-apple` category, while Firefox on Android is in the `manual-chrome` category.
- **`disable-chrome`**: Completely disables custom logic and interception for Chromium browsers, allowing the browser's built-in logic to work.
- **`disable-close`**: Makes the dialog impossible for the user to close.
- **`use-local-storage`**: Stores the user's preference to ignore the prompt in long-lived storage, so they will not be prompted again unless they clear the application data.
- **`disable-android-fallback`**: Disables the install instructions dialog for non-Chrome browsers on Android.
- **`manual-how-to`**: Shows the instructions immediately and disables screenshots on Apple devices.

*Make a good manifest file and don't use name/descr/icon params. Boolean attributes needs to be removed to act like "false"*

On supported Chromium browsers, the component uses the Web Install API automatically after fetching the configured manifest. When `manifest-url` matches the current document's linked manifest, `manifest-id` is omitted, and the fetched manifest declares an `id`, the component uses the current-document `navigator.install()` signature. A different manifest or an explicit `manifest-id` uses `navigator.install({ manifest, manifestId })`. Relative manifest URLs are resolved against the current document. `manifest-id` is optional when the manifest declares a non-empty `id`.

The component continues to intercept and retain `beforeinstallprompt` as a legacy fallback. If both `manifest-id` and the fetched manifest's `id` are missing, the component skips Web Install and uses the retained prompt on the same click. If no compatible legacy prompt exists, `pwa-install-fail-event` reports a `DataError`. Other technical Web Install failures still require the next user click to use the retained prompt. A legacy prompt cannot install a different app.

## Custom Styles

*Only the Apple template supports styling, and only the tint color option is available as of today. More to come.*
```html
<!-- As attribute (JSON string) -->
<pwa-install styles='{"--tint-color": "#6366f1"}'></pwa-install>
```

```javascript
// As property (object)
const pwaInstall = document.querySelector('pwa-install');
pwaInstall.styles = { '--tint-color': '#6366f1' };

// Or as attribute via JavaScript
pwaInstall.setAttribute('styles', JSON.stringify({ '--tint-color': '#6366f1' }));
```

<br>

## Supported events
- pwa-install-success-event
- pwa-install-fail-event
- pwa-install-backend-event
- pwa-install-available-event
- pwa-user-choice-result-event
- pwa-install-how-to-event
- pwa-install-gallery-event

```html
<script type="text/javascript">
  var pwaInstall = document.getElementsByTagName('pwa-install')[0];

  pwaInstall.addEventListener('pwa-install-success-event', (event) => {console.log(event.detail.message)});
  pwaInstall.addEventListener('pwa-install-fail-event', (event) => {
    console.log(event.detail.errorName, event.detail.fallbackAvailable);
  });
  pwaInstall.addEventListener('pwa-install-backend-event', (event) => {
    console.log(event.detail.backend, event.detail.reason);
  });
</script>
```

`pwa-install-backend-event` is dispatched immediately before an install backend is called. Its `backend` is `web-install` or `beforeinstallprompt`. When the legacy backend is selected, `reason` can be `missing-manifest-id`, `web-install-unavailable`, or `web-install-failed`.
⚠️ `success/fail/choice` events is Chromium only, iOS don't have them.

⚠️ If you see this message in the console:<br>
`Banner not shown: beforeinstallpromptevent.preventDefault() called. The page must call beforeinstallpromptevent.prompt() to show the banner.`<br>
This is **not** a error and **not** a bug. This means that the component successfully intercepted the *beforeinstallprompt* event.

<br>

## Supported properties (readonly)
- userChoiceResult: *string*
- isDialogHidden: *boolean*
- isInstallAvailable: *boolean*
- isAppleMobilePlatform: *boolean*
- isAppleDesktopPlatform: *boolean*
- isApple26Plus: *boolean*
- isUnderStandaloneMode: *boolean*
- isRelatedAppsInstalled: *boolean*
- isWebInstallSupported: *boolean*

```html
<script type="text/javascript">
  var pwaInstall = document.getElementsByTagName('pwa-install')[0];

  console.log(pwaInstall.isUnderStandaloneMode);
</script>
```
<br>

## Supported methods
- install
- hideDialog
- showDialog
- getInstalledRelatedApps: async

```html
<script type="text/javascript">
  var pwaInstall = document.getElementsByTagName('pwa-install')[0];

  await pwaInstall.install();
</script>
```

The install method prefers `navigator.install()` whenever it is available and a manifest ID is configured or declared. A missing ID is detected before Web Install is called, allowing a retained `beforeinstallprompt` fallback to run on the same click. After a runtime Web Install failure, fallback still requires a second user click because both browser APIs consume transient user activation.

*getInstalledRelatedApps is Chromium only, always empty on iOS.*

<br>

## Async mode

If you need to target Chromium browsers but you want to postpone component mounting, you can do it!
But, need to capture *beforeinstallprompt* manually and pass it to the component's *externalPromptEvent* property(not attribute).

```javascript
// capture event asap, better right in index.html script tag
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  // save it somewhere
  window.promptEvent = e;
});

// later render the component on demand and pass event
document.getElementById("pwa-install").externalPromptEvent = window.promptEvent;
```
<br>

## Supported localization

Translations available:
*EN*, *RU*, *TR*, *DE*, *ES*, *NL*, *EL*, *FR*, *SR*, *PL*, *ZH-CN*/*ZH-HK*/*ZH-TW*, *IT*, *UK*, *CS*, *NO/NB*, *PT*, *JA*, *SV*, *KO*, *KM*, *DA*, *VI*, *FA*, *HU*, *SK*, *CA-ES*, *HE*, *BG*, *AR*, *RO*

Language should change automatically based on browser settings. Please create the pull-request if you want to help with translation to your language. It's an easy process.

[Contribution Guidelines](./CONTRIBUTING.md)

<br>

## ROADMAP
- manual theme


[<img alt="buy me a coffee QR" src="https://github.com/khmyznikov/pwa-install/assets/6115884/5168f0db-2317-4ec2-8362-d828ffa2a8bf" width="200">](https://www.buymeacoffee.com/khmyznikov)
[<img alt="PayPal QR" src="https://github.com/khmyznikov/pwa-install/assets/6115884/6290b136-d525-4f8e-95fe-4729ea4c6414" width="200">](https://paypal.me/hmyznikov)

## One-time Backers ❤️
[Patrick Voigt](https://github.com/pvo13)<br>
[Darren Debono](https://github.com/amigabits)<br>
[Angelo Fan](https://github.com/angelofan)<br>
[Chris Cherniakov](https://github.com/Taequn)<br>
[Moddy](https://github.com/moddyio)<br>
[Pavlo Hromadchuk](https://github.com/hromadchuk)<br>
Leek Duck
