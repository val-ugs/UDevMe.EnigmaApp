import { useCallback, useState } from 'react'

import './styles.scss'

interface CounterProps {
  setValue: (value: number) => void
}

function Counter({ setValue }: CounterProps) {
  const [count, setCount] = useState<number>(0)
  const maxValue = 100
  const minValue = -100

  const IncrementHandler = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()

      if (count >= maxValue) return

      setCount(count + 1)
      setValue(count + 1)
    },
    [count, setValue]
  )

  const DecrementHandler = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()

      if (count <= minValue) return

      setCount(count - 1)
      setValue(count - 1)
    },
    [count, setValue]
  )

  return (
    <div className="counter">
      <div>{count}</div>
      <div className="counter__buttons">
        <button
          className="counter__button counter__button-up"
          onClick={IncrementHandler}
        >
          <div>V</div>
        </button>
        <button
          className="counter__button counter__button-down"
          onClick={DecrementHandler}
        >
          V
        </button>
      </div>
    </div>
  )
}

export default Counter
