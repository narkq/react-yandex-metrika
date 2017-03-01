react-yandex-metrika
======================

Adds the Yandex.Metrika script to your page and exposes the `ym` tracking
function as a module.

Inspired by and shamelessly copied from [react-google-analytics](https://github.com/hzdg/react-google-analytics).

Usage:

```javascript
import {Initializer as YM} from 'react-yandex-metrika';
```
Use the initializer to add the script to your page somewhere:
```javascript
var MyComponent = React.createClass({
  render: function() {
    return (
      <div>
        // SNIP
          <YM />
        // SNIP
      </div>
    );
  }
});
```
OR
```javascript
var MyComponent = React.createClass({
  render: function() {
    return (
      <YM>
        // JSX
      <YM />
    );
  }
});
```

Also, you need to initialize the tracker object once:

```javascript
// This is supposed to be executed only in browser and only once.
// Because of that, the most sensible place for this code is right after you javascript bundle.
ym.init([987654321]);
```

You can create several identical trackers (that might be useful for domain-wise segmentation):

```javascript
// If you specify several tracker ids, each event will be sent to all of them.
ym.init([98765, 4321]);
```

You can specify options for tracker (as described in [Yandex.Metrika documentation](https://help.yandex.ru/metrika/objects/creating-object.xml)):

```javascript
// by default this library specifies only tracker id
ym.init([987654321], {defer: true});
```

Elsewhere, use the `ym` function:

```javascript
import ym from 'react-yandex-metrika';
ym('hit', '/cart');
ym('reachGoal', 'whateverGoal', {awesomeParameter: 42});
```
