/* eslint-env browser */
'use strict';

import {
    accountListName,
    callbackQueueName,
    trackerInstanceName,
    trackerVersionName
} from './constants';

var isBrowser = typeof window !== 'undefined';

function ymProxy(id, methodName, ...args) {
    try {
        window[trackerInstanceName(id)][methodName](...args);
    } catch (ex) {
        console.warn(ex);
    }
}

function ymAsyncProxy(...args) {
    window[accountListName].forEach(id => {
        let trackerVersion = window[trackerVersionName(id)];
        let callbackQueue = window[callbackQueueName(trackerVersion)];
        if (callbackQueue) {
            callbackQueue.push(() => ymProxy(id, ...args));
        } else {
            ymProxy(id, ...args);
        }
    });
}

function ym(...args) {
    if (isBrowser) {
        ymAsyncProxy(...args);
    }
}

export default ym;
export { YMInitializer } from './component';
