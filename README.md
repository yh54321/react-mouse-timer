# react-mouse-timer
React hook resolving if mouse has moved in previous period of time

[![npm version](https://img.shields.io/npm/v/react-mouse-timer.svg?style=flat)](https://www.npmjs.com/package/react-mouse-timer)

# Usage Example
```JavaScript
import useMouseTimer from 'react-mouse-timer';

function MyComponent () {
  const mouseMoved3 = useMouseTimer(3000); // 'true' if mouse moved in last 3 seconds
  const mouseMoved10 = useMouseTimer(10000); // This is safe, hook can be used multiple times without creating needless event listeners + timers, even across files + components
  
  return (
    <div>
      {mouseMoved3 && <p>Mouse has moved in last 3 seconds!</p>}
      {mouseMoved10 && <p>Mouse has moved in last 10 seconds!</p>}
    </div>
  )
}
```

# Parameters

## ms : number
#### Default value: `undefined`
Number of previously elapsed milliseconds for checking mouse movement. Must be greater than 0
