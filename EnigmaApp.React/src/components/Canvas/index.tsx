// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
import { useEffect, useRef } from 'react'
import { RotorProps } from '../../interfaces/rotor.interface'

import './styles.scss'

interface CanvasProps {
  alphabet: string
  patchPanel: string
  rotor1: RotorProps | null
  rotor1Shift: number
  rotor2: RotorProps | null
  rotor2Shift: number
  rotor3: RotorProps | null
  rotor3Shift: number
  outputLastCharLetters: Array<string> | null
}

function Canvas({
  alphabet,
  patchPanel,
  rotor1,
  rotor1Shift,
  rotor2,
  rotor2Shift,
  rotor3,
  rotor3Shift,
  outputLastCharLetters
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const size = alphabet.length
  const x_1 = [8, 22, 38, 53, 67, 80, 95, 110, 122, 134, 147, 160, 177, 195, 211, 225, 241, 257, 272, 285, 300, 315, 333, 350, 365, 379]
  const x_2 = [197, 237, 277, 310, 338, 360, 370, 370, 360, 338, 315, 277, 237, 195, 154, 115, 80, 50, 35, 25, 25, 33, 55, 80, 115, 155]
  const y_2 = [80, 85, 95, 115, 150, 185, 225, 265, 305, 345, 380, 400, 413, 420, 413, 400, 380, 345, 305, 268, 225, 185, 150, 118, 95, 80]
  const x_3 = [197, 223, 250, 270, 290, 302, 310, 310, 305, 290, 268, 250, 224, 196, 168, 142, 120, 100, 88, 84, 84, 86, 96, 118, 144, 170]
  const y_3 = [135, 140, 150, 165, 185, 210, 235, 265, 292, 318, 328, 350, 360, 364, 364, 352, 336, 316, 292, 265, 236, 210, 180, 160, 150, 142]
  const x_4 = [597, 637, 677, 710, 738, 760, 770, 770, 760, 738, 715, 677, 637, 595, 554, 515, 480, 450, 435, 425, 425, 433, 455, 480, 515, 555]
  const y_4 = [80, 85, 95, 115, 150, 185, 225, 265, 305, 345, 380, 400, 413, 420, 413, 400, 380, 345, 305, 268, 225, 185, 150, 118, 95, 80]
  const x_5 = [597, 623, 650, 670, 690, 702, 710, 710, 705, 690, 668, 650, 624, 596, 568, 542, 520, 500, 488, 484, 484, 486, 496, 518, 544, 570]
  const y_5 = [135, 140, 150, 165, 185, 210, 235, 265, 292, 318, 328, 350, 360, 364, 364, 352, 336, 316, 292, 265, 236, 210, 180, 160, 150, 142]
  const x_6 = [997, 1037, 1077, 1110, 1138, 1160, 1170, 1170, 1160, 1138, 1115, 1077, 1037, 995, 954, 915, 880, 850, 835, 825, 825, 833, 855, 880, 915, 955]
  const y_6 = [80, 85, 95, 115, 150, 185, 225, 265, 305, 345, 380, 400, 413, 420, 413, 400, 380, 345, 305, 268, 225, 185, 150, 118, 95, 80]
  const x_7 = [997, 1023, 1050, 1070, 1090, 1102, 1110, 1110, 1105, 1090, 1068, 1050, 1024, 996, 968, 942, 920, 900, 888, 884, 884, 886, 896, 918, 944, 970]
  const y_7 = [135, 140, 150, 165, 185, 210, 235, 265, 292, 318, 328, 350, 360, 364, 364, 352, 336, 316, 292, 265, 236, 210, 180, 160, 150, 142]
  const x_8 = [997, 1030, 1062, 1090, 1115, 1130, 1140, 1140, 1130, 1110, 1092, 1060, 1029, 994, 960, 928, 900, 878, 858, 850, 853, 855, 875, 900, 928, 960]
  const y_8 = [512, 515, 527, 545, 570, 600, 635, 670, 705, 740, 765, 782, 798, 798, 795, 790, 766, 736, 708, 675, 640, 605, 575, 542, 525, 515]
  
  useEffect(() => {
    const canvas = canvasRef.current

    if (canvas == null) return

    canvas.height = 850
    canvas.width = 1200
    const ctx = canvas.getContext('2d')

    if (ctx == null) return

    // Patch panel
    for (let i = 0; i < size; i++) {
      console.log()
      ctx.beginPath()
      ctx.moveTo(x_1[i], 790)
      ctx.lineTo(x_1[alphabet.indexOf(patchPanel[i])], 520)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.stroke()
    }
    
    // Patch panel to Rotor1
    for (let i = 0; i < size; i++) {
      ctx.beginPath()
      ctx.moveTo(x_1[i], 490)
      ctx.lineTo(x_2[i], y_2[i])
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.stroke()
    }

    // Rotor1
    if (rotor1 == null) return

    for (let i = 0; i < size; i++) {
      ctx.beginPath()
      const index = (i - rotor1Shift % size + size) % size
      const index2 = (alphabet.indexOf(rotor1.text[i]) - rotor1Shift % size + size) % size
      ctx.moveTo(x_2[index], y_2[index])
      ctx.lineTo(x_3[index2], y_3[index2])
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.stroke()
    }

    // Rotor1 to Rotor2
    for (let i = 0; i < size; i++) {
      ctx.beginPath()
      ctx.moveTo(x_3[i], y_3[i])
      ctx.lineTo(x_4[i], y_4[i])
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.stroke()
    }

    // Rotor2
    if (rotor2 == null) return

    for (let i = 0; i < size; i++) {
      ctx.beginPath()
      const index = (i - rotor2Shift % size + size) % size
      const index2 = (alphabet.indexOf(rotor2.text[i]) - rotor2Shift % size + size) % size
      ctx.moveTo(x_4[index], y_4[index])
      ctx.lineTo(x_5[index2], y_5[index2])
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.stroke()
    }

    // Rotor2 to Rotor3
    for (let i = 0; i < size; i++) {
      ctx.beginPath()
      ctx.moveTo(x_5[i], y_5[i])
      ctx.lineTo(x_6[i], y_6[i])
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.stroke()
    }

    // Rotor3
    if (rotor3 == null) return

    for (let i = 0; i < size; i++) {
      ctx.beginPath()
      const index = (i - rotor3Shift % size + size) % size
      const index2 = (alphabet.indexOf(rotor3.text[i]) - rotor3Shift % size + size) % size
      ctx.moveTo(x_6[index], y_6[index])
      ctx.lineTo(x_7[index2], y_7[index2])
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.stroke()
    }

    // Rotor3
    for (let i = 0; i < size; i++) {
      ctx.beginPath()
      ctx.moveTo(x_7[i], y_7[i])
      ctx.lineTo(x_8[i], y_8[i])
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.stroke()
    }

    if (outputLastCharLetters == null) return
    const list = outputLastCharLetters

    // Direct
    ctx.beginPath()
    ctx.moveTo(x_1[alphabet.indexOf(list[0])], 790)
    ctx.lineTo(x_1[alphabet.indexOf(list[1])], 510)
    const index = (alphabet.indexOf(list[2]) - rotor1Shift % size + size) % size
    ctx.lineTo(x_2[index], y_2[index])
    const index2 = (alphabet.indexOf(list[3]) - rotor1Shift % size + size) % size
    ctx.lineTo(x_3[index2], y_3[index2])
    const index3 = (alphabet.indexOf(list[4]) - rotor2Shift % size + size) % size
    ctx.lineTo(x_4[index3], y_4[index3])
    const index4 = (alphabet.indexOf(list[5]) - rotor2Shift % size + size) % size
    ctx.lineTo(x_5[index4], y_5[index4])
    const index5 = (alphabet.indexOf(list[6]) - rotor3Shift % size + size) % size
    ctx.lineTo(x_6[index5], y_6[index5])
    const index6 = (alphabet.indexOf(list[7]) - rotor3Shift % size + size) % size
    ctx.lineTo(x_7[index6], y_7[index6])
    const index7 = alphabet.indexOf(list[8])
    ctx.lineTo(x_8[index7], y_8[index7])
    const index8 = alphabet.indexOf(list[9])
    ctx.lineTo(x_8[index8], y_8[index8])
    ctx.strokeStyle = 'red'
    ctx.stroke()

    // Back
    ctx.beginPath()
    ctx.lineTo(x_8[index8], y_8[index8])
    const index9 = (alphabet.indexOf(list[10]) - rotor3Shift % size + size) % size
    ctx.lineTo(x_7[index9], y_7[index9])
    const index10 = (alphabet.indexOf(list[11]) - rotor3Shift % size + size) % size
    ctx.lineTo(x_6[index10], y_6[index10])
    const index11 = (alphabet.indexOf(list[12]) - rotor2Shift % size + size) % size
    ctx.lineTo(x_5[index11], y_5[index11])
    const index12 = (alphabet.indexOf(list[13]) - rotor2Shift % size + size) % size
    ctx.lineTo(x_4[index12], y_4[index12])
    const index13 = (alphabet.indexOf(list[14]) - rotor1Shift % size + size) % size
    ctx.lineTo(x_3[index13], y_3[index13])
    const index14 = (alphabet.indexOf(list[15]) - rotor1Shift % size + size) % size
    ctx.lineTo(x_2[index14], y_2[index14])
    ctx.lineTo(x_1[alphabet.indexOf(list[16])], 510)
    ctx.lineTo(x_1[alphabet.indexOf(list[17])], 790)
    ctx.strokeStyle = 'cyan'
    ctx.stroke()
  }, [
    patchPanel,
    rotor1,
    rotor1Shift,
    rotor2,
    rotor2Shift,
    rotor3,
    rotor3Shift,
    outputLastCharLetters
  ])

  return (
    <div className="canvas">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Canvas
