import Disk from '../Disk'

import './styles.scss'

interface RotorProps {
  alphabet: string
  number: number
  turnover: string
  shift: number
}

function Rotor({ alphabet, number, turnover, shift }: RotorProps) {
  return (
    <div className="rotor">
      <div className="rotor__disks-container">
        <div className="rotor__disks">
          <Disk
            alphabet={alphabet}
            turnover={turnover}
            shift={shift}
            className="rotor__disk"
          />
          <div className="rotor__disk-container">
            <Disk
              alphabet={alphabet}
              shift={shift}
              className="rotor__disk-small"
            />
          </div>
          <div className="rotor__value"></div>
          <div className="rotor__number">{number}</div>
        </div>
      </div>
    </div>
  )
}

export default Rotor
