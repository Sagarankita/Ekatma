'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ChangeType } from './ChangeScreens'

type HeatLevel = 'lower' | 'moderate' | 'higher'
type Point = [number, number]

type Topology = {
  arcs: number[][][]
  transform: { scale: [number, number]; translate: [number, number] }
  objects: {
    'maharashtra-divisions': {
      geometries: Array<{
        type: 'Polygon' | 'MultiPolygon'
        arcs: number[][] | number[][][]
        properties?: { division?: string }
      }>
    }
  }
}

type DivisionShape = {
  name: string
  label: string
  path: string
  labelX: number
  labelY: number
  base: number
}

type CityMarker = {
  name: string
  division: string
  longitude: number
  latitude: number
  x: number
  y: number
}

const CITY_LOCATIONS: Array<Omit<CityMarker, 'x' | 'y'>> = [
  { name: 'Mumbai', division: 'Kokan (Mumbai Division)', longitude: 72.8777, latitude: 19.0760 },
  { name: 'Thane', division: 'Kokan (Mumbai Division)', longitude: 72.9781, latitude: 19.2183 },
  { name: 'Pune', division: 'Western Zone (Pune Division)', longitude: 73.8567, latitude: 18.5204 },
  { name: 'Kolhapur', division: 'Western Zone (Pune Division)', longitude: 74.2433, latitude: 16.7050 },
  { name: 'Solapur', division: 'Western Zone (Pune Division)', longitude: 75.9064, latitude: 17.6599 },
  { name: 'Nashik', division: 'Khandesh (Nashik Division)', longitude: 73.7898, latitude: 19.9975 },
  { name: 'Jalgaon', division: 'Khandesh (Nashik Division)', longitude: 75.5626, latitude: 21.0077 },
  { name: 'Aurangabad', division: 'Marathwada (Aurangabad Division)', longitude: 75.3433, latitude: 19.8762 },
  { name: 'Nanded', division: 'Marathwada (Aurangabad Division)', longitude: 77.3210, latitude: 19.1383 },
  { name: 'Nagpur', division: 'Vidharbha (Nagpur)', longitude: 79.0882, latitude: 21.1458 },
  { name: 'Chandrapur', division: 'Vidharbha (Nagpur)', longitude: 79.2961, latitude: 19.9615 },
  { name: 'Amravati', division: 'Vidharbha (Amravati Division)', longitude: 77.7523, latitude: 20.9374 },
  { name: 'Akola', division: 'Vidharbha (Amravati Division)', longitude: 77.0082, latitude: 20.7002 },
]

const LEVEL_STYLE: Record<HeatLevel, { fill: string; stroke: string; label: string; short: string }> = {
  lower: { fill: '#b7e4c7', stroke: '#4d9b6e', label: 'Lower approval intensity', short: 'Lower' },
  moderate: { fill: '#ffe08a', stroke: '#c58a23', label: 'Moderate approval intensity', short: 'Moderate' },
  higher: { fill: '#f6aaa8', stroke: '#c45b61', label: 'Higher approval intensity', short: 'Higher' },
}

const CHANGE_MODIFIERS: Partial<Record<ChangeType, Partial<Record<string, number>>>> = {
  'Change location': { 'Kokan (Mumbai Division)': 1, 'Western Zone (Pune Division)': 1, 'Vidharbha (Nagpur)': -1 },
  'Add chemical process': { 'Kokan (Mumbai Division)': 1, 'Western Zone (Pune Division)': 1, 'Marathwada (Aurangabad Division)': 1, 'Vidharbha (Nagpur)': 1 },
  'Add boiler': { 'Vidharbha (Nagpur)': 1, 'Vidharbha (Amravati Division)': 1, 'Western Zone (Pune Division)': 1 },
  'Expand building': { 'Kokan (Mumbai Division)': 1, 'Western Zone (Pune Division)': 1, 'Khandesh (Nashik Division)': 1 },
  'Increase production': { 'Western Zone (Pune Division)': 1, 'Kokan (Mumbai Division)': 1, 'Vidharbha (Nagpur)': 1 },
  'Acquire land': { 'Kokan (Mumbai Division)': 1, 'Western Zone (Pune Division)': 1, 'Vidharbha (Amravati Division)': -1 },
  'Change product': { 'Western Zone (Pune Division)': 1, 'Marathwada (Aurangabad Division)': 1, 'Vidharbha (Nagpur)': 1 },
  'Modify project scope': { 'Kokan (Mumbai Division)': 1, 'Western Zone (Pune Division)': 1, 'Marathwada (Aurangabad Division)': 1, 'Vidharbha (Nagpur)': 1 },
}

function decodeArcs(topology: Topology): Point[][] {
  const [scaleX, scaleY] = topology.transform.scale
  const [translateX, translateY] = topology.transform.translate
  return topology.arcs.map(arc => {
    let x = 0
    let y = 0
    return arc.map(([deltaX, deltaY]) => {
      x += deltaX
      y += deltaY
      return [x * scaleX + translateX, y * scaleY + translateY] as Point
    })
  })
}

function ringPoints(ring: number[], decodedArcs: Point[][]): Point[] {
  return ring.flatMap((arcReference, index) => {
    const arc = decodedArcs[arcReference >= 0 ? arcReference : ~arcReference] ?? []
    const points = arcReference >= 0 ? arc : [...arc].reverse()
    return index === 0 ? points : points.slice(1)
  })
}

function geometryRings(geometry: Topology['objects']['maharashtra-divisions']['geometries'][number]): number[][] {
  return geometry.type === 'Polygon'
    ? geometry.arcs as number[][]
    : (geometry.arcs as number[][][]).flat()
}

function makeMapData(topology: Topology): { shapes: DivisionShape[]; cities: CityMarker[] } {
  const decodedArcs = decodeArcs(topology)
  const geometries = topology.objects['maharashtra-divisions']?.geometries ?? []
  const pointsByGeometry = geometries.map(geometry => geometryRings(geometry).map(ring => ringPoints(ring, decodedArcs)))
  const allPoints = pointsByGeometry.flat(2)
  const xs = allPoints.map(point => point[0])
  const ys = allPoints.map(point => point[1])
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const width = Math.max(maxX - minX, 1)
  const height = Math.max(maxY - minY, 1)
  const project = ([x, y]: Point): Point => [45 + ((x - minX) / width) * 690, 25 + ((maxY - y) / height) * 310]

  const shapes = geometries.map((geometry, geometryIndex) => {
    const rings = pointsByGeometry[geometryIndex]
    const projectedRings = rings.map(ring => ring.map(project))
    const path = projectedRings.map(ring => ring.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ') + ' Z').join(' ')
    const outerRing = projectedRings[0] ?? []
    const labelX = outerRing.reduce((sum, point) => sum + point[0], 0) / Math.max(outerRing.length, 1)
    const labelY = outerRing.reduce((sum, point) => sum + point[1], 0) / Math.max(outerRing.length, 1)
    const name = geometry.properties?.division ?? `Division ${geometryIndex + 1}`
    const baseByDivision: Record<string, number> = {
      'Kokan (Mumbai Division)': 4,
      'Western Zone (Pune Division)': 4,
      'Khandesh (Nashik Division)': 2,
      'Marathwada (Aurangabad Division)': 3,
      'Vidharbha (Amravati Division)': 2,
      'Vidharbha (Nagpur)': 4,
    }
    return { name, label: name.replace(' (Mumbai Division)', '').replace(' (Pune Division)', '').replace(' (Nashik Division)', '').replace(' (Aurangabad Division)', ''), path, labelX, labelY, base: baseByDivision[name] ?? 3 }
  })
  const cities = CITY_LOCATIONS.map(city => {
    const [x, y] = project([city.longitude, city.latitude])
    return { ...city, x, y }
  })
  return { shapes, cities }
}

function scoreFor(division: DivisionShape, changeType: ChangeType): number {
  return division.base + (CHANGE_MODIFIERS[changeType]?.[division.name] ?? 0)
}

function levelFor(score: number): HeatLevel {
  if (score <= 2) return 'lower'
  if (score <= 4) return 'moderate'
  return 'higher'
}

function locationDivision(proposedValue: string): string | undefined {
  const value = proposedValue.toLowerCase()
  if (value.includes('mumbai') || value.includes('thane') || value.includes('raigad') || value.includes('konkan')) return 'Kokan (Mumbai Division)'
  if (value.includes('pune') || value.includes('kolhapur') || value.includes('satara') || value.includes('solapur')) return 'Western Zone (Pune Division)'
  if (value.includes('nashik') || value.includes('dhule') || value.includes('jalgaon')) return 'Khandesh (Nashik Division)'
  if (value.includes('aurangabad') || value.includes('chhatrapati sambhajinagar') || value.includes('jalna') || value.includes('nanded')) return 'Marathwada (Aurangabad Division)'
  if (value.includes('nagpur') || value.includes('chandrapur')) return 'Vidharbha (Nagpur)'
  if (value.includes('amravati') || value.includes('akola')) return 'Vidharbha (Amravati Division)'
  return undefined
}

function locationCity(proposedValue: string): string | undefined {
  const value = proposedValue.toLowerCase()
  return CITY_LOCATIONS.find(city => value.includes(city.name.toLowerCase()))?.name
}

export function MaharashtraApprovalHeatmap({ changeType, proposedValue }: { changeType: ChangeType; proposedValue: string }) {
  const [mapData, setMapData] = useState<{ shapes: DivisionShape[]; cities: CityMarker[] }>({ shapes: [], cities: [] })
  const [mapState, setMapState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [selectedDivision, setSelectedDivision] = useState('Western Zone (Pune Division)')
  const [selectedCity, setSelectedCity] = useState('Pune')
  const matchedDivision = useMemo(() => locationDivision(proposedValue), [proposedValue])
  const matchedCity = useMemo(() => locationCity(proposedValue), [proposedValue])
  const shapes = mapData.shapes
  const cities = mapData.cities

  useEffect(() => {
    let cancelled = false
    fetch('/assets/maps/maharashtra.topo.json')
      .then(response => {
        if (!response.ok) throw new Error(`Map request failed: ${response.status}`)
        return response.json() as Promise<Topology>
      })
      .then(topology => {
        if (cancelled) return
        setMapData(makeMapData(topology))
        setMapState('ready')
      })
      .catch(() => { if (!cancelled) setMapState('error') })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (matchedDivision) setSelectedDivision(matchedDivision)
    if (matchedCity) setSelectedCity(matchedCity)
  }, [matchedCity, matchedDivision])

  const selected = shapes.find(shape => shape.name === selectedDivision) ?? shapes[0]
  const selectedScore = selected ? scoreFor(selected, changeType) : 0
  const selectedLevel = levelFor(selectedScore)
  const selectedStyle = LEVEL_STYLE[selectedLevel]
  const selectedCityMarker = cities.find(city => city.name === selectedCity)

  return (
    <section className="overflow-hidden rounded-2xl border border-[#d8e2ec] bg-white shadow-sm" aria-labelledby="maharashtra-heatmap-heading">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#e3ebe1] px-5 py-4">
        <div>
          <h3 id="maharashtra-heatmap-heading" className="text-sm font-bold text-[#173b64]">Maharashtra approval intensity</h3>
          <p className="mt-1 max-w-2xl text-[11px] leading-relaxed text-[#66788e]">Configured simulation estimate by division for <strong>{changeType}</strong>. Select an area to inspect its relative approval burden.</p>
        </div>
        <span className="rounded border border-[#f2d788] bg-[#fffaf0] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#78580b]">Simulation only</span>
      </div>

      {mapState === 'loading' && <div className="p-10 text-center text-xs text-[#66788e]">Loading Maharashtra map…</div>}
      {mapState === 'error' && <div className="p-10 text-center text-xs text-[#7a5807]">The Maharashtra map could not be loaded. The simulation results remain available below.</div>}
      {mapState === 'ready' && selected && (
        <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1.45fr)_220px]">
          <div className="min-w-0 rounded-xl border border-[#e4ebf2] bg-[#f7fbff] p-2">
            <svg viewBox="0 0 780 380" className="h-auto w-full" role="img" aria-labelledby="maharashtra-map-title maharashtra-map-description">
              <title id="maharashtra-map-title">Maharashtra division approval intensity map</title>
              <desc id="maharashtra-map-description">A choropleth-style map showing lower, moderate, and higher configured approval intensity by Maharashtra division. Click or focus a division for details.</desc>
              {shapes.map(division => {
                const level = levelFor(scoreFor(division, changeType))
                const style = LEVEL_STYLE[level]
                const active = division.name === selectedDivision
                const suggested = division.name === matchedDivision
                return (
                  <g
                    key={division.name}
                    role="button"
                    tabIndex={0}
                    aria-label={`${division.name}: ${style.label}`}
                    onClick={() => { setSelectedDivision(division.name); setSelectedCity('') }}
                    onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') setSelectedDivision(division.name) }}
                    className="cursor-pointer outline-none"
                  >
                    <path d={division.path} fill={style.fill} stroke={active ? '#173b64' : style.stroke} strokeWidth={active ? 4 : suggested ? 3 : 1.5} strokeLinejoin="round" opacity={active ? 1 : 0.92} />
                    <text x={division.labelX} y={division.labelY} textAnchor="middle" className="pointer-events-none select-none fill-[#173b64] text-[12px] font-semibold">{division.label}</text>
                    {suggested && <circle cx={division.labelX + 20} cy={division.labelY - 5} r="4" fill="#1559c5" stroke="white" strokeWidth="2" />}
                  </g>
                )
              })}
              {cities.map(city => {
                const cityDivision = shapes.find(division => division.name === city.division)
                const style = cityDivision ? LEVEL_STYLE[levelFor(scoreFor(cityDivision, changeType))] : LEVEL_STYLE.moderate
                const active = city.name === selectedCity
                const suggested = city.name === matchedCity
                return (
                  <g
                    key={city.name}
                    role="button"
                    tabIndex={0}
                    aria-label={`${city.name}: ${style.label}`}
                    onClick={() => { setSelectedCity(city.name); setSelectedDivision(city.division) }}
                    onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { setSelectedCity(city.name); setSelectedDivision(city.division) } }}
                    className="cursor-pointer outline-none"
                  >
                    <circle cx={city.x} cy={city.y} r={active ? 7 : 5} fill={active ? '#173b64' : '#ffffff'} stroke={style.stroke} strokeWidth={active ? 3 : 2} />
                    {suggested && <circle cx={city.x} cy={city.y} r="11" fill="none" stroke="#1559c5" strokeWidth="2" strokeDasharray="2 2" />}
                    <text x={city.x + 9} y={city.y + 4} className="pointer-events-none select-none fill-[#173b64] text-[10px] font-bold">{city.name}</text>
                  </g>
                )
              })}
            </svg>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e4ebf2] px-2 pt-2 text-[10px] text-[#607287]">
              <span>Blue dot = matches the proposed location</span>
              <span>Click a division to inspect</span>
            </div>
          </div>

          <aside className="space-y-3" aria-label="Selected division details">
            <div className="rounded-xl border border-[#dbe4ed] bg-[#F9FAF2] p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#555C56]">Selected area</p>
              <p className="mt-1 text-base font-bold text-[#173b64]">{selectedCityMarker?.name ?? selected.label}</p>
              {selectedCityMarker && <p className="mt-0.5 text-[10px] text-[#66788e]">{selected.label}</p>}
              <div className="mt-2 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: selectedStyle.fill, border: `1px solid ${selectedStyle.stroke}` }} aria-hidden="true" />
                <span className="text-xs font-semibold text-[#40536a]">{selectedStyle.label}</span>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[#66788e]">Relative estimate: <strong className="text-[#173b64]">{selectedScore} / 6</strong> configured approval intensity for this simulation.</p>
            </div>
            <div className="rounded-xl border border-[#dbe4ed] bg-white p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#555C56]">Legend</p>
              <div className="mt-2 space-y-2">
                {(Object.keys(LEVEL_STYLE) as HeatLevel[]).map(level => (
                  <div key={level} className="flex items-center gap-2 text-[11px] text-[#40536a]">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: LEVEL_STYLE[level].fill, border: `1px solid ${LEVEL_STYLE[level].stroke}` }} aria-hidden="true" />
                    {LEVEL_STYLE[level].short} approval intensity
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[10px] leading-relaxed text-[#718096]">This visual uses the supplied Maharashtra division boundaries and configured project conditions. It does not predict statutory approval, replace department advice, or change the live Business Profile.</p>
          </aside>
        </div>
      )}
    </section>
  )
}
