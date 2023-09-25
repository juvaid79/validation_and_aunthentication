import './App.css';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Publicroute from './Publicroute';
import Privateroute from './Privateroute';
import UserHome from './User/UserHome';
import UserLogin from './User/UserLogin';
import UserSingup from './User/UserSingup';
import PageNotFound from './User/PageNotFound';
import AddUser from './User/AddUser';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Publicroute />}>
            <Route index element={<UserLogin />} />
            <Route path="/userlogin" element={<UserLogin />} />
            <Route path="/usersingup" element={<UserSingup />} />
          </Route>

          <Route path="/" element={<Privateroute />}>
            <Route index element={<UserHome />} />
            <Route path="/userhome" element={<UserHome />} />
            <Route path='/adduser' element={<AddUser/>}/>
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/userhome/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
