import './styles.scss'

import udevmelogo from '../../images/udevmelogo.png'

function Header() {
  return (
    <header className="header">
      <div className="header__element header__logo">
        <img className="header__logo-image" src={udevmelogo} alt="UDeVMe" />
      </div>
      <div className="header__element header__title">Enigma</div>
    </header>
  )
}

export default Header
