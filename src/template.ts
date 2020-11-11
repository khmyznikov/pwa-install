import { html } from 'lit-element';
import {classMap} from 'lit-html/directives/class-map.js';

const template = (name: string, description: string, icon: string, installAvailable: any, appleInstallAvailable: any, howTo: any, howToRequested: boolean) => {
    const installDialogClasses = () => { return {available: installAvailable }};
    const installDialogClassesApple = () => { return {available: appleInstallAvailable, 'how-to': howToRequested}};

    return html`
        <div id="pwa-install">
            <div class="install-dialog chrome ${classMap(installDialogClasses())}">
                <div class="dialog-body">
                    <div class="icon">
                        <img src="${icon}" alt="icon" class="icon-image">
                    </div>
                    <div class="about">
                        <div class="name">${name}</div>
                        <div class="description">${description}</div>
                    </div>
                    <div class="action-buttons">
                        <button class="material-button secondary cancel" @click='hide()'>Hide</button>
                        <button class="material-button primary install" @click='install()'>Install</button>
                    </div>
                </div>
            </div>

            <div class="install-dialog apple ${classMap(installDialogClassesApple())}">
                <div class="dialog-body">
                    <div class="icon">
                        <img src="${icon}" alt="icon" class="icon-image">
                    </div>
                    <div class="about">
                        <div class="name">${name}</div>
                        <div class="description">${description}</div>
                    </div>
                    <div class="action-buttons">
                        <button class="button install" @click=${howTo}>Install</button>
                        <button class="button cancel" @click='hide()'>Hide</button>
                    </div>
                </div>
                <div class="how-to-body">
                    <div class="how-to-description">
                        <div class="description-title">
                            Add this Web App to your Home Screen for quick and easy access.
                        </div>
                        <div class="description-step">
                            <div class="svg-wrap">
                                <svg id="pwa-share" width="25" height="32">
                                    <g>
                                        <path fill="rgb(0,122,255)"
                                            d="m12.51122,20.7648c0.52277,0 0.99149,-0.43265 0.99149,-0.95542l0,-14.87204l-0.09015,-2.0731l1.11768,1.15371l2.27135,2.37952c0.18028,0.19833 0.43265,0.30647 0.68502,0.30647c0.50476,0 0.90134,-0.37857 0.90134,-0.88332c0,-0.27039 -0.10817,-0.46869 -0.28844,-0.64895l-4.86721,-4.74103c-0.25237,-0.25237 -0.46869,-0.32448 -0.72106,-0.32448c-0.25237,0 -0.46869,0.0721 -0.72106,0.32448l-4.88523,4.74103c-0.18028,0.18028 -0.28844,0.37857 -0.28844,0.64895c0,0.50476 0.37857,0.88332 0.90134,0.88332c0.23436,0 0.50476,-0.10814 0.68502,-0.30647l2.27135,-2.37952l1.11768,-1.17172l-0.0721,2.09112l0,14.87204c0,0.52277 0.45066,0.95542 0.99145,0.95542l-0.00002,0l-0.00001,-0.00001zm-8.13005,10.96022l16.22403,0c2.86626,0 4.30841,-1.42412 4.30841,-4.23627l0,-14.27715c0,-2.79415 -1.44215,-4.23627 -4.30841,-4.23627l-3.96589,0l0,2.00095l3.92985,0c1.47819,0 2.34345,0.79316 2.34345,2.34345l0,14.06085c0,1.5503 -0.86527,2.34347 -2.34345,2.34347l-16.15194,0c-1.49625,0 -2.32547,-0.79317 -2.32547,-2.34347l0,-14.06085c0,-1.55029 0.82923,-2.34345 2.32547,-2.34345l3.96589,0l0,-2.00095l-4.00196,0c-2.84821,0 -4.29035,1.4241 -4.29035,4.23627l0,14.27715c0,2.81217 1.44215,4.23627 4.29035,4.23627l0.00001,0l0.00001,0z" />
                                    </g>
                                </svg>
                            </div>
                            <div class="step-text">1. Tap on Share in browser Navigation bar</div>
                        </div>
                        <div class="description-step">
                            <div class="svg-wrap">
                                <svg id="pwa-add" width="26" height="26">
                                    <g>
                                        <path fill="#686871"
                                            d="m23.40492,1.60784c-1.32504,-1.32504 -3.19052,-1.56912 -5.59644,-1.56912l-10.65243,0c-2.33622,0 -4.2017,0.24408 -5.5267,1.56912c-1.32504,1.34243 -1.56911,3.17306 -1.56911,5.50924l0,10.5827c0,2.40596 0.22665,4.254 1.55165,5.57902c1.34246,1.32501 3.19052,1.5691 5.59647,1.5691l10.60013,0c2.40592,0 4.2714,-0.24408 5.59644,-1.5691c1.325,-1.34245 1.55166,-3.17306 1.55166,-5.57902l0,-10.51293c0,-2.40596 -0.22666,-4.25401 -1.55166,-5.57901zm-0.38355,5.21289l0,11.24518c0,1.51681 -0.20924,2.94643 -1.02865,3.78327c-0.83683,0.83685 -2.30134,1.0635 -3.81815,1.0635l-11.33234,0c-1.51681,0 -2.96386,-0.22665 -3.80073,-1.0635c-0.83683,-0.83684 -1.04607,-2.26646 -1.04607,-3.78327l0,-11.19288c0,-1.5517 0.20924,-3.01617 1.02865,-3.85304c0.83687,-0.83683 2.31876,-1.04607 3.87042,-1.04607l11.28007,0c1.51681,0 2.98132,0.22666 3.81815,1.06353c0.81941,0.81941 1.02865,2.26645 1.02865,3.78327zm-10.53039,12.08205c0.64506,0 1.02861,-0.43586 1.02861,-1.13326l0,-4.34117l4.53294,0c0.66252,0 1.13326,-0.36613 1.13326,-0.99376c0,-0.64506 -0.43586,-1.02861 -1.13326,-1.02861l-4.53294,0l0,-4.53294c0,-0.6974 -0.38355,-1.13326 -1.02861,-1.13326c-0.62763,0 -0.99376,0.45332 -0.99376,1.13326l0,4.53294l-4.51552,0c-0.69737,0 -1.15069,0.38355 -1.15069,1.02861c0,0.62763 0.48817,0.99376 1.15069,0.99376l4.51552,0l0,4.34117c0,0.66252 0.36613,1.13326 0.99376,1.13326z" />
                                    </g>
                                </svg>
                            </div>
                            <div class="step-text">2. Add to Home Screen in Share menu</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>`;
};
export default template;