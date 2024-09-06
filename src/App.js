import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './LoginForm/LoginForm';
import SignupForm from './SignupForm/SignupForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<SignupForm />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
