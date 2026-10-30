export default function Icon({ icon, className }) {
  const [width, height, , , path] = icon.icon

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  )
}
