import './styles.scss'

interface ElementProps {
  name: string
  className?: string
  children: React.ReactNode
}

function Element({ name, className, children }: ElementProps) {
  return (
    <div className={`element ${className}`}>
      <div className="element__name">{name}</div>
      <div className="element__children">{children}</div>
    </div>
  )
}

export default Element
