# Enigma Machine Simulator

Enigma Machine ia a cipher machine used to encrypt and decrypt secret messages.

### Rotor table

<table>
  <tr>
    <th>Rotors</th>
    <th colspan="26">Values</th>
    <th>Turnover</th>
  </tr>
  <tr>
    <td>Rotor&nbsp;1</td>
    <td>E</td>
    <td>K</td>
    <td>M</td>
    <td>F</td>
    <td>L</td>
    <td>G</td>
    <td>D</td>
    <td>Q</td>
    <td>V</td>	
    <td>Z</td>
    <td>N</td>
    <td>T</td>	
    <td>O</td>
    <td>W</td>
    <td>Y</td>	
    <td>H</td>
    <td>X</td>
    <td>U</td>
    <td>S</td>
    <td>P</td>
    <td>A</td>
    <td>I</td>
    <td>B</td>
    <td>R</td>
    <td>C</td>
    <td>J</td>
    <td>Q</td>
  </tr>
  <tr>
    <td>Rotor&nbsp;2</td>
    <td>A</td>
    <td>J</td>
    <td>D</td>
    <td>K</td>
    <td>S</td>
    <td>I</td>
    <td>R</td>
    <td>U</td>
    <td>X</td>
    <td>B</td>
    <td>L</td>
    <td>H</td>
    <td>W</td>
    <td>T</td>
    <td>M</td>
    <td>C</td>
    <td>Q</td>
    <td>G</td>
    <td>Z</td>
    <td>N</td>
    <td>P</td>
    <td>Y</td>
    <td>F</td>
    <td>V</td>
    <td>O</td>
    <td>E</td>
    <td>E</td>
  </tr>
  <tr>
    <td>Rotor&nbsp;3</td>
    <td>B</td>
    <td>D</td>
    <td>F</td>
    <td>H</td>
    <td>J</td>
    <td>L</td>
    <td>C</td>
    <td>P</td>
    <td>R</td>
    <td>T</td>
    <td>X</td>
    <td>V</td>
    <td>Z</td>
    <td>N</td>
    <td>Y</td>
    <td>E</td>
    <td>I</td>
    <td>W</td>
    <td>G</td>
    <td>A</td>
    <td>K</td>
    <td>M</td>
    <td>U</td>
    <td>S</td>
    <td>Q</td>
    <td>O</td>
    <td>V</td>
  </tr>
  <tr>
    <td>Rotor&nbsp;4</td>
    <td>E</td>
    <td>S</td>
    <td>O</td>
    <td>V</td>
    <td>P</td>
    <td>Z</td>
    <td>J</td>
    <td>A</td>
    <td>Y</td>
    <td>Q</td>
    <td>U</td>
    <td>I</td>
    <td>R</td>
    <td>H</td>
    <td>X</td>
    <td>L</td>
    <td>N</td>
    <td>F</td>
    <td>T</td>
    <td>G</td>
    <td>K</td>
    <td>D</td>
    <td>C</td>
    <td>M</td>
    <td>W</td>
    <td>B</td>
    <td>J</td>
  </tr>
  <tr>
    <td>Rotor&nbsp;5</td>
    <td>V</td>
    <td>Z</td>
    <td>B</td>
    <td>R</td>
    <td>G</td>
    <td>I</td>
    <td>T</td>
    <td>Y</td>
    <td>U</td>
    <td>P</td>
    <td>S</td>
    <td>D</td>
    <td>N</td>
    <td>H</td>
    <td>L</td>
    <td>X</td>
    <td>A</td>
    <td>W</td>
    <td>M</td>
    <td>J</td>
    <td>Q</td>
    <td>O</td>
    <td>F</td>
    <td>E</td>
    <td>C</td>
    <td>K</td>
    <td>Z</td>
  </tr>
  <tr>
    <td>Rotor&nbsp;6</td>
    <td>J</td>
    <td>P</td>
    <td>G</td>
    <td>V</td>
    <td>O</td>
    <td>U</td>
    <td>M</td>
    <td>F</td>
    <td>Y</td>
    <td>Q</td>
    <td>B</td>
    <td>E</td>
    <td>N</td>
    <td>H</td>
    <td>Z</td>
    <td>R</td>
    <td>D</td>
    <td>K</td>
    <td>A</td>
    <td>S</td>
    <td>X</td>
    <td>L</td>
    <td>I</td>
    <td>C</td>
    <td>T</td>
    <td>W</td>
    <td>ZM</td>
  </tr>
  <tr>
    <td>Rotor&nbsp;7</td>
    <td>N</td>
    <td>Z</td>
    <td>J</td>
    <td>H</td>
    <td>G</td>
    <td>R</td>
    <td>C</td>
    <td>X</td>
    <td>M</td>
    <td>Y</td>
    <td>S</td>
    <td>W</td>
    <td>B</td>
    <td>O</td>
    <td>U</td>
    <td>F</td>
    <td>A</td>
    <td>I</td>
    <td>V</td>
    <td>L</td>
    <td>P</td>
    <td>E</td>
    <td>K</td>
    <td>Q</td>
    <td>D</td>
    <td>T</td>
    <td>ZM</td>
  </tr>
  <tr>
    <td>Rotor&nbsp;8</td>
    <td>F</td>
    <td>K</td>
    <td>Q</td>
    <td>H</td>
    <td>T</td>
    <td>L</td>
    <td>X</td>
    <td>O</td>
    <td>C</td>
    <td>B</td>
    <td>J</td>
    <td>S</td>
    <td>P</td>
    <td>D</td>
    <td>Z</td>
    <td>R</td>
    <td>A</td>
    <td>M</td>
    <td>E</td>
    <td>W</td>
    <td>N</td>
    <td>I</td>
    <td>U</td>
    <td>Y</td>
    <td>G</td>
    <td>V</td>
    <td>ZM</td>
  </tr>
</table>

### Reflector table

<table>
  <tr>
    <th>Reflectors</th>
    <th>Values</th>
  </tr>
  <tr>
    <td>Reflector&nbsp;B</td>
    <td>(AY)	(BR)	(CU)	(DH)	(EQ)	(FS)	(GL)	(IP)	(JX)	(KN)	(MO)	(TZ)	(VW)</td>
  </tr>
  <tr>
    <td>Reflector&nbsp;C</td>
    <td>(AF)	(BV)	(CP)	(DJ)	(EI)	(GO)	(HY)	(KR)	(LZ)	(MX)	(NW)	(TQ)	(SU)</td>
  </tr>
  <tr>
    <td>Reflector&nbsp;B&nbsp;Dunn</td>
    <td>(AE)	(BN)	(CK)	(DQ)	(FU)	(GY)	(HW)	(IJ)	(LO)	(MP)	(RX)	(SZ)	(TV)</td>
  </tr>
  <tr>
    <td>Reflector&nbsp;C&nbsp;Dunn</td>
    <td>(AR)	(BD)	(CO)	(EJ)	(FN)	(GT)	(HK)	(IV)	(LM)	(PW)	(QZ)	(SX)	(UY)</td>
  </tr>
</table>

## Encrypt
![alt text](https://github.com/val-ugs/UDevMe.EnigmaApp/blob/master/media/encrypt.png?raw=true)
## Decrypt
![alt text](https://github.com/val-ugs/UDevMe.EnigmaApp/blob/master/media/decrypt.png?raw=true)
