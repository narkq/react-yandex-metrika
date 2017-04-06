/* eslint-env browser */
'use strict';

import { CALLBACKS, ACCOUNTS, tracker } from './constants';

var isBrowser = typeof window !== 'undefined';

function ymProxy(methodName, ...args) {
    window[ACCOUNTS].forEach(id => {
        try {
            window[tracker(id)][methodName](...args);
        } catch (ex) {
            console.warn(ex);
        }
    });
}

function ymAsyncProxy(...args) {
    if (window[CALLBACKS]) {
        window[CALLBACKS].push(() => ymProxy(...args));
    } else {
        ymProxy(...args);
    }
}

function ym(...args) {
    if (isBrowser) {
        ymAsyncProxy(...args);
    }
}

export default ym;
export { YMInitializer } from './component';
