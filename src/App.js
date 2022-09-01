import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import Home from './components/Home/Home';

function App() {
    return (
        <>
            <GlobalStyles></GlobalStyles>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home></Home>} />
                        <Route path="/about" element={<></>} />
                        <Route path="/category" element={<></>} />
                        <Route path="/product_details:product_name" element={<></>} />
                        <Route path="/contact" element={<></>} />
                        <Route path="/new_arrival" element={<></>} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
