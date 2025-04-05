import "./index.css";
import { Routes, Route } from 'react-router'
import Home from "./views/Home";


export function App() {
  return (
    <div className='app w-screen h-screen'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
