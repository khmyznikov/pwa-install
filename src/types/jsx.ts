import type { PWAInstallElement } from '../index';
import type { PWAInstallAttributes } from './types';

export type PWAInstallProps = Partial<PWAInstallElement> &
    PWAInstallAttributes &
    React.HTMLAttributes<HTMLElement> & {
        children?: React.ReactNode;
    };

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'pwa-install': PWAInstallProps;
        }
    }

    namespace React.JSX {
        interface IntrinsicElements {
            'pwa-install': PWAInstallProps;
        }
    }
}

export {};
