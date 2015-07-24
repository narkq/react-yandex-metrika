/* eslint-env browser */
'use strict';

import React from 'react';

var {script} = React.DOM;

export default React.createClass({
    displayName: 'YMInitializer',

    componentDidMount() {
        let insertPoint = document.getElementsByTagName('script')[0];
        let el = document.createElement('script');
        el.type = 'text/javascript';
        el.async = true;
        el.src = 'https://mc.yandex.ru/metrika/watch.js';
        insertPoint.parentNode.insertBefore(el, insertPoint);
    },

    render() {
        return script(null);
    }
});
