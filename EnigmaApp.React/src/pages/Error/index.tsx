import { useLocation, useNavigate } from 'react-router-dom'

import './styles.scss'

interface LocationStateProps {
  code: string
  message: string
}

export default function Error() {
  const navigation = useNavigate()
  const location = useLocation()

  const { code, message } =
    location.state != null
      ? (location.state as LocationStateProps)
      : { code: null, message: null }

  const onClickHandler = () => {
    navigation('/')
  }

  return (
    <div className="error">
      <div className="error__element error__text">Error</div>
      {code && (
        <div className="error__element error__code">Error code: {code}</div>
      )}
      {message && (
        <div className="error__element error__message">
          Error message: {message}
        </div>
      )}
      <button onClick={onClickHandler} className="error__element error__button">
        Reset connection
      </button>
    </div>
  )
}
