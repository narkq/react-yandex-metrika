react-yandex-metrika
======================

Adds the Yandex.Metrika script to your page and exposes the `ym` tracking
function as a module.

Inspired by and shamelessly copied from [react-google-analytics](https://github.com/hzdg/react-google-analytics).

Usage:

Use the initializer to add the script to your page somewhere:
```javascript
import { YMInitializer } from 'react-yandex-metrika';

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        // SNIP
          <YMInitializer accounts={[987654321]} />
        // SNIP
      </div>
    );
  }
});
```

Please note that you need to initialize the tracker object only once.
Because of that, you should insert initializer to the place where it won't be remounted (that means at least outside of router scope).  
If you want to use [webvisor](https://metrika.yandex.ru/promo/webvisor), you should pass `options={{webvisor: true}}` to to `YMInitializer`, for example:
```
<YMInitializer accounts={[987654321]} options={{webvisor: true}}/>
```


You can create several identical trackers (that might be useful for domain-wise segmentation).
```javascript
<YMInitializer accounts={[98765, 4321]} />
```

You can also specify options for tracker (as described in [Yandex.Metrika documentation](https://help.yandex.ru/metrika/objects/creating-object.xml)):
```javascript
<YMInitializer accounts={[98765]} options={{defer: true}} />
```

Elsewhere, use the `ym` function:

```javascript
import ym from 'react-yandex-metrika';
ym('hit', '/cart');
ym('reachGoal', 'whateverGoal', {awesomeParameter: 42});
```

### Webvisor 2.0 support

See [#6](https://github.com/narkq/react-yandex-metrika/issues/6) for details.
```javascript
<YMInitializer accounts={[31337]} options={{webvisor: true}} version="2" />
```

### Migration from 1.0

- Replace `import { Initializer }` to `import { YMInitializer }`.
- Remove `ym.init()` call. Pass arguments of `ym.init` as props to the `YMInitializer` component.
  Tracking will be initialized on `YMInitializer.componentDidMount`.
