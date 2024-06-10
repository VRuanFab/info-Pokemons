import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/homepage/Home'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<Homepage/>} path='/'/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
