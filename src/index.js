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

function ymAsyncProxy(counterId, ...args) {
    window[accountListName]
        .filter(id => counterId === undefined || counterId == id)
        .forEach(id => {
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
    ym2(undefined, ...args);
}

// rename it at your discretion
export function ym2(counterId, ...args) {
    if (isBrowser) {
        ymAsyncProxy(counterId, ...args);
    }
}

export default ym;
export { YMInitializer } from './component';
