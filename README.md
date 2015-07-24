react-yandex-metrika
======================

Adds the Yandex.Metrika script to your page and exposes the `ym` tracking
function as a module.

Inspired by and shamelessly copied from [react-google-analytics](https://github.com/hzdg/react-google-analytics).

Usage:

```javascript
import {Initializer as YM} from 'react-yandex-metrika';

// Use the initializer to add the script to your page somewhere.
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

Also, you need to initialize the tracker object once:

```javascript
// This is supposed to be executed only in browser and only once.
// If you specify several tracker ids, each event will be sent to all of them.
ym.init([987654321]);
```

Elsewhere, use the `ym` function:

```javascript
import ym from 'react-yandex-metrika';
ym('hit', '/cart');
ym('reachGoal', 'whateverGoal', {awesomeParameter: 42});
```
