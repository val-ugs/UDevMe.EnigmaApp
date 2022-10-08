import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RotorProps } from '../../interfaces/rotor.interface'
import axios from 'axios'

import './styles.scss'

interface InputRotorProps {
  setRotor: (rotor: RotorProps) => void
  defaultRouterNumber: number
}

function InputRotor({ setRotor, defaultRouterNumber }: InputRotorProps) {
  const navigation = useNavigate()
  const [rotors, setRotors] = useState<RotorProps[] | null>(null)
  const [value, setValue] = useState<number>(defaultRouterNumber)

  const fetchData = async () => {
    await axios
      .get(process.env.REACT_APP_API + 'enigma/getrotors')
      .then((result) => {
        const rotors: RotorProps[] = result.data

        setRotors(rotors)
        setRotor(rotors[defaultRouterNumber - 1])
      })
      .catch((err) => {
        navigation('/Error', {
          state: { code: err.code, message: err.message },
        })
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()

    const value = +e.target.value
    if (rotors == null) return

    setValue(value)
    setRotor(rotors[value - 1])
  }

  return (
    <select
      value={value}
      onBlur={onChangeHandler}
      onChange={onChangeHandler}
      className="input-rotor"
    >
      {rotors != null &&
        rotors.map((r) => {
          return <option key={r.id}>{r.id}</option>
        })}
    </select>
  )
}

export default InputRotor
