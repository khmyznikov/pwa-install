export interface BottomSheetTemplateOptions {
    name: string;
    description: string;
    icon: string;
    install: EventListenerOrEventListenerObject;
    fallback: boolean;
    howToRequested: boolean;
    inAppBrowser: boolean;
}
declare const template: ({ name, description, icon, install, fallback, howToRequested, inAppBrowser }: BottomSheetTemplateOptions) => import("lit-html").TemplateResult<1>;
export default template;
