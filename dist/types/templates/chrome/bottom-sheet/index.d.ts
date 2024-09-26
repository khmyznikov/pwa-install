import { LitElement } from 'lit';
type IProps = {
    name: string;
    description: string;
    icon: string;
};
export default class PWABottomSheetElement extends LitElement {
    props: IProps;
    install: {
        handleEvent: () => void;
    };
    hideDialog: () => void;
    disableClose: boolean;
    private _callInstall;
    private _callHide;
    private bindedElement;
    private readonly _saveBodyStyle;
    private dragMobileSheet;
    private setupAppearence;
    private _init;
    firstUpdated(): void;
    createRenderRoot(): this;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
