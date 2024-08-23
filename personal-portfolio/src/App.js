
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { FlipBook } from './components/Book';
import { Footer } from "./components/Footer";


function App() {

  return (
    <div className="App">
       <NavBar />
      <Banner /> 
      {/* <FlipBook /> */}
       <Footer /> 
    </div>
  );
}

export default App;
