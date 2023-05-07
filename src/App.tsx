import React from 'react';
import Sidebar from "./Components/sidebar";
import NavBar from "./Components/NavBar";
import {Route, Routes} from "react-router-dom";
import Search from "./pages/Search";
import Home from "./pages/Home";
import MyLibrary from "./pages/MyLibrary";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Sidebar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/my-library" element={<MyLibrary />} />
            </Routes>

        </div>
    );
}

export default App;