
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from './pages/Home';
import RegisterUserPage from './pages/Register';
import LoginPage from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';


function App() {
 

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<RegisterUserPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/my-page" element={<h1>Min sida</h1>} />
    </Routes>
    </>
  )
}

export default App
