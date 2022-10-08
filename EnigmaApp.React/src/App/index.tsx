import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Error from '../pages/Error'

import './styles.scss'

function App() {
  return (
    <div className="app">
      {
        <BrowserRouter>
          <Routes>
            <Route path="/error" element={<Error />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      }
    </div>
  )
}

export default App
