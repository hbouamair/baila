'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { flightFares, marrakech } from '@/lib/flights'
import type { AppLocale } from '@/i18n/routing'

const RADIUS = 1
const HOME = { lat: 36.4, lng: 5.8 }
const DISTANCE = 2.42
const DIST_MIN = 2.05
const DIST_MAX = 3.05
const DRAG = 0.0048
const GOLD = 0xe6d04a
const BLUSH = 0xf3b7c8
const EARTH_TINT = 0xf4f1e4

type EarthGlobeProps = {
  locale: AppLocale
  pin: string
  hint: string
  focusCity?: string | null
}

type Place = { city: string; lat: number; lng: number; hub?: boolean }

const places: Place[] = [
  { city: marrakech.city, lat: marrakech.lat, lng: marrakech.lng, hub: true },
  ...flightFares.map((fare) => ({ city: fare.city, lat: fare.lat, lng: fare.lng })),
]

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lng + 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function viewFor(lat: number, lng: number, distance: number) {
  const spherical = new THREE.Spherical().setFromVector3(latLngToVector3(lat, lng, distance))
  return { phi: spherical.phi, theta: spherical.theta, distance }
}

function clampView(phi: number, theta: number, distance: number) {
  const home = viewFor(HOME.lat, HOME.lng, DISTANCE)
  return {
    phi: THREE.MathUtils.clamp(phi, home.phi - 0.32, home.phi + 0.28),
    theta: THREE.MathUtils.clamp(theta, home.theta - 0.48, home.theta + 0.52),
    distance: THREE.MathUtils.clamp(distance, DIST_MIN, DIST_MAX),
  }
}

function makeArc(from: Place, to: Place) {
  const start = latLngToVector3(from.lat, from.lng, RADIUS + 0.012)
  const end = latLngToVector3(to.lat, to.lng, RADIUS + 0.012)
  const lift = start.distanceTo(end) * 0.32 + 0.06
  const mid = start.clone().add(end).normalize().multiplyScalar(RADIUS + lift)
  const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
  const geometry = new THREE.TubeGeometry(curve, 40, 0.0038, 6, false)
  const material = new THREE.MeshBasicMaterial({
    color: GOLD,
    transparent: true,
    opacity: 0.58,
  })
  return new THREE.Mesh(geometry, material)
}

export function EarthGlobe({ pin, hint, focusCity }: EarthGlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef(viewFor(HOME.lat, HOME.lng, DISTANCE))
  const targetRef = useRef(viewFor(HOME.lat, HOME.lng, DISTANCE))
  const dragRef = useRef<{ x: number; y: number } | null>(null)
  const [grabbing, setGrabbing] = useState(false)

  useEffect(() => {
    if (!focusCity) {
      const home = viewFor(HOME.lat, HOME.lng, DISTANCE)
      targetRef.current = home
      return
    }
    const fare = flightFares.find((item) => item.city === focusCity)
    if (!fare) return
    const next = viewFor(fare.lat, fare.lng, DISTANCE - 0.06)
    targetRef.current = clampView(next.phi, next.theta, next.distance)
  }, [focusCity])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const labelRoot = labelsRef.current
    if (!wrap || !canvas || !labelRoot) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 20)
    const globe = new THREE.Group()
    scene.add(globe)

    const earthMat = new THREE.MeshPhongMaterial({
      color: EARTH_TINT,
      shininess: 8,
      specular: new THREE.Color(0x223322),
    })
    const earth = new THREE.Mesh(new THREE.SphereGeometry(RADIUS, 96, 96), earthMat)
    globe.add(earth)

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.08, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0xe6d04a,
        transparent: true,
        opacity: 0.16,
        side: THREE.BackSide,
      }),
    )
    globe.add(atmosphere)

    scene.add(new THREE.AmbientLight(0xffffff, 1.35))
    const sun = new THREE.DirectionalLight(0xfff6d4, 1.8)
    sun.position.set(-0.6, 0.5, 2.4)
    scene.add(sun)

    const loader = new THREE.TextureLoader()
    loader.load('/globe/earth-blue-marble.jpg', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      earthMat.map = texture
      earthMat.needsUpdate = true
    })

    const markerGeo = new THREE.SphereGeometry(1, 12, 12)
    const cityMat = new THREE.MeshBasicMaterial({ color: GOLD })
    const hubMat = new THREE.MeshBasicMaterial({ color: BLUSH })
    const markerMeshes = places.map((place) => {
      const mesh = new THREE.Mesh(markerGeo, place.hub ? hubMat : cityMat)
      const size = place.hub ? 0.018 : 0.009
      mesh.scale.setScalar(size)
      mesh.position.copy(latLngToVector3(place.lat, place.lng, RADIUS + 0.012))
      globe.add(mesh)
      return mesh
    })

    const hubRing = new THREE.Mesh(
      new THREE.RingGeometry(0.028, 0.036, 32),
      new THREE.MeshBasicMaterial({ color: GOLD, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }),
    )
    hubRing.position.copy(latLngToVector3(marrakech.lat, marrakech.lng, RADIUS + 0.014))
    hubRing.lookAt(0, 0, 0)
    globe.add(hubRing)

    const arcs = flightFares.map((fare) => {
      const arc = makeArc(fare, marrakech)
      globe.add(arc)
      return arc
    })

    const labelNodes = [...labelRoot.querySelectorAll<HTMLElement>('[data-place]')]

    const resize = () => {
      const size = Math.min(wrap.clientWidth, wrap.clientHeight) || 640
      renderer.setSize(size, size, false)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(wrap)

    const applyCamera = () => {
      const { phi, theta, distance } = viewRef.current
      camera.position.setFromSphericalCoords(distance, phi, theta)
      camera.lookAt(0, 0, 0)
    }

    const projectLabels = () => {
      const width = wrap.clientWidth
      const height = wrap.clientHeight
      const camDir = camera.position.clone().normalize()
      for (const node of labelNodes) {
        const lat = Number(node.dataset.lat)
        const lng = Number(node.dataset.lng)
        const world = latLngToVector3(lat, lng, RADIUS)
        const facing = world.clone().normalize().dot(camDir)
        if (facing < 0.18) {
          node.style.opacity = '0'
          continue
        }
        const projected = world.clone().multiplyScalar(1.04).project(camera)
        const x = (projected.x * 0.5 + 0.5) * width
        const y = (-projected.y * 0.5 + 0.5) * height
        node.style.opacity = String(THREE.MathUtils.clamp((facing - 0.18) * 4, 0, 1))
        node.style.transform = `translate(${x}px, ${y}px) translate(-50%, -120%)`
      }
    }

    let frame = 0
    const tick = () => {
      if (!dragRef.current) {
        const ease = reduce ? 1 : 0.09
        viewRef.current.phi += (targetRef.current.phi - viewRef.current.phi) * ease
        viewRef.current.theta += (targetRef.current.theta - viewRef.current.theta) * ease
        viewRef.current.distance += (targetRef.current.distance - viewRef.current.distance) * ease
      }
      applyCamera()
      projectLabels()
      renderer.render(scene, camera)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      dragRef.current = { x: event.clientX, y: event.clientY }
      setGrabbing(true)
    }
    const onMove = (event: PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      const dx = event.clientX - drag.x
      const dy = event.clientY - drag.y
      drag.x = event.clientX
      drag.y = event.clientY
      const next = clampView(
        viewRef.current.phi - dy * DRAG,
        viewRef.current.theta - dx * DRAG,
        viewRef.current.distance,
      )
      viewRef.current = next
      targetRef.current = next
    }
    const onUp = () => {
      if (!dragRef.current) return
      dragRef.current = null
      setGrabbing(false)
    }
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      event.stopPropagation()
      const next = clampView(
        viewRef.current.phi,
        viewRef.current.theta,
        viewRef.current.distance + event.deltaY * 0.0012,
      )
      viewRef.current = next
      targetRef.current = next
    }

    wrap.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    wrap.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      wrap.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      wrap.removeEventListener('wheel', onWheel)
      markerGeo.dispose()
      cityMat.dispose()
      hubMat.dispose()
      earth.geometry.dispose()
      earthMat.map?.dispose()
      earthMat.dispose()
      atmosphere.geometry.dispose()
      ;(atmosphere.material as THREE.Material).dispose()
      hubRing.geometry.dispose()
      ;(hubRing.material as THREE.Material).dispose()
      for (const mesh of markerMeshes) globe.remove(mesh)
      for (const arc of arcs) {
        arc.geometry.dispose()
        ;(arc.material as THREE.Material).dispose()
        globe.remove(arc)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="flight-globe-block">
      <div
        ref={wrapRef}
        className={`flight-globe${grabbing ? ' is-grabbing' : ''}`}
        data-lenis-prevent
        role="application"
        tabIndex={0}
        aria-label={hint}
      >
        <canvas ref={canvasRef} />
        <div ref={labelsRef} className="flight-labels">
          {places.map((place) => (
            <span
              key={place.city}
              data-place={place.city}
              data-lat={place.lat}
              data-lng={place.lng}
              className={`flight-city${place.hub ? ' is-hub' : ''}${focusCity === place.city ? ' is-focus' : ''}`}
            >
              {place.hub ? pin : place.city}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-paper/55">{hint}</p>
    </div>
  )
}
