
// import './App.css';
// import Home from './pages/Home/Home';


// function App() {
//   return (
//     <div className="App">
//       <Home/>

//     </div>
//   );
// }

// export default App;

import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import MyList from "./pages/MyList/MyList";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

import { useNetflix } from "./context/NetflixContext";

function App() {
  const { user } = useNetflix();

  return (
    <div className="App">
      <Routes>
        {/* ✅ GitHub Pages repo path safety */}
        <Route
          path="/Netflix-clone-2025"
          element={<Navigate to="/" replace />}
        />

        {/* ✅ Main routes */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/search"
          element={user ? <Search /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/mylist"
          element={user ? <MyList /> : <Navigate to="/signin" replace />}
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* ✅ Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
