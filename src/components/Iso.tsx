/* Isometric wireframe diagrams for the Practice index.
   Each diagram is: line paths (drawn on scroll), one brand-colour face that
   floods in once the lines close, and node dots that pop last.
   Geometry is a true 2:1 isometric projection — p(x, y, z). */

export type IsoVariant = 1 | 2 | 3 | 4 | 5 | 6

type Diagram = { lines: string[]; fill: string; nodes: [number, number][] }

const VB = 200
const VH = 190

function proj(w: number, h: number, z: number, cx: number, cy: number) {
  return (x: number, y: number, zz = 0) =>
    `${(cx + (x - y) * w).toFixed(1)},${(cy + (x + y) * h - zz * z).toFixed(1)}`
}
function pt(w: number, h: number, z: number, cx: number, cy: number) {
  return (x: number, y: number, zz = 0): [number, number] => [
    +(cx + (x - y) * w).toFixed(1),
    +(cy + (x + y) * h - zz * z).toFixed(1),
  ]
}

/* 1 — platform foundations: three stacked slabs */
function slabs(): Diagram {
  const p = proj(30, 15, 26, 100, 94)
  const slab = (z: number, t = 0.42) => [
    `M${p(0, 0, z)}L${p(2, 0, z)}L${p(2, 2, z)}L${p(0, 2, z)}Z`,
    `M${p(0, 2, z)}L${p(0, 2, z - t)}L${p(2, 2, z - t)}L${p(2, 2, z)}`,
    `M${p(2, 2, z - t)}L${p(2, 0, z - t)}L${p(2, 0, z)}`,
  ]
  return {
    lines: [...slab(0.42), ...slab(1.31), ...slab(2.2)],
    fill: `M${p(0, 0, 2.2)}L${p(2, 0, 2.2)}L${p(2, 2, 2.2)}L${p(0, 2, 2.2)}Z`,
    nodes: [],
  }
}

/* 2 — network fabric: iso grid plane with raised nodes */
function fabric(): Diagram {
  const p = proj(22, 11, 26, 100, 74)
  const q = pt(22, 11, 26, 100, 74)
  const lines: string[] = []
  for (let j = 0; j <= 3; j++) lines.push(`M${p(0, j)}L${p(3, j)}`)
  for (let i = 0; i <= 3; i++) lines.push(`M${p(i, 0)}L${p(i, 3)}`)
  lines.push(`M${p(1, 1)}L${p(1, 1, 0.9)}`, `M${p(3, 0)}L${p(3, 0, 1.3)}`, `M${p(0, 3)}L${p(0, 3, 0.6)}`)
  lines.push(`M${p(1, 1, 0.9)}L${p(3, 0, 1.3)}`, `M${p(1, 1, 0.9)}L${p(0, 3, 0.6)}`)
  return {
    lines,
    fill: `M${p(1, 1)}L${p(2, 1)}L${p(2, 2)}L${p(1, 2)}Z`,
    nodes: [q(1, 1, 0.9), q(3, 0, 1.3), q(0, 3, 0.6)],
  }
}

/* 3 — integration layer: two volumes joined by one beam */
function bridge(): Diagram {
  const p = proj(24, 12, 26, 100, 92)
  const box = (ox: number, oy: number, z = 1) => [
    `M${p(ox, oy, z)}L${p(ox + 1.4, oy, z)}L${p(ox + 1.4, oy + 1.4, z)}L${p(ox, oy + 1.4, z)}Z`,
    `M${p(ox, oy + 1.4, z)}L${p(ox, oy + 1.4)}L${p(ox + 1.4, oy + 1.4)}L${p(ox + 1.4, oy + 1.4, z)}`,
    `M${p(ox + 1.4, oy + 1.4)}L${p(ox + 1.4, oy)}L${p(ox + 1.4, oy, z)}`,
  ]
  return {
    lines: [...box(-1.9, 0.5), ...box(1.1, 0.5)],
    fill: `M${p(-0.5, 0.9, 0.62)}L${p(1.1, 0.9, 0.62)}L${p(1.1, 1.5, 0.62)}L${p(-0.5, 1.5, 0.62)}Z`,
    nodes: [],
  }
}

/* 4 — design system: four modules at three heights */
function modules(): Diagram {
  const p = proj(26, 13, 24, 100, 96)
  const mod = (ox: number, oy: number, z: number) => [
    `M${p(ox, oy, z)}L${p(ox + 1, oy, z)}L${p(ox + 1, oy + 1, z)}L${p(ox, oy + 1, z)}Z`,
    `M${p(ox, oy + 1, z)}L${p(ox, oy + 1)}L${p(ox + 1, oy + 1)}L${p(ox + 1, oy + 1, z)}`,
    `M${p(ox + 1, oy + 1)}L${p(ox + 1, oy)}L${p(ox + 1, oy, z)}`,
  ]
  return {
    lines: [...mod(0, 0, 1.5), ...mod(1.15, 0, 0.75), ...mod(0, 1.15, 0.75), ...mod(1.15, 1.15, 1.9)],
    fill: `M${p(1.15, 1.15, 1.9)}L${p(2.15, 1.15, 1.9)}L${p(2.15, 2.15, 1.9)}L${p(1.15, 2.15, 1.9)}Z`,
    nodes: [],
  }
}

/* 5 — observability: a core volume under three signal rings */
function rings(): Diagram {
  const p = proj(28, 14, 26, 100, 118)
  const q = pt(28, 14, 26, 100, 118)
  const ring = (r: number) => {
    const [cx, cy] = q(0.7, 0.7, 2.1)
    const rx = (28 * r * 2).toFixed(1)
    const ry = (14 * r * 2).toFixed(1)
    return `M${(cx - +rx).toFixed(1)},${cy}a${rx},${ry} 0 1,0 ${(+rx * 2).toFixed(1)},0a${rx},${ry} 0 1,0 ${(-rx * 2).toFixed(1)},0`
  }
  return {
    lines: [
      `M${p(0, 0, 1)}L${p(1.4, 0, 1)}L${p(1.4, 1.4, 1)}L${p(0, 1.4, 1)}Z`,
      `M${p(0, 1.4, 1)}L${p(0, 1.4)}L${p(1.4, 1.4)}L${p(1.4, 1.4, 1)}`,
      `M${p(1.4, 1.4)}L${p(1.4, 0)}L${p(1.4, 0, 1)}`,
      `M${p(0.7, 0.7, 1)}L${p(0.7, 0.7, 2.1)}`,
      ring(0.5), ring(0.85), ring(1.2),
    ],
    fill: `M${p(0, 0, 1)}L${p(1.4, 0, 1)}L${p(1.4, 1.4, 1)}L${p(0, 1.4, 1)}Z`,
    nodes: [q(0.7, 0.7, 2.1)],
  }
}

/* 6 — reliability: a primary volume and its standby twin */
function twins(): Diagram {
  const p = proj(24, 12, 26, 100, 98)
  const q = pt(24, 12, 26, 100, 98)
  const box = (ox: number, oy: number, z = 1.2) => [
    `M${p(ox, oy, z)}L${p(ox + 1.3, oy, z)}L${p(ox + 1.3, oy + 1.3, z)}L${p(ox, oy + 1.3, z)}Z`,
    `M${p(ox, oy + 1.3, z)}L${p(ox, oy + 1.3)}L${p(ox + 1.3, oy + 1.3)}L${p(ox + 1.3, oy + 1.3, z)}`,
    `M${p(ox + 1.3, oy + 1.3)}L${p(ox + 1.3, oy)}L${p(ox + 1.3, oy, z)}`,
  ]
  return {
    lines: [
      ...box(-1.75, 0.2),
      ...box(0.45, 0.2),
      `M${p(-0.45, 0.85, 1.2)}L${p(0.45, 0.85, 1.2)}`,
      `M${p(-0.45, 1.25, 1.2)}L${p(0.45, 1.25, 1.2)}`,
    ],
    fill: `M${p(0.45, 0.2, 1.2)}L${p(1.75, 0.2, 1.2)}L${p(1.75, 1.5, 1.2)}L${p(0.45, 1.5, 1.2)}Z`,
    nodes: [q(-1.1, 0.85, 1.2), q(1.1, 0.85, 1.2)],
  }
}

const DIAGRAMS: Record<IsoVariant, Diagram> = {
  1: slabs(), 2: fabric(), 3: bridge(), 4: modules(), 5: rings(), 6: twins(),
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
        {lns.map((p, i) => (
          <path key={i} className="iso__ln" d={p} />
        ))}
      </g>
      {d.nodes.map(([cx, cy], i) => (
        <circle key={i} className="iso__node" cx={cx} cy={cy} r="4.5" />
      ))}
    </svg>
  )
}
