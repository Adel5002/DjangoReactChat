import './App.css';
import AppRouter from './components/AppRouter';
import MyNavbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <MyNavbar/>
      <AppRouter/>
    </div>
  );
}

export default App;
