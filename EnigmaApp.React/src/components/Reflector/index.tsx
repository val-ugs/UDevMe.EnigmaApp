import Disk from '../Disk'

import './styles.scss'

interface ReflectorProps {
  alphabet: string
}

function Reflector({ alphabet }: ReflectorProps) {
  return (
    <div className="reflector">
      <Disk alphabet={alphabet} />
    </div>
  )
}

export default Reflector
