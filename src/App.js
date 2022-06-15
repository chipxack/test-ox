import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {HomePage} from "./views/home";
import {AuthPage} from "./views/auth";
import Cookies from "js-cookie";

function App() {
    const token = Cookies.get('token')

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={token ? <HomePage /> : <Navigate to="/auth"  />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="*" element={<AuthPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
