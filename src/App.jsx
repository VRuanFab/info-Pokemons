import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/homepage/Home'
import Details from './pages/info/Detail'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<Homepage/>} path='/'/>
        <Route element={<Details/>} path='/details'/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
