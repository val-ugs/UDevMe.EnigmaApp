import './styles.scss'

interface PatchPanelProps {
  alphabet: string
}

function PatchPanel({ alphabet }: PatchPanelProps) {
  return (
    <div className="patch-panel">
      <div className="patch-panel__values">
        <div className="patch-panel__alphabet">
          {alphabet.split('').map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
        <div className="patch-panel__alphabet">
          {alphabet.split('').map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PatchPanel
