/* eslint-env browser */
/* global Ya */
'use strict';

import component from './component';

var isBrowser = typeof window !== 'undefined';
var c = 'yandex_metrika_callbacks';
var a = 'yandex_metrika_accounts';

function ymProxy(methodName, ...args) {
    window[a].forEach(id => {
        try {
            window[`yaCounter${id}`][methodName](...args);
        } catch(ex) {
            console.warn(ex);
        }
    });
}

function ymAsyncProxy(...args) {
    if (window[c]) {
        window[c].push(() => ymProxy(...args));
    } else {
        ymProxy(...args);
    }
}

function ym(...args) {
    if (isBrowser) {
        ymAsyncProxy(...args);
    }
}

ym.Initializer = component;

ymAsyncProxy.init = function init(accounts, options = {}) {
    window[a] = window[a].concat(accounts);
    window[c].push(() => {
        window[a].forEach(id => {
            let defaultOptions = {
                id,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
            };

            try {
                window[`yaCounter${id}`] = new Ya.Metrika(
                    Object.assign(defaultOptions, options)
                );
            } catch(ex) {
                console.warn(ex);
            }
        });
    });
};

if (isBrowser) {
    window[c] = window[c] || [];
    window[a] = window[a] || [];
    window.ym = ymAsyncProxy;
}

export default ym;
