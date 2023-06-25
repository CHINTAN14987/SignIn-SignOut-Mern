import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import SignUp from "./SignUp";
import PrivateComp from "./PrivateComponent";
import Login from "./Login";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComp />}>
            <Route path="/" element={<h1>Home</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
