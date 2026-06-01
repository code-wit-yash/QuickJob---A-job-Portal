import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import PostJob from "./pages/PostJob";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import MyJobs from "./pages/MyJobs";
import Applicants from "./pages/Applicants";
import AppliedJobs from "./pages/AppliedJob";
import UserProfile from "./pages/UserProfile";
import CompanyProfile from "./pages/CompanyProfile";
import ApplicantProfile from "./pages/ApplicantProfile";
import ViewCompanyProfile from "./pages/ViewCompanyProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/company/my-jobs" element={<MyJobs />} />
        <Route path="/applicants/:jobId" element={<Applicants />} />
        <Route path="/my-applications" element={<AppliedJobs />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/company/profile" element={<CompanyProfile />} />
        <Route path="/profile/:email" element={<ApplicantProfile />} />
        <Route path="/company-view/:email" element={<ViewCompanyProfile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;