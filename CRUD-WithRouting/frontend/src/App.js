import './App.css';
import { Navbar } from './components/Navbar';
import { UserWrapper } from './components/UserWrapper';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <UserWrapper />      
    </BrowserRouter>
  );
}

export default App;
