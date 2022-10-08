import { RotorProps } from '../../interfaces/rotor.interface'

import './styles.scss'

interface TableProps {
  alphabet: string
  patchPanel: string
  rotor1: RotorProps | null
  rotor1Shift: number
  rotor2: RotorProps | null
  rotor2Shift: number
  rotor3: RotorProps | null
  rotor3Shift: number
  reflector: string
}

function Table({
  alphabet,
  patchPanel,
  rotor1,
  rotor1Shift,
  rotor2,
  rotor2Shift,
  rotor3,
  rotor3Shift,
  reflector,
}: TableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <td>Elements</td>
          <td colSpan={26}>Values</td>
          <td>Turnover</td>
          <td>Shift</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alphabet</td>
          {alphabet.split('').map((c, i) => {
            return (
              <>
                <td key={i}>{c}</td>
              </>
            )
          })}
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Patch panel</td>
          {patchPanel.split('').map((c, i) => {
            return (
              <>
                <td key={i}>{c}</td>
              </>
            )
          })}
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Rotor 1</td>
          {rotor1?.text.split('').map((c, i) => {
            return (
              <>
                <td key={i}>{c}</td>
              </>
            )
          })}
          <td>{rotor1?.turnover}</td>
          <td>{rotor1Shift}</td>
        </tr>
        <tr>
          <td>Rotor 2</td>
          {rotor2?.text.split('').map((c, i) => {
            return (
              <>
                <td key={i}>{c}</td>
              </>
            )
          })}
          <td>{rotor2?.turnover}</td>
          <td>{rotor2Shift}</td>
        </tr>
        <tr>
          <td>Rotor 3</td>
          {rotor3?.text.split('').map((c, i) => {
            return (
              <>
                <td key={i}>{c}</td>
              </>
            )
          })}
          <td>{rotor3?.turnover}</td>
          <td>{rotor3Shift}</td>
        </tr>
        <tr>
          <td>Reflector</td>
          {reflector.split('').map((c, i) => {
            return (
              <>
                <td key={i}>{c}</td>
              </>
            )
          })}
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table
