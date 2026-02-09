
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from './pages/Home';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import MyPage from './pages/MyPage';


function App() {
 

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/my-page" element={<MyPage />} />
    </Routes>
    </>
  )
}

export default App
