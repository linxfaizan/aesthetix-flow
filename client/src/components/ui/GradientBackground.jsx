export default function GradientBackground({ children, className = "", dark = false }) {
  return <section className={`${dark ? "dark-gradient" : "luxury-gradient"} ${className}`}>{children}</section>
}
