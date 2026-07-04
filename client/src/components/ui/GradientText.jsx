export default function GradientText({ as: Tag = "span", children, className = "" }) {
  return <Tag className={`gradient-text animate-gradient ${className}`}>{children}</Tag>
}
