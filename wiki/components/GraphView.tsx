"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import * as d3 from "d3"

interface GraphNode {
  slug: string
  title: string
  type: string
  word_count: number
  is_stub: boolean
  in_degree: number
  out_degree: number
}

interface GraphEdge {
  source: string
  target: string
  type: string
  symmetric: boolean
}

interface Graph {
  generated: string
  stats: { nodes: number; edges: number; stubs: number; orphans: number }
  nodes: GraphNode[]
  edges: GraphEdge[]
}

interface SimNode extends GraphNode, d3.SimulationNodeDatum {}
interface SimEdge extends d3.SimulationLinkDatum<SimNode> {
  type: string
  symmetric: boolean
}

const TYPE_COLOURS: Record<string, string> = {
  concept: "#3b82f6",
  theory: "#8b5cf6",
  person: "#10b981",
  "case-study": "#f97316",
  source: "#ef4444",
  institution: "#6b7280",
}

const TYPE_LABELS: Record<string, string> = {
  concept: "Concepts",
  theory: "Theories",
  person: "People",
  "case-study": "Case Studies",
  source: "Sources",
  institution: "Institutions",
}

function nodeRadius(node: GraphNode): number {
  const min = 4
  const max = 20
  const scaled = Math.sqrt(node.word_count) / 2
  return Math.max(min, Math.min(max, scaled))
}

type TooltipContent =
  | { kind: "node"; node: GraphNode }
  | { kind: "edge"; sourceTitle: string; targetTitle: string; sourceType: string; targetType: string; edgeType: string }

interface TooltipState {
  x: number
  y: number
  content: TooltipContent
}

const EDGE_TYPE_LABELS: Record<string, string> = {
  wikilink: "Wikilink",
  cites: "Cites",
  extends: "Extends",
  refutes: "Refutes",
  "tension-with": "Tension with",
  bridges: "Bridges",
  "distinguishes-from": "Distinguishes from",
  instantiates: "Instantiates",
  "applied-in": "Applied in",
  "authored-by": "Authored by",
  "supervised-by": "Supervised by",
}

export default function GraphView({ graph }: { graph: Graph }) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hiddenTypes, setHiddenTypes] = useState<Set<string>>(new Set())
  const [hiddenEdgeTypes, setHiddenEdgeTypes] = useState<Set<string>>(new Set())
  const [showStubs, setShowStubs] = useState(true)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const visibleNodes = useMemo(() => {
    return graph.nodes.filter((n) => {
      if (hiddenTypes.has(n.type)) return false
      if (!showStubs && n.is_stub) return false
      return true
    })
  }, [graph.nodes, hiddenTypes, showStubs])

  const visibleSlugs = useMemo(() => new Set(visibleNodes.map((n) => n.slug)), [visibleNodes])

  const visibleEdges = useMemo(() => {
    return graph.edges.filter(
      (e) =>
        visibleSlugs.has(e.source as string) &&
        visibleSlugs.has(e.target as string) &&
        !hiddenEdgeTypes.has(e.type),
    )
  }, [graph.edges, visibleSlugs, hiddenEdgeTypes])

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const n of graph.nodes) counts[n.type] = (counts[n.type] || 0) + 1
    return counts
  }, [graph.nodes])

  const edgeTypes = useMemo(() => [...new Set(graph.edges.map((e) => e.type))].sort(), [graph.edges])

  const edgeTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const e of graph.edges) counts[e.type] = (counts[e.type] || 0) + 1
    return counts
  }, [graph.edges])

  const topHubs = useMemo(() => {
    return [...graph.nodes]
      .map((n) => ({ ...n, degree: n.in_degree + n.out_degree }))
      .sort((a, b) => b.degree - a.degree)
      .slice(0, 10)
  }, [graph.nodes])

  const orphans = useMemo(() => {
    return graph.nodes.filter((n) => n.in_degree === 0 && n.out_degree === 0)
  }, [graph.nodes])

  const stubs = useMemo(() => {
    return [...graph.nodes]
      .filter((n) => n.is_stub)
      .sort((a, b) => a.word_count - b.word_count)
  }, [graph.nodes])

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    const width = Math.max(containerRef.current.clientWidth, 400)
    const height = Math.max(containerRef.current.clientHeight, 400)

    const simNodes: SimNode[] = visibleNodes.map((n) => ({ ...n }))
    const nodeBySlug = new Map(simNodes.map((n) => [n.slug, n]))
    const simEdges: SimEdge[] = visibleEdges
      .map((e) => ({
        source: nodeBySlug.get(e.source as string)!,
        target: nodeBySlug.get(e.target as string)!,
        type: e.type,
        symmetric: e.symmetric,
      }))
      .filter((e) => e.source && e.target)

    const neighbours = new Map<string, Set<string>>()
    for (const n of simNodes) neighbours.set(n.slug, new Set([n.slug]))
    for (const e of simEdges) {
      const s = (e.source as SimNode).slug
      const t = (e.target as SimNode).slug
      neighbours.get(s)?.add(t)
      neighbours.get(t)?.add(s)
    }

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()
    svg.attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)

    const g = svg.append("g").attr("class", "graph-zoom-layer")

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform.toString())
      })
    svg.call(zoom)

    const linkGroup = g.append("g").attr("class", "graph-links")
    const nodeGroup = g.append("g").attr("class", "graph-nodes")

    const link = linkGroup
      .selectAll("line")
      .data(simEdges)
      .join("line")
      .attr("stroke", "#94a3b8")
      .attr("stroke-opacity", 0.25)
      .attr("stroke-width", 4)
      .style("pointer-events", "stroke")
      .style("stroke-linecap", "round")

    link
      .on("mouseenter", function (event, d) {
        const s = d.source as SimNode
        const t = d.target as SimNode
        setTooltip({
          x: event.clientX,
          y: event.clientY,
          content: {
            kind: "edge",
            sourceTitle: s.title,
            targetTitle: t.title,
            sourceType: s.type,
            targetType: t.type,
            edgeType: d.type,
          },
        })
        d3.select(this).attr("stroke", "#0f172a").attr("stroke-opacity", 0.9)
      })
      .on("mousemove", function (event) {
        setTooltip((prev) => (prev ? { ...prev, x: event.clientX, y: event.clientY } : null))
      })
      .on("mouseleave", function () {
        setTooltip(null)
        d3.select(this).attr("stroke", "#94a3b8").attr("stroke-opacity", 0.25)
      })

    const node = nodeGroup
      .selectAll("g")
      .data(simNodes)
      .join("g")
      .attr("class", "graph-node")
      .style("cursor", "pointer")

    node
      .append("circle")
      .attr("r", (d) => nodeRadius(d))
      .attr("fill", (d) => TYPE_COLOURS[d.type] || "#64748b")
      .attr("fill-opacity", (d) => (d.is_stub ? 0.45 : 0.9))
      .attr("stroke", (d) => (d.in_degree === 0 && d.out_degree === 0 ? "#dc2626" : "#1e293b"))
      .attr("stroke-width", (d) => (d.in_degree === 0 && d.out_degree === 0 ? 2 : 0.5))

    const LABEL_DEGREE_THRESHOLD = 5
    node
      .append("text")
      .text((d) => d.title)
      .attr("dx", (d) => nodeRadius(d) + 4)
      .attr("dy", 4)
      .attr("font-size", 11)
      .attr("font-family", "var(--font-inter), system-ui, sans-serif")
      .attr("fill", "#0f172a")
      .attr("pointer-events", "none")
      .attr("opacity", (d) => (d.in_degree + d.out_degree >= LABEL_DEGREE_THRESHOLD ? 0.95 : 0))
      .attr("class", "graph-label")

    function highlightNeighbourhood(hoveredSlug: string) {
      const nbrs = neighbours.get(hoveredSlug) ?? new Set([hoveredSlug])
      node.selectAll<SVGCircleElement, SimNode>("circle").attr("fill-opacity", (d) =>
        nbrs.has(d.slug) ? (d.is_stub ? 0.55 : 1) : 0.12,
      )
      node.selectAll<SVGTextElement, SimNode>("text").attr("opacity", (d) => (nbrs.has(d.slug) ? 0.95 : 0))
      link
        .attr("stroke", (d) => {
          const s = (d.source as SimNode).slug
          const t = (d.target as SimNode).slug
          return s === hoveredSlug || t === hoveredSlug ? "#0f172a" : "#94a3b8"
        })
        .attr("stroke-opacity", (d) => {
          const s = (d.source as SimNode).slug
          const t = (d.target as SimNode).slug
          return s === hoveredSlug || t === hoveredSlug ? 0.85 : 0.08
        })
    }

    function clearHighlight() {
      node.selectAll<SVGCircleElement, SimNode>("circle").attr("fill-opacity", (d) => (d.is_stub ? 0.45 : 0.9))
      node
        .selectAll<SVGTextElement, SimNode>("text")
        .attr("opacity", (d) => (d.in_degree + d.out_degree >= LABEL_DEGREE_THRESHOLD ? 0.95 : 0))
      link.attr("stroke", "#94a3b8").attr("stroke-opacity", 0.25).attr("stroke-width", 1)
    }

    node.on("mouseenter", function (event, d) {
      setTooltip({ x: event.clientX, y: event.clientY, content: { kind: "node", node: d } })
      highlightNeighbourhood(d.slug)
    })
    node.on("mousemove", function (event) {
      setTooltip((prev) => (prev ? { ...prev, x: event.clientX, y: event.clientY } : null))
    })
    node.on("mouseleave", function () {
      setTooltip(null)
      clearHighlight()
    })
    node.on("click", (_event, d) => {
      window.location.href = `/wiki/${d.slug}`
    })

    const simulation = d3
      .forceSimulation<SimNode>(simNodes)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimEdge>(simEdges)
          .id((d) => d.slug)
          .distance(140)
          .strength(0.2),
      )
      .force("charge", d3.forceManyBody<SimNode>().strength(-400).distanceMax(500))
      .force("center", d3.forceCenter(0, 0).strength(0.05))
      .force("x", d3.forceX<SimNode>(0).strength(0.03))
      .force("y", d3.forceY<SimNode>(0).strength(0.03))
      .force(
        "collide",
        d3.forceCollide<SimNode>().radius((d) => nodeRadius(d) + 12).strength(0.9),
      )
      .alphaDecay(0.035)

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as SimNode).x ?? 0)
        .attr("y1", (d) => (d.source as SimNode).y ?? 0)
        .attr("x2", (d) => (d.target as SimNode).x ?? 0)
        .attr("y2", (d) => (d.target as SimNode).y ?? 0)

      node.attr("transform", (d) => `translate(${d.x ?? 0}, ${d.y ?? 0})`)
    })

    simulation.on("end", () => {
      const xs = simNodes.map((n) => n.x ?? 0)
      const ys = simNodes.map((n) => n.y ?? 0)
      const minX = Math.min(...xs)
      const maxX = Math.max(...xs)
      const minY = Math.min(...ys)
      const maxY = Math.max(...ys)
      const padding = 60
      const graphWidth = maxX - minX + padding * 2
      const graphHeight = maxY - minY + padding * 2
      const scale = Math.min(width / graphWidth, height / graphHeight, 1.2)
      const tx = -((minX + maxX) / 2) * scale
      const ty = -((minY + maxY) / 2) * scale
      svg
        .transition()
        .duration(600)
        .call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(scale))
    })

    const drag = d3
      .drag<SVGGElement, SimNode>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      })
      .on("drag", (event, d) => {
        d.fx = event.x
        d.fy = event.y
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      })

    node.call(drag as d3.DragBehavior<SVGGElement, SimNode, SimNode | d3.SubjectPosition>)

    return () => {
      simulation.stop()
    }
  }, [visibleNodes, visibleEdges])

  function toggleType(type: string) {
    setHiddenTypes((prev) => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }

  function toggleEdgeType(type: string) {
    setHiddenEdgeTypes((prev) => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }

  return (
    <div className="graph-page">
      <div className="graph-sidebar">
        <h2>Graph</h2>
        <p className="graph-subtitle">
          Drag to reposition, scroll to zoom, click to open. Hover a node to highlight its neighbourhood.
        </p>

        <div className="graph-stats">
          <div><strong>{graph.stats.nodes}</strong> <span>nodes</span></div>
          <div><strong>{graph.stats.edges}</strong> <span>edges</span></div>
          <div><strong>{graph.stats.stubs}</strong> <span>stubs (&lt;500 words)</span></div>
          <div><strong>{graph.stats.orphans}</strong> <span>orphans</span></div>
        </div>

        <details className="graph-section" open>
          <summary>Node types <span className="graph-section-count">{Object.keys(TYPE_LABELS).length}</span></summary>
          <div className="graph-section-body">
            {Object.entries(TYPE_LABELS).map(([type, label]) => (
              <label key={type} className="graph-legend-item">
                <input type="checkbox" checked={!hiddenTypes.has(type)} onChange={() => toggleType(type)} />
                <span className="graph-legend-dot" style={{ background: TYPE_COLOURS[type] }} />
                <span className="graph-legend-label">{label}</span>
                <span className="graph-legend-count">{typeCounts[type] || 0}</span>
              </label>
            ))}
            <label className="graph-legend-item graph-legend-divider">
              <input type="checkbox" checked={showStubs} onChange={() => setShowStubs((s) => !s)} />
              <span className="graph-legend-label">Show stubs (faded)</span>
            </label>
          </div>
        </details>

        <details className="graph-section">
          <summary>Edge types <span className="graph-section-count">{edgeTypes.length}</span></summary>
          <div className="graph-section-body">
            {edgeTypes.map((type) => (
              <label key={type} className="graph-legend-item">
                <input type="checkbox" checked={!hiddenEdgeTypes.has(type)} onChange={() => toggleEdgeType(type)} />
                <span className="graph-legend-label">{EDGE_TYPE_LABELS[type] || type}</span>
                <span className="graph-legend-count">{edgeTypeCounts[type] || 0}</span>
              </label>
            ))}
            {edgeTypes.length === 1 && edgeTypes[0] === "wikilink" && (
              <p className="graph-section-empty">Typed relationships (cites, extends, refutes, bridges&hellip;) appear here once article frontmatter is populated.</p>
            )}
          </div>
        </details>

        <details className="graph-section">
          <summary>Top hubs <span className="graph-section-count">{topHubs.length}</span></summary>
          <div className="graph-section-body">
            <ul className="graph-article-list">
              {topHubs.map((n) => (
                <li key={n.slug}>
                  <Link href={`/wiki/${n.slug}`}>
                    <span className="graph-legend-dot" style={{ background: TYPE_COLOURS[n.type] }} />
                    <span className="graph-article-title">{n.title}</span>
                    <span className="graph-article-meta">{n.degree}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </details>

        <details className="graph-section">
          <summary>Orphans <span className="graph-section-count">{orphans.length}</span></summary>
          <div className="graph-section-body">
            {orphans.length === 0 ? (
              <p className="graph-section-empty">No orphans.</p>
            ) : (
              <ul className="graph-article-list">
                {orphans.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/wiki/${n.slug}`}>
                      <span className="graph-legend-dot" style={{ background: TYPE_COLOURS[n.type] }} />
                      <span className="graph-article-title">{n.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </details>

        <details className="graph-section">
          <summary>Stubs <span className="graph-section-count">{stubs.length}</span></summary>
          <div className="graph-section-body">
            {stubs.length === 0 ? (
              <p className="graph-section-empty">No stubs.</p>
            ) : (
              <ul className="graph-article-list">
                {stubs.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/wiki/${n.slug}`}>
                      <span className="graph-legend-dot" style={{ background: TYPE_COLOURS[n.type] }} />
                      <span className="graph-article-title">{n.title}</span>
                      <span className="graph-article-meta">{n.word_count}w</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </details>

        <div className="graph-meta">
          Generated {graph.generated.replace("T", " ").slice(0, 19)} UTC
        </div>
      </div>

      <div className="graph-canvas" ref={containerRef}>
        <svg ref={svgRef} className="graph-svg" />
      </div>

      {tooltip && <GraphTooltip tooltip={tooltip} />}
    </div>
  )
}

function GraphTooltip({ tooltip }: { tooltip: TooltipState }) {
  const offset = 18
  const maxX = typeof window !== "undefined" ? window.innerWidth - 260 : 800
  const maxY = typeof window !== "undefined" ? window.innerHeight - 140 : 600
  const x = Math.min(tooltip.x + offset, maxX)
  const y = Math.min(tooltip.y + offset, maxY)

  return (
    <div className="graph-tooltip" style={{ left: x, top: y }}>
      {tooltip.content.kind === "node" ? (
        <>
          <div className="graph-tooltip-title">{tooltip.content.node.title}</div>
          <div className="graph-tooltip-meta">
            <span className="graph-legend-dot" style={{ background: TYPE_COLOURS[tooltip.content.node.type] }} />
            {TYPE_LABELS[tooltip.content.node.type] || tooltip.content.node.type}
            {tooltip.content.node.is_stub && <span className="graph-stub-badge">stub</span>}
          </div>
          <ul className="graph-tooltip-stats">
            <li><strong>{tooltip.content.node.word_count}</strong> words</li>
            <li><strong>{tooltip.content.node.in_degree}</strong> in</li>
            <li><strong>{tooltip.content.node.out_degree}</strong> out</li>
          </ul>
          <div className="graph-tooltip-hint">Click to open</div>
        </>
      ) : (
        <>
          <div className="graph-tooltip-edge">
            <span className="graph-legend-dot" style={{ background: TYPE_COLOURS[tooltip.content.sourceType] }} />
            <span className="graph-tooltip-endpoint">{tooltip.content.sourceTitle}</span>
          </div>
          <div className="graph-tooltip-arrow">
            {tooltip.content.edgeType === "wikilink"
              ? "→ references →"
              : `— ${EDGE_TYPE_LABELS[tooltip.content.edgeType] || tooltip.content.edgeType} →`}
          </div>
          <div className="graph-tooltip-edge">
            <span className="graph-legend-dot" style={{ background: TYPE_COLOURS[tooltip.content.targetType] }} />
            <span className="graph-tooltip-endpoint">{tooltip.content.targetTitle}</span>
          </div>
        </>
      )}
    </div>
  )
}
