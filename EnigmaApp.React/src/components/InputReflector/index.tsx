import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import './styles.scss'

interface InputRotorProps {
  setReflector: (reflector: string) => void
}

function InputReflector({ setReflector }: InputRotorProps) {
  const navigation = useNavigate()
  const [reflectors, setReflectors] = useState<{
    [key: string]: string
  } | null>(null)

  const fetchData = async () => {
    await axios
      .get(process.env.REACT_APP_API + 'enigma/getreflectors')
      .then((result) => {
        const reflectors: { [key: string]: string } = result.data

        setReflectors(reflectors)
        setReflector(Object.values(reflectors)[0])
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

    const value = e.target.value
    if (reflectors != null) setReflector(reflectors[value])
  }

  return (
    <select
      onBlur={onChangeHandler}
      onChange={onChangeHandler}
      className="input-reflector"
    >
      {reflectors != null &&
        Object.keys(reflectors).map((key: string) => {
          return (
            <option key={key} value={key}>
              {key}
            </option>
          )
        })}
    </select>
  )
}

export default InputReflector
