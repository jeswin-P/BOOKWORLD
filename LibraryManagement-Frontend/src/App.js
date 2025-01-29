import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentLogin from './Components/Students/StudentLogin';
import StaffLogin from './Components/Staff/StaffLogin';
import StaffRegister from './Components/Staff/StaffRegister';
import AdminLogin from './Components/Admin/AdminLogin';
import StudentReg from './Components/Students/StudentReg';
import Landing from './Components/common/Landing';
import StudentProfile from './Components/Students/StudentProfile';
import StaffProfile from './Components/Staff/StaffProfile';
import AdminHome from './Components/Admin/AdminHome';
import StaffHome from './Components/Staff/StaffHome';
import StaffNavbar from './Components/Staff/StaffNavbar';
import StaffBook from './Components/Staff/StaffBook';
import StaffBookDetails from './Components/Staff/StaffBookDetails';
import StudentHome from './Components/Students/StudentHome';
import StudentNavbar from './Components/Students/StudentNavbar';
import StudentBook from './Components/Students/StudentBook';
import StudentBookDetails from './Components/Students/StudentBookDetails';
import Footer from './Components/common/Footer';
import StudentForgetPassword from './Components/Students/StudentForgetPassword';
import StaffForgetPassword from './Components/Staff/StaffForgetPassword';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={[<Landing />, <Footer />]} />
        <Route path='/StudentLogin' element={<StudentLogin />}/>
        <Route path='/Studentreg' element={<StudentReg />} />
        <Route path='/Studenthome' element={[<StudentNavbar />, <StudentHome />, <Footer />]} />
        <Route path='/Studentpf' element={<StudentProfile />} />
        <Route path='/studentbook' element={[<StudentNavbar />, <StudentBook />, <Footer />]} />
        <Route path='/studentbookdetails/:id' element={[<StudentNavbar />, <StudentBookDetails />, <Footer />]} />
        <Route path='/StaffLogin' element={<StaffLogin />} />
        <Route path='/StaffRegister' element={<StaffRegister />} />
        <Route path='/Staffpf' element={<StaffProfile />} />
        <Route path='/Staffhome' element={[<StaffNavbar />, <StaffHome />, <Footer />]} />
        <Route path='/Staffbook' element={[<StaffNavbar />, <StaffBook />, <Footer />]} />
        <Route path='/Staffbookdetails/:id' element={[<StaffNavbar />, <StaffBookDetails />, <Footer />]} />
        <Route path='/Adminlogin' element={<AdminLogin />} />
        <Route path='/Adminhome/*' element={<AdminHome />} />
        <Route path='/StudentForget' element={<StudentForgetPassword />} />
        <Route path='/StaffForget' element={<StaffForgetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
