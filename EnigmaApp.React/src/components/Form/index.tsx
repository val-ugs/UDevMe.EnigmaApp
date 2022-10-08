import { useState } from 'react'
import { RotorProps } from '../../interfaces/rotor.interface'
import Counter from '../Counter'
import InputReflector from '../InputReflector'
import InputRotor from '../InputRotor'

import './styles.scss'

interface FormProps {
  alphabet: string
  setText: (text: string) => void
  setPatchPanel: (patchPanel: string) => void
  setRotor1: (rotor: RotorProps) => void
  setRotor1Shift: (value: number) => void
  setRotor2: (rotor: RotorProps) => void
  setRotor2Shift: (value: number) => void
  setRotor3: (rotor: RotorProps) => void
  setRotor3Shift: (value: number) => void
  setReflector: (reflector: string) => void
}

function Form({
  alphabet,
  setText,
  setPatchPanel,
  setRotor1,
  setRotor1Shift,
  setRotor2,
  setRotor2Shift,
  setRotor3,
  setRotor3Shift,
  setReflector,
}: FormProps) {
  const [invalidText, setInvalidText] = useState<string>('')
  const [patchPanelInvalidText, setPatchPanelInvalidText] = useState<string>('')

  const textHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text: string = e.target.value

    const regexValid = /^[a-zA-Z]+$/
    const textInvalid: string | null = text.match(regexValid) as string | null

    if (textInvalid == null) {
      setText('')
      setInvalidText("Wrong format. Example: 'WORD'")
      return
    }

    setInvalidText('')
    setText(text)
  }

  const patchPanelHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let patchPanelText: string = alphabet

    const value: string = e.target.value

    const regexValid = /^$|(^[a-zA-Z]-[a-zA-Z]$)|(^[a-zA-Z]-[a-zA-Z]((,|,\s)[a-zA-Z]-[a-zA-Z]){1,12}$)/
    const textInvalid: string | null = value.match(regexValid) as string | null

    if (textInvalid == null) {
      setPatchPanelInvalidText("Wrong format. Example: 'A-Z, B-F, K-L'")
      return
    }

    const regex = /[a-zA-Z]/g
    const inputValues: string | null = value.match(regex) as string | null

    if (inputValues == null) {
      setPatchPanelInvalidText('')
      setPatchPanel(alphabet)
      return
    }

    if (inputValues.length % 2 == 1) {
      setPatchPanelInvalidText("Wrong format. Example: 'A-Z, B-F, K-L'")
      return
    }

    if (checkIfStringIsUnique(inputValues) == false) {
      setPatchPanelInvalidText('Repeated letters')
      return
    }

    for (let i = 0; i < inputValues.length; i += 2) {
      const first = inputValues[i].toUpperCase()
      const second = inputValues[i + 1].toUpperCase()
      const i1 = patchPanelText.indexOf(first)
      const i2 = patchPanelText.indexOf(second)

      patchPanelText = setCharAt(patchPanelText, i2, first)
      patchPanelText = setCharAt(patchPanelText, i1, second)
    }

    setPatchPanelInvalidText('')
    setPatchPanel(patchPanelText)
  }

  const checkIfStringIsUnique = (s: string) => {
    const set: Set<string> = new Set()
    for (let i = 0; i < s.length; i++) set.add(s[i])

    return s.length == set.size
  }

  const setCharAt = (s: string, i: number, c: string) => {
    if (i > s.length - 1) return s
    return s.substring(0, i) + c + s.substring(i + 1)
  }

  return (
    <form className="form">
      <div className="form__element">
        <label htmlFor="text" className="form__label">
          Word:
        </label>
        <input
          type="text"
          placeholder="WORD"
          maxLength={32}
          required
          onChange={textHandler}
          className="form__text"
        ></input>
      </div>
      {invalidText != '' && (
        <div className="form__element form__invalid">{invalidText}</div>
      )}
      <div className="form__element">
        <label htmlFor="patchPanel" className="form__label">
          Patch Panel:
        </label>
        <input
          type="text"
          placeholder="A-Z, B-F, K-L..."
          maxLength={63}
          onChange={patchPanelHandler}
          className="form__patch-panel"
        />
      </div>
      {patchPanelInvalidText != '' && (
        <div className="form__element form__invalid">
          {patchPanelInvalidText}
        </div>
      )}
      <div className="form__elements">
        <div className="form__element">
          <label htmlFor="rotor1" className="form__label">
            Rotor 1:
          </label>
          <InputRotor setRotor={setRotor1} defaultRouterNumber={1} />
          <label htmlFor="rotor1Shift" className="form__label">
            Shift:
          </label>
          <Counter setValue={setRotor1Shift} />
        </div>
        <div className="form__element">
          <label htmlFor="rotor2" className="form__label">
            Rotor 2:
          </label>
          <InputRotor setRotor={setRotor2} defaultRouterNumber={2} />
          <label htmlFor="rotor1Shift" className="form__label">
            Shift:
          </label>
          <Counter setValue={setRotor2Shift} />
        </div>
        <div className="form__element">
          <label htmlFor="rotor3" className="form__label">
            Rotor 3:
          </label>
          <InputRotor setRotor={setRotor3} defaultRouterNumber={3} />
          <label htmlFor="rotor1Shift" className="form__label">
            Shift:
          </label>
          <Counter setValue={setRotor3Shift} />
        </div>
        <div className="form__element">
          <label htmlFor="reflector" className="form__label">
            Reflector:
          </label>
          <InputReflector setReflector={setReflector} />
        </div>
      </div>
    </form>
  )
}

export default Form
