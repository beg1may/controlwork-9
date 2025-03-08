import Toolbar from "./components/Toolbar/Toolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Transactions from "./components/Transactions/Transactions.tsx";

function App() {

  return (
    <>
        <Toolbar />
        <div className='container'>
            <Routes>
                <Route path='/' element={<Transactions />} />
                <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
        </div>
    </>
  )
}

export default App
