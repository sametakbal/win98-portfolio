
import type { Component } from 'solid-js'
import { createSignal, onMount, For } from 'solid-js'
import './Paint.css'

interface Point {
    x: number
    y: number
}

type Tool = 'pencil' | 'brush' | 'eraser' | 'line' | 'rectangle' | 'circle' | 'fill'

const Paint: Component = () => {
    let canvasRef: HTMLCanvasElement | undefined
    const [context, setContext] = createSignal<CanvasRenderingContext2D | null>(null)
    const [selectedTool, setSelectedTool] = createSignal<Tool>('pencil')
    const [selectedColor, setSelectedColor] = createSignal<string>('#000000') // Foreground
    const [secondaryColor, setSecondaryColor] = createSignal<string>('#ffffff') // Background
    const [isDrawing, setIsDrawing] = createSignal(false)
    const [startPos, setStartPos] = createSignal<Point | null>(null)
    const [snapshot, setSnapshot] = createSignal<ImageData | null>(null)

    const colors = [
        '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080ff', '#004080', '#8000ff', '#804000',
        '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffff80', '#00ff80', '#80ffff', '#8080ff', '#ff8000', '#ff8080'
    ]

    onMount(() => {
        if (canvasRef) {
            const ctx = canvasRef.getContext('2d', { willReadFrequently: true })
            if (ctx) {
                // Initialize white background
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, canvasRef.width, canvasRef.height)
                setContext(ctx)
            }
        }
    })

    const getMousePos = (e: MouseEvent): Point => {
        if (!canvasRef) return { x: 0, y: 0 }
        const rect = canvasRef.getBoundingClientRect()
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    const startDrawing = (e: MouseEvent) => {
        if (!context()) return

        // Handle right click (secondary color) vs left click (primary)
        const isRightClick = e.button === 2
        const color = isRightClick ? secondaryColor() : selectedColor()

        setIsDrawing(true)
        const pos = getMousePos(e)
        setStartPos(pos)

        context()!.beginPath()
        context()!.moveTo(pos.x, pos.y)
        context()!.strokeStyle = color
        context()!.fillStyle = color
        context()!.lineWidth = selectedTool() === 'brush' ? 5 : 1

        if (selectedTool() === 'fill') {
            floodFill(pos.x, pos.y, color)
            setIsDrawing(false)
        } else {
            // Save state for shape preview
            setSnapshot(context()!.getImageData(0, 0, canvasRef!.width, canvasRef!.height))

            // Draw initial dot for drawing tools
            if (['pencil', 'brush', 'eraser'].includes(selectedTool())) {
                context()!.lineTo(pos.x, pos.y)
                context()!.stroke()
            }
        }
    }

    const draw = (e: MouseEvent) => {
        if (!isDrawing() || !context() || !startPos()) return
        const pos = getMousePos(e)
        const ctx = context()!

        if (['line', 'rectangle', 'circle'].includes(selectedTool())) {
            // Restore snapshot to clear previous frame of shape preview
            if (snapshot()) {
                ctx.putImageData(snapshot()!, 0, 0)
            }
        }

        ctx.beginPath()

        const isRightClick = e.buttons === 2
        const color = isRightClick ? secondaryColor() : selectedColor()

        ctx.strokeStyle = selectedTool() === 'eraser' ? secondaryColor() : color
        ctx.fillStyle = selectedTool() === 'eraser' ? secondaryColor() : color

        if (selectedTool() === 'eraser') {
            ctx.lineWidth = 10
        }

        switch (selectedTool()) {
            case 'pencil':
            case 'brush':
            case 'eraser':
                ctx.moveTo(startPos()!.x, startPos()!.y) // Move to last position to ensure continuity
                ctx.lineTo(pos.x, pos.y)
                ctx.stroke()
                setStartPos(pos) // Update start position for next segment
                break
            case 'line':
                ctx.moveTo(startPos()!.x, startPos()!.y)
                ctx.lineTo(pos.x, pos.y)
                ctx.stroke()
                break
            case 'rectangle':
                const w = pos.x - startPos()!.x
                const h = pos.y - startPos()!.y
                ctx.strokeRect(startPos()!.x, startPos()!.y, w, h)
                break
            case 'circle':
                const radius = Math.sqrt(Math.pow(pos.x - startPos()!.x, 2) + Math.pow(pos.y - startPos()!.y, 2))
                ctx.arc(startPos()!.x, startPos()!.y, radius, 0, 2 * Math.PI)
                ctx.stroke()
                break
        }
    }

    const stopDrawing = () => {
        setIsDrawing(false)
        setStartPos(null)
        if (context()) {
            context()!.closePath()
        }
    }

    // Simplified Flood Fill (Recursive - caution with stack size on large areas, optimized version preferred for prod)
    // Using a non-recursive approach to avoid stack overflow
    const floodFill = (startX: number, startY: number, fillColor: string) => {
        const ctx = context()!
        const canvas = canvasRef!
        const width = canvas.width
        const height = canvas.height

        // Convert fill color to RGBA
        ctx.fillStyle = fillColor
        // Create a temporary 1x1 rect to get the RGBA values of the fill color
        // This is a bit hacky but works cleanly without parsing hex
        // Actually, let's just parse the hex/string to RGBA for comparison
        // to properly match the integer data from ImageData

        // Helper to get pixel color at x,y
        const imageData = ctx.getImageData(0, 0, width, height)
        const data = imageData.data

        const getPixel = (x: number, y: number) => {
            if (x < 0 || y < 0 || x >= width || y >= height) return -1
            const offset = (y * width + x) * 4
            return (data[offset] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8) | data[offset + 3]
        }

        const targetColor = getPixel(startX, startY)

        // Parse fill color
        const div = document.createElement('div')
        div.style.color = fillColor
        document.body.appendChild(div)
        const computedColor = window.getComputedStyle(div).color
        document.body.removeChild(div)
        const match = computedColor.match(/rgba?\((\d+), (\d+), (\d+)(?:, (\d+))?\)/)
        if (!match) return;

        const r = parseInt(match[1])
        const g = parseInt(match[2])
        const b = parseInt(match[3])
        const a = match[4] ? parseInt(match[4]) * 255 : 255
        const replacementColor = (r << 24) | (g << 16) | (b << 8) | a

        if (targetColor === replacementColor) return

        const queue: Point[] = [{ x: startX, y: startY }]

        while (queue.length > 0) {
            const { x, y } = queue.pop()!

            const offset = (y * width + x) * 4
            const currentColor = (data[offset] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8) | data[offset + 3]

            if (currentColor === targetColor) {
                data[offset] = r
                data[offset + 1] = g
                data[offset + 2] = b
                data[offset + 3] = a // Alpha

                queue.push({ x: x + 1, y: y })
                queue.push({ x: x - 1, y: y })
                queue.push({ x: x, y: y + 1 })
                queue.push({ x: x, y: y - 1 })
            }
        }

        ctx.putImageData(imageData, 0, 0)
    }

    const handleColorClick = (color: string, e: MouseEvent) => {
        if (e.button === 2) {
            e.preventDefault()
            setSecondaryColor(color)
        } else {
            setSelectedColor(color)
        }
    }

    return (
        <div class="paint-container">
            <div class="paint-menu-bar">
                <span class="paint-menu-item">File</span>
                <span class="paint-menu-item">Edit</span>
                <span class="paint-menu-item">View</span>
                <span class="paint-menu-item">Image</span>
                <span class="paint-menu-item">Options</span>
                <span class="paint-menu-item">Help</span>
            </div>

            <div class="paint-workspace">
                <div class="paint-toolbar">
                    <div class={`tool-button ${selectedTool() === 'pencil' ? 'active' : ''}`} onClick={() => setSelectedTool('pencil')} title="Pencil">✎</div>
                    <div class={`tool-button ${selectedTool() === 'brush' ? 'active' : ''}`} onClick={() => setSelectedTool('brush')} title="Brush">🖌️</div>
                    <div class={`tool-button ${selectedTool() === 'fill' ? 'active' : ''}`} onClick={() => setSelectedTool('fill')} title="Fill with Color">🪣</div>
                    <div class={`tool-button ${selectedTool() === 'eraser' ? 'active' : ''}`} onClick={() => setSelectedTool('eraser')} title="Eraser">🧹</div>
                    <div class={`tool-button ${selectedTool() === 'line' ? 'active' : ''}`} onClick={() => setSelectedTool('line')} title="Line">📏</div>
                    <div class={`tool-button ${selectedTool() === 'rectangle' ? 'active' : ''}`} onClick={() => setSelectedTool('rectangle')} title="Rectangle">▭</div>
                    <div class={`tool-button ${selectedTool() === 'circle' ? 'active' : ''}`} onClick={() => setSelectedTool('circle')} title="Ellipse">○</div>
                </div>

                <div class="paint-canvas-area">
                    <canvas
                        ref={canvasRef}
                        width={600}
                        height={400}
                        class="paint-canvas"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </div>
            </div>

            <div class="paint-color-palette">
                <div class="current-colors">
                    <div class="color-box background-color-box" style={{ "background-color": secondaryColor() }}></div>
                    <div class="color-box foreground-color-box" style={{ "background-color": selectedColor() }}></div>
                </div>

                <div class="palette-grid">
                    <For each={colors}>
                        {(color) => (
                            <div
                                class="palette-color"
                                style={{ "background-color": color }}
                                onMouseDown={(e) => handleColorClick(color, e)}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        )}
                    </For>
                </div>
            </div>

            <div class="paint-status-bar">
                <span>For Help, click Help Topics on the Help Menu.</span>
            </div>
        </div>
    )
}

export default Paint
