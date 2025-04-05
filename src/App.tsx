import "./index.css";
import { Routes, Route } from 'react-router'
import Home from "./views/Home";
import DataFetcher from "./services/DataFetcher";


export function App() {
  return (
    <div className='app w-screen h-screen'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <DataFetcher />
    </div>
  );
}

export default App;
