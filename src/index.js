/* eslint-env browser */
'use strict';

import {
    accountListName,
    callbackQueueName,
    trackerInstanceName,
    trackerVersionName
} from './constants';

function ymProxy(id, methodName, ...args) {
    try {
        window[trackerInstanceName(id)][methodName](...args);
    } catch (ex) {
        console.warn(ex);
    }
}

function accountIdList() {
    return typeof window !== 'undefined' ? window[accountListName] : [];
}

function ymAsyncProxy(ids) {
    return function (...args) {
        ids.forEach(id => {
            let trackerVersion = window[trackerVersionName(id)];
            let callbackQueue = window[callbackQueueName(trackerVersion)];
            if (callbackQueue) {
                callbackQueue.push(() => ymProxy(id, ...args));
            } else {
                ymProxy(id, ...args);
            }
        });
    };
}

function ym(...args) {
    return ymAsyncProxy(accountIdList())(...args);
}

export function withId(counterId) {
    return withFilter(id => counterId === id);
}

export function withFilter(f) {
    return ymAsyncProxy(accountIdList().filter(f));
}

export default ym;
export { YMInitializer } from './component';
