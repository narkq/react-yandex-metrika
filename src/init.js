/* eslint-env browser */
/* global Ya */

import {
    accountListName,
    callbackQueueName,
    trackerConstructorName,
    trackerInstanceName,
    trackerVersionName
} from './constants';

export default function init(accounts, options = {}, version = '1') {
    let callbackQueue = callbackQueueName(version);
    window[accountListName] = window[accountListName] || [];
    window[accountListName] = window[accountListName].concat(accounts);
    window[callbackQueue] = window[callbackQueue] || [];
    window[callbackQueue].push(() => {
        accounts.forEach(id => {
            let defaultOptions = {id};

            window[trackerInstanceName(id)] = new Ya[trackerConstructorName(version)](
                Object.assign(defaultOptions, options)
            );
        });
    });
    accounts.forEach(id => {
        window[trackerVersionName(id)] = version;
    });
};
