/* Isometric wireframe diagrams for the "From vision to system" steps.
   Each diagram is: line paths (drawn on scroll), one brand-colour face that
   floods in once the lines close, and node dots that pop last.
   Geometry is a true 2:1 isometric projection — p(x, y, z).

   The four diagrams share one projection and one visual grammar, so the set
   reads as a single family while each one says what its step does:
     1 Discover  — survey the ground and the systems already standing on it
     2 Architect — a plan with dimensions, one component assigned to its place
     3 Build     — volumes placed and joined, the next part descending
     4 Scale     — a stable core, satellites around it, room for the next one */

export type IsoVariant = 1 | 2 | 3 | 4

type Diagram = { lines: string[]; fill: string; nodes: [number, number][] }

const VB = 200
const VH = 190

/* one projection for every diagram, so strokes and masses stay comparable */
const W = 22
const H = 11
const Z = 22
const CX = 100
const CY = 96

const p = (x: number, y: number, z = 0) =>
  `${(CX + (x - y) * W).toFixed(1)},${(CY + (x + y) * H - z * Z).toFixed(1)}`

const q = (x: number, y: number, z = 0): [number, number] => [
  +(CX + (x - y) * W).toFixed(1),
  +(CY + (x + y) * H - z * Z).toFixed(1),
]

/* a solid volume: top face plus the two walls an isometric view can see */
const box = (ox: number, oy: number, s: number, z: number) => [
  `M${p(ox, oy, z)}L${p(ox + s, oy, z)}L${p(ox + s, oy + s, z)}L${p(ox, oy + s, z)}Z`,
  `M${p(ox, oy + s, z)}L${p(ox, oy + s)}L${p(ox + s, oy + s)}L${p(ox + s, oy + s, z)}`,
  `M${p(ox + s, oy + s)}L${p(ox + s, oy)}L${p(ox + s, oy, z)}`,
]

const face = (ox: number, oy: number, s: number, z: number) =>
  `M${p(ox, oy, z)}L${p(ox + s, oy, z)}L${p(ox + s, oy + s, z)}L${p(ox, oy + s, z)}Z`

/* a volume still in the air: both faces and the three upright edges */
const floating = (ox: number, oy: number, s: number, zb: number, zt: number) => [
  face(ox, oy, s, zt),
  face(ox, oy, s, zb),
  `M${p(ox, oy + s, zt)}L${p(ox, oy + s, zb)}`,
  `M${p(ox + s, oy + s, zt)}L${p(ox + s, oy + s, zb)}`,
  `M${p(ox + s, oy, zt)}L${p(ox + s, oy, zb)}`,
]

/* 1 — Discover: the ground surveyed, the systems already in place read off it */
function discover(): Diagram {
  const lines: string[] = []
  for (let j = 0; j <= 3; j++) lines.push(`M${p(0, j)}L${p(3, j)}`)
  for (let i = 0; i <= 3; i++) lines.push(`M${p(i, 0)}L${p(i, 3)}`)
  lines.push(...box(0, 0, 1, 1.15))
  lines.push(...box(2, 0, 1, 0.62))
  lines.push(...box(1, 2, 1, 0.9))
  // sight line onto the volume being read, with a cross-hair at the top
  lines.push(`M${p(1.5, 2.5, 0.9)}L${p(1.5, 2.5, 2.7)}`)
  lines.push(`M${p(1.05, 2.5, 2.7)}L${p(1.95, 2.5, 2.7)}`)
  lines.push(`M${p(1.5, 2.05, 2.7)}L${p(1.5, 2.95, 2.7)}`)
  return {
    lines,
    fill: face(1, 2, 1, 0.9),
    nodes: [q(1.5, 2.5, 2.7), q(0.5, 0.5, 1.15), q(2.5, 0.5, 0.62)],
  }
}

/* 2 — Architect: a dimensioned plan, one component assigned to its cell */
function architect(): Diagram {
  return {
    lines: [
      `M${p(0, 0)}L${p(3, 0)}L${p(3, 3)}L${p(0, 3)}Z`,
      `M${p(1.5, 0)}L${p(1.5, 3)}`,
      `M${p(0, 1.5)}L${p(3, 1.5)}`,
      // dimension runs along the two back edges
      `M${p(0, -0.5)}L${p(3, -0.5)}`,
      `M${p(0, -0.32)}L${p(0, -0.68)}`,
      `M${p(3, -0.32)}L${p(3, -0.68)}`,
      `M${p(-0.5, 0)}L${p(-0.5, 3)}`,
      `M${p(-0.32, 0)}L${p(-0.68, 0)}`,
      `M${p(-0.32, 3)}L${p(-0.68, 3)}`,
      // the component, still an outline, held over the cell it belongs to
      ...floating(1.5, 1.5, 1.5, 1.6, 2.4),
      `M${p(2.25, 2.25)}L${p(2.25, 2.25, 1.6)}`,
    ],
    fill: face(1.5, 1.5, 1.5, 0),
    nodes: [q(0, 0), q(3, 3)],
  }
}

/* 3 — Build: volumes placed and joined, the next part coming down into place */
function build(): Diagram {
  return {
    lines: [
      `M${p(-0.35, 0.5)}L${p(3.35, 0.5)}L${p(3.35, 3.2)}L${p(-0.35, 3.2)}Z`,
      ...box(0, 0.85, 1.3, 1.1),
      ...box(1.7, 0.85, 1.3, 1.1),
      // the seam between them, drawn as a pair of rails
      `M${p(1.3, 1.2, 1.1)}L${p(1.7, 1.2, 1.1)}`,
      `M${p(1.3, 1.8, 1.1)}L${p(1.7, 1.8, 1.1)}`,
      // the part still descending, on its drop line
      ...floating(1.0, 0.85, 1.0, 2.45, 3.15),
      `M${p(1.5, 1.35, 2.45)}L${p(1.5, 1.35, 1.15)}`,
    ],
    fill: face(1.0, 0.85, 1.0, 2.7),
    nodes: [q(0.65, 1.5, 1.1), q(2.35, 1.5, 1.1)],
  }
}

/* 4 — Scale: a stable core, satellites tied to it, the next one already set out */
function scale(): Diagram {
  return {
    lines: [
      ...box(0.6, 0.6, 1.3, 1.5),
      ...box(-1.15, 0.75, 0.9, 0.8),
      ...box(2.2, 0.75, 0.9, 0.8),
      ...box(0.75, 2.2, 0.9, 0.8),
      // ties from the core out to each satellite
      `M${p(0.6, 1.2, 0.8)}L${p(-0.25, 1.2, 0.8)}`,
      `M${p(1.9, 1.2, 0.8)}L${p(2.2, 1.2, 0.8)}`,
      `M${p(1.2, 1.9, 0.8)}L${p(1.2, 2.2, 0.8)}`,
      // the next satellite, set out but not yet built
      face(0.75, -1.5, 0.9, 0.8),
      `M${p(1.2, -0.6, 0.8)}L${p(1.2, 0.6, 0.8)}`,
    ],
    fill: face(0.6, 0.6, 1.3, 1.5),
    nodes: [q(-0.7, 1.2, 0.8), q(2.65, 1.2, 0.8), q(1.2, 2.65, 0.8)],
  }
}

const DIAGRAMS: Record<IsoVariant, Diagram> = {
  1: discover(),
  2: architect(),
  3: build(),
  4: scale(),
}

/* Split every multi-subpath `d` into single strokes: a dash pattern runs
   continuously across subpaths, so one path per stroke is what makes the
   draw-on-scroll read correctly and stagger cleanly. */
function strokes(lines: string[]): string[] {
  return lines.flatMap((d) =>
    d
      .split(/(?=M)/)
      .map((seg) => seg.trim())
      .filter((seg) => seg.length > 2),
  )
}

export function Iso({ variant = 1, className = '' }: { variant?: IsoVariant; className?: string }) {
  const d = DIAGRAMS[variant]
  const lns = strokes(d.lines)
  return (
    <svg
      className={`iso ${className}`.trim()}
      viewBox={`0 0 ${VB} ${VH}`}
      fill="none"
      aria-hidden="true"
      data-iso
    >
      <path className="iso__fill" d={d.fill} />
      <g className="iso__lines">
        {lns.map((path, i) => (
          <path key={i} className="iso__ln" d={path} />
        ))}
      </g>
      {d.nodes.map(([cx, cy], i) => (
        <circle key={i} className="iso__node" cx={cx} cy={cy} r="4.5" />
      ))}
    </svg>
  )
}
