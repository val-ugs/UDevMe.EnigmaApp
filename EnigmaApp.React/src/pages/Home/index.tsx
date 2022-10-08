import { Routes, Route } from 'react-router-dom'

import './styles.scss'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Main from '../../components/Main'

export default function Home() {
  return (
    <div className="home">
      <Header />
      <main className="home__main">
        <Routes>
          <Route path="*" element={<Main />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
