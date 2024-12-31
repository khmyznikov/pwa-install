import { LitElement } from 'lit';
type IProps = {
    name: string;
    description: string;
    icon: string;
};
export default class PWABottomSheetElement extends LitElement {
    static get styles(): CSSStyleSheet[];
    props: IProps;
    install: {
        handleEvent: () => void;
    };
    hideDialog: () => void;
    disableClose: boolean;
    fallback: boolean;
    howToRequested: boolean;
    toggleHowTo: {
        handleEvent: () => void;
    };
    private _callInstall;
    private _callHide;
    private bindedElement;
    private readonly _saveBodyStyle;
    private dragMobileSheet;
    private setupAppearence;
    private _init;
    firstUpdated(): void;
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
export {};
