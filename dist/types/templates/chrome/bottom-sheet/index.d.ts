import { LitElement } from 'lit';
declare type IProps = {
    name: string;
    description: string;
    icon: string;
};
export default class PWABottomSheetElement extends LitElement {
    props: IProps;
    install: {
        handleEvent: () => void;
    };
    hideDialog: {
        handleEvent: () => void;
    };
    private _init;
    firstUpdated(): void;
    createRenderRoot(): this;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
