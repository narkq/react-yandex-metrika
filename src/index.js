/* eslint-env browser */
/* global Ya */
'use strict';

import component from './component';

var isBrowser = typeof window !== 'undefined';
var c = 'yandex_metrika_callbacks';
var a = 'yandex_metrika_accounts';

if (isBrowser) {
    window[c] = window[c] || [];
    window[a] = window[a] || [];
}

function ym(methodName, ...args) {
    if (isBrowser) {
        window[c].push(() => {
            window[a].forEach(id => {
                try {
                    window[`yaCounter${id}`][methodName](...args);
                } catch(ex) {
                    console.warn(ex);
                }
            });
        });
    }
}

ym.Initializer = component;

ym.initAccount = function initAccount(id, options = {}) {
    if (isBrowser) {
        let defaultOptions = {
            id,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true
        };

        window[a].push(id);
        window[c].push(() => {
            try {
                window[`yaCounter${id}`] = new Ya.Metrika(
                    Object.assign(defaultOptions, options)
                );
            } catch(ex) {
                console.warn(ex);
            }
        });
    }
};

export default ym;
