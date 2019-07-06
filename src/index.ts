import { assert } from '@/_utils'

const _worker = (function() {
  return (
    window.requestAnimationFrame.bind(window) ||
    window.webkitRequestAnimationFrame.bind(window) ||
    (window as any).mozRequestAnimationFrame.bind(window) ||
    (window as any).oRequestAnimationFrame.bind(window) ||
    (window as any).msRequestAnimationFrame.bind(window) ||
    function(callback) {
      return window.setTimeout(callback, 1000 / 60)
    }
  )
})()

interface VasConstructor {
  el: string | Element
  height: string | number
  width: string | number
}

class Vas {
  el: HTMLCanvasElement
  height: number
  width: number
  ctx: CanvasRenderingContext2D

  constructor({ el, height, width }: VasConstructor) {
    const element = el instanceof Element ? el : document.querySelector(el)
    assert(element, `${el} is not a HTML element.`)

    this.el = element as HTMLCanvasElement
    this.height = this.el.height =
      typeof height === 'number' ? height : parseInt(height)
    this.width = this.el.width =
      typeof width === 'number' ? width : parseInt(width)
    this.ctx = this.el.getContext('2d') as CanvasRenderingContext2D

    assert(
      this.ctx,
      'Unable to initialize Canvas. Your browser or machine may not support it.'
    )

    this.clear()
    this.render()
  }

  clear() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.width, this.height)
  }

  render() {
    this.renderFlow()
    this.ctx.globalCompositeOperation = 'destination-atop'
    this.renderCircle({
      radius: this.width / 2 - 0.06 * this.width,
      color: 'rgba(1, 174, 255, 0.8)'
    })
    this.ctx.globalCompositeOperation = 'destination-over'
    this.renderCircle({ color: 'rgba(1, 174, 255, 0.2)' })
    // this.ctx.globalCompositeOperation = 'source-over' // default value
    // _worker(this.render.bind(this))
  }

  renderCircle({
    x = this.width / 2,
    y = this.height / 2,
    radius = this.width / 2,
    startAngle = 0,
    endAngle = 2 * Math.PI,
    anticlockwise,
    color
  }: {
    x?: number
    y?: number
    radius?: number
    startAngle?: number
    endAngle?: number
    anticlockwise?: boolean | undefined
    color: string
  }) {
    const { ctx } = this
    ctx.beginPath()
    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
  }

  renderFlow() {
    const { ctx, width: waveTotalLength, height } = this

    const centerY = height / 2
    const startX = 0
    const startY = centerY + 90

    /**
     * @description Similar to wave spatial frequency, but this describe how
     *  many period exist in entries life-cycle, not unit of space
     * @wiki https://en.wikipedia.org/wiki/Spatial_frequency
     */
    const waveTotalPeriods = 5
    //
    /**
     * @description The distance over which the wave's shape repeats
     * @wiki https://en.wikipedia.org/wiki/Wavelength
     */
    const waveLength = waveTotalLength / waveTotalPeriods
    const waveHeight = 10

    const progress = 0
    const offset = 0
    const offsetY = startY - (90 * 2 * progress) / 100
    const waveColor = 'white'

    ctx.fillStyle = waveColor
    ctx.beginPath()
    ctx.moveTo(startX - offset, offsetY)

    for (let i = 0; i < waveTotalPeriods; i++) {
      const dx = waveLength * i
      const offsetX = dx + startX - offset
      ctx.quadraticCurveTo(
        offsetX + waveLength / 4,
        offsetY + waveHeight,
        offsetX + waveLength / 2,
        offsetY
      )
      ctx.quadraticCurveTo(
        offsetX + waveLength / 4 + waveLength / 2,
        offsetY - waveHeight,
        offsetX + waveLength,
        offsetY
      )
    }

    ctx.lineTo(startX + waveTotalLength, height)
    ctx.lineTo(startX, height)
    ctx.fill()
    ctx.closePath()
  }
}

export default Vas
