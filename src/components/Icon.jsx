// Render trực tiếp định nghĩa icon Font Awesome, không cần font hoặc thư viện render.
export default function Icon({ icon, className }) {
  const [width, height, , , pathData] = icon.icon

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {[].concat(pathData).map((path, index) => <path key={index} d={path} />)}
    </svg>
  )
}
