import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface IconProps {
  icon: IconDefinition
  className?: string
}

export default function Icon({ icon, className = '' }: IconProps) {
  const [width, height, , , path] = icon.icon

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {Array.isArray(path) ? path.map((d) => <path key={d} d={d} />) : <path d={path} />}
    </svg>
  )
}
