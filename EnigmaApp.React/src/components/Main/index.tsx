import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RotorProps } from '../../interfaces/rotor.interface'
import Canvas from '../Canvas'
import Element from '../Element'
import Form from '../Form'
import PatchPanel from '../PatchPanel'
import Reflector from '../Reflector'
import Rotor from '../Rotor'
import Table from '../Table'
import axios from 'axios'

import './styles.scss'

interface OutputEnigmaProps {
  text: string
  lastCharLetters: Array<string>
}

export default function Main() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const navigation = useNavigate()

  const [showElements, SetShowElements] = useState<boolean>(
    window.innerWidth >= 1200 ? true : false
  )
  const [text, setText] = useState<string>('')
  const [PreviousTextSize, setPreviousTextSize] = useState<number>(0)
  const [patchPanel, setPatchPanel] = useState<string>(alphabet)
  const [rotor1, setRotor1] = useState<RotorProps | null>(null)
  const [rotor1Shift, setRotor1Shift] = useState<number>(0)
  const [rotor2, setRotor2] = useState<RotorProps | null>(null)
  const [rotor2Shift, setRotor2Shift] = useState<number>(0)
  const [rotor3, setRotor3] = useState<RotorProps | null>(null)
  const [rotor3Shift, setRotor3Shift] = useState<number>(0)
  const [reflector, setReflector] = useState<string>('')
  const [outputText, setOutputText] = useState<string>('')
  const [
    outputLastCharLetters,
    setOutputLastCharLetters,
  ] = useState<Array<string> | null>(null)
  const [rotor1ElementShift, setRotor1ElementShift] = useState<number>(0)
  const [rotor2ElementShift, setRotor2ElementShift] = useState<number>(0)
  const [rotor3ElementShift, setRotor3ElementShift] = useState<number>(0)

  const fetchData = async () => {
    if (text == '') {
      setOutputText('')
      setOutputLastCharLetters(null)
      return
    }

    if (rotor1 == null || rotor2 == null || rotor3 == null) return

    rotor1.innerShift = rotor1Shift
    rotor2.innerShift = rotor2Shift
    rotor3.innerShift = rotor3Shift

    const json = JSON.stringify({
      text: text,
      enigmaModel: {
        patchPanelText: patchPanel,
        rotor1: rotor1,
        rotor2: rotor2,
        rotor3: rotor3,
        reflectorText: reflector,
      },
    })

    await axios
      .post(process.env.REACT_APP_API + 'enigma/encrypt', json, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        const outputEnigma: OutputEnigmaProps = result.data
        setOutputText(outputEnigma.text)
        setOutputLastCharLetters(outputEnigma.lastCharLetters)
      })
      .catch((err) => {
        navigation('/Error', {
          state: { code: err.code, message: err.message },
        })
      })
  }

  useEffect(() => {
    fetchData()
  }, [
    text,
    patchPanel,
    rotor1,
    rotor1Shift,
    rotor2,
    rotor2Shift,
    rotor3,
    rotor3Shift,
    reflector,
  ])

  useEffect(() => {
    if (rotor1 == null || rotor2 == null || rotor3 == null) return

    const shift = text.length
    const isRotateRight = PreviousTextSize < text.length ? true : false

    setRotor1ElementShift((rotor1Shift + shift) % alphabet.length)

    TryChangeRotorShift(
      rotor1ElementShift,
      rotor1.turnover,
      (rotor2Shift + rotor2ElementShift) % alphabet.length,
      setRotor2ElementShift,
      isRotateRight
    )

    TryChangeRotorShift(
      rotor2ElementShift,
      rotor2.turnover,
      (rotor3Shift + rotor3ElementShift) % alphabet.length,
      setRotor3ElementShift,
      isRotateRight
    )

    setPreviousTextSize(text.length)
  }, [text, rotor1Shift, rotor2Shift, rotor3Shift])

  function TryChangeRotorShift(
    shift: number,
    turnover: string,
    rotorElementShift: number,
    setRotorElementShift: (value: number) => void,
    isRotateRight: boolean
  ) {
    const currentShift = isRotateRight
      ? shift
      : shift == 0
      ? alphabet.length - 1
      : shift - 1

    for (let i = 0; i < turnover.length; i++)
      if (currentShift == alphabet.indexOf(turnover[i]))
        if (isRotateRight) setRotorElementShift(rotorElementShift + 1)
        else setRotorElementShift(rotorElementShift - 1)
  }

  const handleResize = () => {
    SetShowElements(window.innerWidth >= 1200 ? true : false)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  })

  return (
    <div className="main">
      <Form
        alphabet={alphabet}
        setText={setText}
        setPatchPanel={setPatchPanel}
        setRotor1={setRotor1}
        setRotor1Shift={setRotor1Shift}
        setRotor2={setRotor2}
        setRotor2Shift={setRotor2Shift}
        setRotor3={setRotor3}
        setRotor3Shift={setRotor3Shift}
        setReflector={setReflector}
      />
      {outputText && (
        <div className="main__output">
          <div className="main__output-top">
            <div className="main__output-label">
              Encrypted Text: {outputText}
            </div>
          </div>
          <div className="main__output-bottom">
            {outputLastCharLetters &&
              outputLastCharLetters.map((l: string, i: number) => (
                <span key={i} className="main__output-list">
                  <span className="main__output-letter">{l}</span>
                  {i != outputLastCharLetters.length - 1 && (
                    <span className="main__output-arrow">&#8594;</span>
                  )}
                </span>
              ))}
          </div>
        </div>
      )}
      {showElements && (
        <Table
          alphabet={alphabet}
          patchPanel={patchPanel}
          rotor1={rotor1}
          rotor1Shift={rotor1Shift}
          rotor2={rotor2}
          rotor2Shift={rotor2Shift}
          rotor3={rotor3}
          rotor3Shift={rotor3Shift}
          reflector={reflector}
        />
      )}
      {showElements && (
        <div className="main__elements">
          <div className="main__elements-top">
            <Element name="Rotor 1" className="main__element main__element-top">
              <Rotor
                alphabet={alphabet}
                number={rotor1 != null ? rotor1.id : 1}
                turnover={rotor1 != null ? rotor1.turnover : ''}
                shift={rotor1ElementShift}
              />
            </Element>
            <Element name="Rotor 2" className="main__element main__element-top">
              <Rotor
                alphabet={alphabet}
                number={rotor2 != null ? rotor2.id : 2}
                turnover={rotor2 != null ? rotor2.turnover : ''}
                shift={rotor2ElementShift}
              />
            </Element>
            <Element name="Rotor 3" className="main__element main__element-top">
              <Rotor
                alphabet={alphabet}
                number={rotor3 != null ? rotor3.id : 3}
                turnover={rotor3 != null ? rotor3.turnover : ''}
                shift={rotor3ElementShift}
              />
            </Element>
          </div>
          <div className="main__elements-bottom">
            <Element
              name="Patch panel"
              className="main__element main__element-bottom"
            >
              <PatchPanel alphabet={alphabet} />
            </Element>
            <Element
              name="Reflector"
              className="main__element main__element-bottom"
            >
              <Reflector alphabet={alphabet} />
            </Element>
          </div>
          <Canvas
            alphabet={alphabet}
            patchPanel={patchPanel}
            rotor1={rotor1}
            rotor1Shift={rotor1ElementShift}
            rotor2={rotor2}
            rotor2Shift={rotor2ElementShift}
            rotor3={rotor3}
            rotor3Shift={rotor3ElementShift}
            outputLastCharLetters={outputLastCharLetters}
          />
        </div>
      )}
      {!showElements && (
        <div className="main__text-resize">
          Increase window size to view invisible elements
        </div>
      )}
    </div>
  )
}
