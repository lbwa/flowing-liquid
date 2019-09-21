<h1 align="center">Vas</h1>

<p align="center">
  <img align="center" src="./config/preview.gif">
</p>

<p align="center">
  <a href="https://lbwa.github.io/vas.js">Preview</a>
</p>

<p align="center">
  <a href="https://lbwa.github.io/vas.js">
    <img src="https://img.shields.io/bundlephobia/minzip/vasjs.svg?style=flat-square" alt="npm bundle size"/>
  </a>
  <a href="https://www.npmjs.com/package/vasjs">
    <img src="https://img.shields.io/npm/dt/vasjs.svg?style=flat-square" alt="npm"/>
  </a>
  <a href="https://www.npmjs.com/package/vasjs">
    <img alt="npm" src="https://img.shields.io/npm/v/vasjs.svg?logo=npm&style=flat-square">
  </a>
  <a href="https://github.com/lbwa/vas.js/releases">
    <img alt="GitHub release" src="https://img.shields.io/github/release/lbwa/vas.js.svg?logo=github&style=flat-square">
  </a>
  <a href="https://github.com/lbwa/vas.js/pulls?q=is%3Apr+is%3Aclosed">
    <img alt="GitHub closed pull requests" src="https://img.shields.io/github/issues-pr-closed/lbwa/vas.js.svg?logo=github&style=flat-square">
  </a>
  <a href="https://github.com/lbwa/vas.js/actions">
    <img alt="github workflow" src="https://github.com/lbwa/vas.js/workflows/Deployment/badge.svg">
  </a>
</p>

> Vas which is taken from the letters of [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) is a independent component for simplifying wave-like chart building.

## Features

1. **Minimal** ✔️

   - Less than **2** kB with minified and gzipped.

1. **Support any shapes** ✔️

   - You can define single or multiple shapes for waves container or anything you want to do via `render` option.

1. **Portable** ✔️

   - Just need 3 required parameters to create your own fantastic canvas wave-like animation.

     - Canvas element

     - Wave height

     - All members of waves

     All other options is optional.

1. **No any third party dependence** ✔️

   - 100% independent.

## Installation

```bash
# yarn
yarn add vasjs

# npm
npm i vasjs --save
```

## Wave options

Those options is used to control every single wave-like fluid.

```ts
interface WaveOption {
  waveHeight: number
  color: string
  progress?: number
  offset?: number
  speed?: number
}
```

| Wave options | required |               default               | description                                                                                                                                                                                  |
| :----------: | :------: | :---------------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  waveHeight  |    ✔️    |                 N/A                 | wave height                                                                                                                                                                                  |
|    color     |    /     |              `#243d71`              | wave color                                                                                                                                                                                   |
|   progress   |    /     |                  0                  | wave level based on **the bottom of canvas container**                                                                                                                                       |
|    offset    |    /     |                  0                  | wave offset is used for **frozen** waves which means only works with speed zero                                                                                                              |
|    speed     |    /     |   `GlobalOptions.speed` or `-0.1`   | The flowing direction is from right to left when you set a positive value, otherwise, from left to right. Wave is static with zero speed. (Priority is **higher** than global speed options) |
|    period    |    /     | Global [period](#global-api) option | Period of current wave                                                                                                                                                                       |

**NOTICE**

- Wave body will be frozen when you set a **0** to wave `speed` option.

## Global API

```ts
interface GlobalOptions {
  el: string | HTMLCanvasElement
  height?: number
  width?: number
  speed?: number
  waves: WaveOption | WaveOption[]
  render?: (instance: Vas) => void
}
```

|  API   | required |                                              default                                              | description                                                                                                                                     |
| :----: | :------: | :-----------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|   el   |    ✔️    |                                                N/A                                                | A canvas element or selector                                                                                                                    |
| width  |    /     |                                               `300`                                               | [Canvas width][canvas width]                                                                                                                    |
| height |    /     |                                               `300`                                               | [Canvas height][canvas height]                                                                                                                  |
| speed  |    /     |                                              `-0.5`                                               | The flowing direction is from right to left when you set a positive value, otherwise, from left to right. All waves are static with zero speed. |
| waves  |    ✔️    |                                                N/A                                                | Every flowing wave with its options                                                                                                             |
| render |    /     |                                                N/A                                                | Define a render function which will pass a Vas instance including [CanvasRenderingContext2D]                                                    |
| period |    /     | The value of a number rounded to the nearest quotient between global width and default lambda 60. | The period of waves                                                                                                                             |

[canvas width]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/width
[canvas height]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/height
[canvasrenderingcontext2d]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

**NOTICE**

1. `GlobalOptions.speed` has a **lower** priority than `WaveOptions.speed`.

1. The last one of `GlobalOptions.waves` always be the **top** element in the scene.

1. You should be careful about `render` options and color alpha value, because color alpha value could occur **color composite**.

   ```ts
   import Vas from 'vasjs'

   new Vas({
     // other options ...
     render: ({ ctx }: Vas) => {
       // There are properties including current canvas context, do anything you want to do.
       // All context state will be saved before render calling, then restored after render calling
     }
   })
   ```

## Instantiation

- Minimal version

```ts
import Vas from 'vasjs'

new Vas({
  el: '#canvas',
  waves: [
    {
      waveHeight: 30
    }
  ]
})
```

You will see **one** wave with **wave level 0**.

- Complex version

```ts
import Vas from 'vasjs'

enum WAVE_COLOR {
  '#42b9fb',
  '#117dc4',
  '#1254a4',
  '#243d71'
}

new Vas({
  el: '#draw',
  width: 300,
  height: 300,
  speed: -0.2,
  waves: [
    {
      waveHeight: 30,
      color: WAVE_COLOR[3],
      progress: 55,
      offset: 70 // It will be ignored When speed option is not zero
    },
    {
      waveHeight: 30,
      color: WAVE_COLOR[2],
      progress: 50,
      offset: 70,
      speed: -0.5
    },
    {
      waveHeight: 30,
      color: WAVE_COLOR[1],
      progress: 45,
      speed: 1
    },
    { waveHeight: 30, color: WAVE_COLOR[0], progress: 40 }
  ]
})
```

You will see **4** waves in the canvas container. `waves[0]`, `waves[1]`, `waves[3]` are flowing from left to right, `waves[2]` is flowing from right to left.

- with [helper](./src/helper.ts) functionalities, only support `border` temporarily.

```ts
import Vas, { border } from 'vasjs'

new Vas({
  // other options...
  render: border({
    // inner: 'white',
    // outer: '#ccefff'
  })
  // extra options ...
})
```

You will see the shapes like [demo](https://lbwa.github.io/vas.js) page style.

## Instance methods

```ts
const scene = new Vas({
  /* omit options ... */
})
```

All following APIs are based on a `Vas` instance.

|               API                |        Description         |
| :------------------------------: | :------------------------: |
| [destroy](#destroy-vas-instance) | Destroy all render process |

### Destroy Vas instance

- `destroy`: (fn?: Function | undefined) => void

This method which accepts a callback function will stop all render process.

```ts
scene.destroy()
// or
scene.destroy(() => console.log('Destroyed !'))
```

## Hight resolution adaptation

Hight resolution adaptation based on `window.devicePixelRatio` has been supported by default (since `v2.2.0`).

If you need to change default ratio:

```ts
import Vas from 'vasjs'

new Vas({
  devicePixelRatio: YOUR_RATIO // should be greater than one
  // omit other options ...
})
```

## Changelog

All notable changes to this project will be documented in [CHANGELOG](./CHANGELOG.md) file.

## License

MIT © [Bowen Liu](https://github.com/lbwa)
