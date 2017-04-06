/* eslint-env browser */
'use strict';

import React, { Component, DOM, PropTypes } from 'react';
import init from './init';

class YMInitializer extends Component {

    componentDidMount() {
        init(this.props.accounts, this.props.options);
        let insertPoint = document.getElementsByTagName('script')[0];
        let el = document.createElement('script');
        el.type = 'text/javascript';
        el.async = true;
        el.src = 'https://mc.yandex.ru/metrika/watch.js';
        insertPoint.parentNode.insertBefore(el, insertPoint);
    }

    render() {
        return this.props.children || DOM.script(null);
    }

}

YMInitializer.displayName = 'YMInitializer';

YMInitializer.propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.number).isRequired,
    options: PropTypes.object
};

YMInitializer.defaultProps = {
    options: {}
};

export { YMInitializer };
