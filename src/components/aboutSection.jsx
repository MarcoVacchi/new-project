'use client'

import React, {
    useRef,
    useEffect,
    useState,
    createElement,
    useMemo,
    useCallback,
    memo,
} from 'react'

// "Enum" Tag convertito a oggetto JS
export const Tag = {
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    P: 'p',
}

// Hook per view detection
function useIsInView(ref) {
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        if (!ref.current) return
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0, rootMargin: '50px' }
        )
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [ref])

    return isInView
}

// Component SEO per i tag nascosti
const SeoElement = memo(({ tag = Tag.P, texts }) => {
    const style = {
        position: 'absolute',
        width: '0',
        height: '0',
        overflow: 'hidden',
        userSelect: 'none',
        pointerEvents: 'none',
    }
    const safeTag = Object.values(Tag).includes(tag) ? tag : 'p'
    return createElement(safeTag, { style }, texts?.join(' '))
})

// Componente principale
export default function VaporizeTextCycle({
    texts = [
        "Sopravvissuto allo snap di thanos.",
        "A volte sparisco, ma torno sempre.",
        "Il caos è parte del mio codice.",
    ],
    font = { fontFamily: 'sans-serif', fontSize: '50px', fontWeight: 400 },
    color = 'rgb(255,255,255)',
    spread = 5,
    density = 5,
    animation = { vaporizeDuration: 2, fadeInDuration: 1, waitDuration: 0.5 },
    direction = 'left-to-right',
    alignment = 'center',
    tag = Tag.P,
}) {
    const canvasRef = useRef(null)
    const wrapperRef = useRef(null)
    const isInView = useIsInView(wrapperRef)
    const lastFontRef = useRef(null)
    const particlesRef = useRef([])
    const animationFrameRef = useRef(null)
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [animationState, setAnimationState] = useState('static')
    const vaporizeProgressRef = useRef(0)
    const fadeOpacityRef = useRef(0)
    const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 })
    const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true)

    const globalDpr = useMemo(
        () => (typeof window !== 'undefined' ? window.devicePixelRatio * 1.5 : 1),
        []
    )

    const wrapperStyle = { width: '100%', height: '100%', pointerEvents: 'none' }
    const canvasStyle = { minWidth: '30px', minHeight: '20px', pointerEvents: 'none' }

    const animationDurations = useMemo(
        () => ({
            VAPORIZE_DURATION: (animation.vaporizeDuration || 2) * 1000,
            FADE_IN_DURATION: (animation.fadeInDuration || 1) * 1000,
            WAIT_DURATION: (animation.waitDuration || 0.5) * 1000,
        }),
        [animation]
    )

    const fontConfig = useMemo(() => {
        const fontSize = parseInt(font.fontSize?.replace('px', '') || '50')
        const VAPORIZE_SPREAD = calculateVaporizeSpread(fontSize)
        return {
            MULTIPLIED_VAPORIZE_SPREAD: VAPORIZE_SPREAD * spread,
        }
    }, [font, spread])

    const memoizedUpdateParticles = useCallback(
        (particles, vaporizeX, deltaTime) =>
            updateParticles(
                particles,
                vaporizeX,
                deltaTime,
                fontConfig.MULTIPLIED_VAPORIZE_SPREAD,
                animationDurations.VAPORIZE_DURATION,
                direction,
                transformedDensity
            ),
        [fontConfig, animationDurations, direction, transformedDensity]
    )

    const memoizedRenderParticles = useCallback(
        (ctx, particles) => renderParticles(ctx, particles, globalDpr),
        [globalDpr]
    )

    // start / stop animation
    useEffect(() => {
        if (isInView) {
            const t = setTimeout(() => setAnimationState('vaporizing'), 0)
            return () => clearTimeout(t)
        } else {
            setAnimationState('static')
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        }
    }, [isInView])

    // animation loop
    useEffect(() => {
        if (!isInView) return
        let lastTime = performance.now()

        const animate = (time) => {
            const dt = (time - lastTime) / 1000
            lastTime = time
            const c = canvasRef.current
            const ctx = c?.getContext('2d')
            if (!c || !ctx || !particlesRef.current.length) {
                animationFrameRef.current = requestAnimationFrame(animate)
                return
            }
            ctx.clearRect(0, 0, c.width, c.height)

            switch (animationState) {
                case 'static':
                case 'waiting':
                    memoizedRenderParticles(ctx, particlesRef.current)
                    break
                case 'vaporizing': {
                    vaporizeProgressRef.current += (dt * 100) / (animationDurations.VAPORIZE_DURATION / 1000)
                    const tb = c.textBoundaries
                    if (!tb) break
                    const progress = Math.min(100, vaporizeProgressRef.current)
                    const xPos =
                        direction === 'left-to-right'
                            ? tb.left + tb.width * (progress / 100)
                            : tb.right - tb.width * (progress / 100)
                    const done = memoizedUpdateParticles(particlesRef.current, xPos, dt)
                    memoizedRenderParticles(ctx, particlesRef.current)
                    if (vaporizeProgressRef.current >= 100 && done) {
                        setCurrentTextIndex((i) => (i + 1) % texts.length)
                        setAnimationState('fadingIn')
                        fadeOpacityRef.current = 0
                    }
                    break
                }
                case 'fadingIn': {
                    fadeOpacityRef.current += (dt * 1000) / animationDurations.FADE_IN_DURATION
                    ctx.save()
                    ctx.scale(globalDpr, globalDpr)
                    particlesRef.current.forEach((p) => {
                        p.x = p.originalX
                        p.y = p.originalY
                        const o = Math.min(fadeOpacityRef.current, 1) * p.originalAlpha
                        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${o})`)
                        ctx.fillRect(p.x / globalDpr, p.y / globalDpr, 1, 1)
                    })
                    ctx.restore()
                    if (fadeOpacityRef.current >= 1) {
                        setAnimationState('waiting')
                        setTimeout(() => {
                            setAnimationState('vaporizing')
                            vaporizeProgressRef.current = 0
                            resetParticles(particlesRef.current)
                        }, animationDurations.WAIT_DURATION)
                    }
                    break
                }
            }

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animationFrameRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrameRef.current)
    }, [animationState, isInView])

    // initial layout & render
    useEffect(() => {
        renderCanvas({
            texts,
            font,
            color,
            alignment,
            canvasRef,
            wrapperSize,
            particlesRef,
            globalDpr,
            currentTextIndex,
            transformedDensity,
        })
        return handleFontChange({
            currentFont: font.fontFamily,
            lastFontRef,
            canvasRef,
            wrapperSize,
            particlesRef,
            globalDpr,
            currentTextIndex,
            transformedDensity,
            texts,
            font,
            color,
            alignment,
        })
    }, [wrapperSize, currentTextIndex, globalDpr])

    // resize observer
    useEffect(() => {
        const el = wrapperRef.current
        if (!el) return
        const ro = new ResizeObserver((entries) => {
            for (const e of entries)
                setWrapperSize({ width: e.contentRect.width, height: e.contentRect.height })
            renderCanvas({
                texts,
                font,
                color,
                alignment,
                canvasRef,
                wrapperSize: { width: el.clientWidth, height: el.clientHeight },
                particlesRef,
                globalDpr,
                currentTextIndex,
                transformedDensity,
            })
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [wrapperRef])

    // initial size set
    useEffect(() => {
        const r = wrapperRef.current
        if (!r) return
        setWrapperSize({ width: r.clientWidth, height: r.clientHeight })
    }, [])

    return (
        <div ref={wrapperRef} style={wrapperStyle}>
            <canvas ref={canvasRef} style={canvasStyle} />
            <SeoElement tag={tag} texts={texts} />
        </div>
    )
}

// ————————————————————————————————————————
// Funzioni utili ( renderCanvas, createParticles, updateParticles, ecc. )
// Le includo qui: mantieni la logica già presente nel tuo TS, solo senza tipi
// ————————————————————————————————————————

function handleFontChange({
    currentFont,
    lastFontRef,
    canvasRef,
    wrapperSize,
    particlesRef,
    globalDpr,
    currentTextIndex,
    transformedDensity,
    texts,
    font,
    color,
    alignment,
}) {
    if (currentFont !== lastFontRef.current) {
        lastFontRef.current = currentFont
        const t = setTimeout(() => {
            cleanup(canvasRef, particlesRef)
            renderCanvas({
                texts,
                font,
                color,
                alignment,
                canvasRef,
                wrapperSize,
                particlesRef,
                globalDpr,
                currentTextIndex,
                transformedDensity,
            })
        }, 1000)
        return () => {
            clearTimeout(t)
            cleanup(canvasRef, particlesRef)
        }
    }
}

function cleanup(canvasRef, particlesRef) {
    const c = canvasRef.current
    if (c) c.getContext('2d')?.clearRect(0, 0, c.width, c.height)
    if (particlesRef.current) particlesRef.current = []
}

function renderCanvas({
    texts,
    font,
    color,
    alignment,
    canvasRef,
    wrapperSize,
    particlesRef,
    globalDpr,
    currentTextIndex,
    transformedDensity,
}) {
    const c = canvasRef.current
    if (!c || !wrapperSize.width) return
    const ctx = c.getContext('2d')
    const w = wrapperSize.width * globalDpr
    const h = wrapperSize.height * globalDpr
    c.width = w
    c.height = h
    c.style.width = `${wrapperSize.width}px`
    c.style.height = `${wrapperSize.height}px`

    const size = parseInt(font.fontSize.replace('px', ''))
    const fStr = `${font.fontWeight} ${size * globalDpr}px ${font.fontFamily}`
    ctx.font = fStr
    ctx.fillStyle = color
    ctx.textAlign = alignment
    ctx.textBaseline = 'middle'

    const textY = h / 2
    const textX =
        alignment === 'center'
            ? w / 2
            : alignment === 'left'
                ? 0
                : w

    const { particles, textBoundaries } = createParticles(ctx, c, texts[currentTextIndex], textX, textY, fStr, color, alignment)
    particlesRef.current = particles
    c.textBoundaries = textBoundaries
}

function createParticles(ctx, canvas, text, textX, textY, font, color, alignment) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = color
    ctx.font = font
    ctx.textAlign = alignment
    ctx.textBaseline = 'middle'
    const m = ctx.measureText(text)
    const tw = m.width
    const left = alignment === 'center' ? textX - tw / 2 : alignment === 'left' ? textX : textX - tw
    const tb = { left, right: left + tw, width: tw }
    ctx.fillText(text, textX, textY)
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    const particles = []
    const sample = Math.max(1, Math.round((canvas.width / parseInt(canvas.style.width || '0')) / 3))
    for (let y = 0; y < canvas.height; y += sample) {
        for (let x = 0; x < canvas.width; x += sample) {
            const i = (y * canvas.width + x) * 4
            const alpha = data[i + 3]
            if (alpha > 0) {
                const orig = (alpha / 255) * (sample / (canvas.width / parseInt(canvas.style.width || '0')))
                particles.push({
                    x, y, originalX: x, originalY: y,
                    color: `rgba(${data[i]},${data[i + 1]},${data[i + 2]},${orig})`,
                    originalAlpha: orig, opacity: orig,
                    velocityX: 0, velocityY: 0, angle: 0, speed: 0,
                })
            }
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    return { particles, textBoundaries: tb }
}

function updateParticles(particles, vaporizeX, dt, spread, duration, dir, density) {
    let allV = true
    particles.forEach(p => {
        const reached = dir === 'left-to-right' ? p.originalX <= vaporizeX : p.originalX >= vaporizeX
        if (reached) {
            if (!p.speed) {
                p.angle = Math.random() * 2 * Math.PI
                p.speed = (Math.random() + 0.5) * spread
                p.velocityX = Math.cos(p.angle) * p.speed
                p.velocityY = Math.sin(p.angle) * p.speed
                p.shouldFadeQuickly = Math.random() > density
            }
            if (p.shouldFadeQuickly) {
                p.opacity = Math.max(0, p.opacity - dt)
            } else {
                const dx = p.originalX - p.x
                const dy = p.originalY - p.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                const damping = Math.max(0.95, 1 - dist / (100 * spread))
                p.velocityX = (p.velocityX + (Math.random() - 0.5) * spread * 3 + dx * 0.002) * damping
                p.velocityY = (p.velocityY + (Math.random() - 0.5) * spread * 3 + dy * 0.002) * damping
                const vmag = Math.sqrt(p.velocityX ** 2 + p.velocityY ** 2)
                if (vmag > spread * 2) {
                    const scale = spread * 2 / vmag
                    p.velocityX *= scale; p.velocityY *= scale
                }
                p.x += p.velocityX * dt * 20
                p.y += p.velocityY * dt * 10
                p.opacity = Math.max(0, p.opacity - dt * (0.25 * (2000 / duration)))
            }
            if (p.opacity > 0.01) allV = false
        } else {
            allV = false
        }
    })
    return allV
}

function renderParticles(ctx, particles, dpr) {
    ctx.save(); ctx.scale(dpr, dpr)
    particles.forEach(p => {
        if (p.opacity > 0) {
            ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.opacity})`)
            ctx.fillRect(p.x / dpr, p.y / dpr, 1, 1)
        }
    })
    ctx.restore()
}

function resetParticles(particles) {
    particles.forEach(p => {
        p.x = p.originalX; p.y = p.originalY
        p.opacity = p.originalAlpha
        p.velocityX = 0; p.velocityY = 0; p.speed = 0
    })
}

function calculateVaporizeSpread(size) {
    if (size <= 20) return 0.2; if (size >= 100) return 1.5
    if (size <= 50) return 0.2 + (size - 20) * (0.5 - 0.2) / (50 - 20)
    return 0.5 + (size - 50) * (1.5 - 0.5) / (100 - 50)
}

function transformValue(val, [inMin, inMax], [outMin, outMax], clamp = false) {
    const prog = (val - inMin) / (inMax - inMin)
    let res = outMin + prog * (outMax - outMin)
    if (clamp) {
        if (outMax > outMin) res = Math.min(Math.max(res, outMin), outMax)
        else res = Math.min(Math.max(res, outMax), outMin)
    }
    return res
}
