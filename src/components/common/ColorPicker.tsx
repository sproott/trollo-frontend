import React, { CSSProperties, MouseEvent, TouchEvent, useEffect, useRef, useState } from "react"

import _ from "lodash"
import styled from "styled-components"

const insideBox = (
  [x, y]: [number, number],
  [x1, y1, x2, y2]: [number, number, number, number]
) => {
  return x >= x1 && x <= x2 && y >= y1 && y <= y2
}

type CursorProps = { canvasWidth: number; offset: number }

const padding = 12
const height = 15

const Cursor = styled("span").attrs(({ canvasWidth, offset }: CursorProps) => ({
  style: {
    transform: `translateY(calc(-${height}px / 4 - 1px)) translateX(calc(${
      -(1 - offset) * canvasWidth
    }px - 50%))`,
  },
}))<CursorProps>`
  position: absolute;
  height: ${2 * padding}px;
  width: ${2 * padding}px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #aaa;
  display: inline-block;
`

const ColorPicker = ({
  onDragEnd,
  onChange,
  value,
  style,
}: {
  onDragEnd?: () => void
  onChange: (offset: number) => void
  value: number
  style?: CSSProperties
}) => {
  const canvasRef = useRef<HTMLCanvasElement>()
  const divRef = useRef<HTMLDivElement>()
  const [canvasWidth, setCanvasWidth] = useState<number>()
  const [dragging, setDragging] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // change offset depending on mouse X coord
  const move = (clientX: number) => {
    const relXOffset = _.clamp(
      clientX - canvasRef.current.getBoundingClientRect().x,
      0,
      canvasWidth
    )
    onChange(Math.round((360 * relXOffset) / canvasWidth))
  }
  // mouse click on the scale
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    move(e.clientX)
    setDragging(true)
  }
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    move(e.changedTouches[0].clientX)
    setDragging(true)
  }
  // mouse entering from outside
  const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (e.buttons > 0) setDragging(true)
  }
  // mouse drag
  const drag = (e: MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      move(e.clientX)
    }
  }
  const touchDrag = (e: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e.changedTouches[0]
    const { left, top, right, bottom } = divRef.current.getBoundingClientRect()
    if (insideBox([clientX, clientY], [left, top, right, bottom])) {
      move(e.changedTouches[0].clientX)
      setDragging(true)
    } else {
      setDragging(false)
    }
  }
  // when viewport size changes
  const onWindowResize = () => {
    if (canvasRef.current) {
      setCanvasWidth(canvasRef.current.getBoundingClientRect().width)
    }
  }

  // generate canvas gradient
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const hueStepCount = 359
    const stepSize = canvas.width / hueStepCount
    const colorFrom = (i: number) => `hsl(${i}, 100%, 50%)`
    for (let i = 0; i < hueStepCount; i++) {
      const grd = ctx.createLinearGradient(0, 0, 1, 0)
      grd.addColorStop(0, colorFrom(i))
      grd.addColorStop(1, colorFrom(i + 1))
      ctx.fillStyle = grd
      ctx.fillRect(i * stepSize, 0, (i + 1) * stepSize, canvas.height)
    }
  }, [])
  // update on drag end
  useEffect(() => {
    if (initialized) {
      if (!dragging && onDragEnd) {
        onDragEnd()
      }
    } else {
      setInitialized(true)
    }
  }, [dragging])
  // for cursor positioning update when resizing viewport
  useEffect(() => {
    window.addEventListener("resize", onWindowResize)
    return () => window.removeEventListener("resize", onWindowResize)
  }, [])
  // set canvasWidth when canvasRef is set
  useEffect(() => {
    if (!!canvasRef && canvasWidth === undefined) {
      setCanvasWidth(canvasRef.current.getBoundingClientRect().width)
    }
  }, [canvasRef])

  return (
    <div
      style={{
        width: "100%",
        ...style,
        height: `${height + 2 * padding}px`,
        cursor: dragging ? "grabbing" : "grab",
        padding: "12px",
        boxSizing: "border-box",
      }}
      onMouseMove={drag}
      onTouchMove={touchDrag}
      onMouseLeave={setDragging.bind(this, false)}
      onMouseEnter={onMouseEnter}
      onMouseUp={setDragging.bind(this, false)}
      onTouchEnd={setDragging.bind(this, false)}
      onMouseDown={onClick}
      onTouchStart={onTouchStart}
      ref={divRef}
    >
      <canvas
        ref={canvasRef}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "9999px",
        }}
      />
      {canvasWidth !== undefined && (
        <Cursor
          canvasWidth={canvasWidth}
          offset={value / 360}
          onMouseDown={setDragging.bind(this, true)}
        />
      )}
    </div>
  )
}

export default ColorPicker
