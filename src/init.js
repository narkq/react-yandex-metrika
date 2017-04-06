/* eslint-env browser */
/* global Ya */

import { CALLBACKS, ACCOUNTS, tracker } from './constants';

export default function init(accounts, options = {}) {
    window[CALLBACKS] = window[CALLBACKS] || [];
    window[ACCOUNTS] = window[ACCOUNTS] || [];
    window[ACCOUNTS] = window[ACCOUNTS].concat(accounts);
    window[CALLBACKS].push(() => {
        window[ACCOUNTS].forEach(id => {
            let defaultOptions = {id};

            try {
                window[tracker(id)] = new Ya.Metrika(
                    Object.assign(defaultOptions, options)
                );
            } catch (ex) {
                console.warn(ex);
            }
        });
    });
};
