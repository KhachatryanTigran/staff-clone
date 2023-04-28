import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.scss";

import CompanyPage from "./components/company/CompanyPage";
import CompanyPageDetails from "./components/company/CompanyPageDetails.jsx";
import RegisterCompany from "./components/login/companyRegister/RegisterCompany";
import Companies from "./pages/Companies";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./components/JobDetails/JobDetails";
import { Layout } from "./components/Layout";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { changeCurrentUser, changeIsUser } from "./store/slices/loginSlice";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import JobDetailsNewWork from "./components/JobDetails/JobDetailsNewWork";
import AddNewWork from "./components/addNewWork/AddNewWork";
import UserPage from "./components/user/UserPage";
import { doc, getDoc } from "firebase/firestore";
import CompanyLogin from "./components/login/companyLogin/CompanyLogin";
import PDFConvertor from "./components/user/pdfConvertor/PDFConvertor";

const r = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/company/:id" element={<CompanyPage />} />
      <Route path="/companyDetails/:id" element={<CompanyPageDetails />} />
      <Route path="/user/:id" element={<UserPage />} />

      <Route path="/companies" element={<Companies />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route
        path="/company/register"
        element={
          <ProtectedRoute>
            <RegisterCompany />
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/login"
        element={
          <ProtectedRoute>
            <CompanyLogin />
          </ProtectedRoute>
        }
      />
      <Route path="/addNewWork" element={<AddNewWork />} />

      <Route path="/addNewWork/:id" element={<AddNewWork />} />

      <Route path="/jobInfo" element={<JobDetailsNewWork />} />

      <Route path="/jobInfo/:id" element={<JobDetailsNewWork />} />

      <Route path="/jobInfoToCompany/:id" element={<JobDetailsNewWork />} />
      <Route path="/YourCv" element={<PDFConvertor />} />
    </Route>
  )
);
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = () => {
      onAuthStateChanged(auth, async (currentUser) => {
        console.log(currentUser?.displayName);
        dispatch(changeCurrentUser(currentUser));
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const d = await getDoc(docRef);
          dispatch(changeIsUser(d?.data().isUser));
        } catch (error) {}
      });
    };
    getData();
  }, [auth]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="App">
      <RouterProvider router={r} />
    </div>
  );
}

export default App;
