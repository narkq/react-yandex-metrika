/* eslint-disable curly */

let accountListName = 'yandex_metrika_accounts';

function invalidVersion() {
    throw new Error('invalid Ya.Metrika version');
}

function callbackQueueName(version) {
    if (version === '1') return 'yandex_metrika_callbacks';
    if (version === '2') return 'yandex_metrika_callbacks2';
    invalidVersion();
}

function scriptPath(version) {
    if (version === '1') return 'https://mc.yandex.ru/metrika/watch.js';
    if (version === '2') return 'https://mc.yandex.ru/metrika/tag.js';
    invalidVersion();
}

function trackerConstructorName(version) {
    if (version === '1') return 'Metrika';
    if (version === '2') return 'Metrika2';
    invalidVersion();
}

function trackerInstanceName(id) {
    return `yaCounter${id}`;
}

function trackerVersionName(id) {
    return `yaCounterVersion${id}`;
}

export {
    accountListName,
    callbackQueueName,
    scriptPath,
    trackerConstructorName,
    trackerInstanceName,
    trackerVersionName
};
