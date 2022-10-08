import { useEffect, useState } from 'react'

import './styles.scss'

interface DiskProps {
  alphabet: string
  turnover?: string
  shift?: number
  className?: string
}

function Disk({ alphabet, className, turnover, shift }: DiskProps) {
  const [letters, setLetters] = useState<string>(alphabet)

  useEffect(() => {
    if (shift == null) return
    if (shift == 0) setLetters(alphabet)
    if (shift > 0) setLetters(leftShifting(alphabet, shift % alphabet.length))
    if (shift < 0) setLetters(rightShifting(alphabet, -shift % alphabet.length))
  }, [shift])

  function rightShifting(s: string, rightShift: number) {
    const l = s.length - rightShift
    return leftShifting(s, l)
  }

  function leftShifting(s: string, leftShift: number) {
    return s.substring(leftShift) + s.substring(0, leftShift)
  }

  return (
    <div className={`disk ${className}`}>
      {letters.split('').map((c, i) => {
        return (
          <div key={i} className="disk__value">
            {c}
            {turnover?.includes(c) ? (
              <div className="disk__arrow"></div>
            ) : (
              <></>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Disk
