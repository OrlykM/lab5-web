import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from "./pages/LandingPage";
import UsersListPage from "./pages/UsersListPage";
import UserSettingPage from "./pages/UserSettingPage";
//import UserProfilePage from "./pages/UserProfilePage";
import SingleAdvertisementPage from "./pages/SingleAdvertisementPage";
import RegisterPage from "./pages/RegisterPage";
//import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import CreateNewAdvertisementPage from "./pages/CreateNewAdvertisementPage";
import AllAdvertismentMainPage from "./pages/AllAdvertismentMainPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {ROUTES} from "./routes/routes";

//import EditAdvertismentPage from "./pages/EditAdvertismentPage";
//import ResetPassword from "./pages/ResetPasswordPage";
import Footer from "./Templates/Footer";
import IsLogined from "./routes/ProtectedRoutes";
import HeaderLogined from "./Templates/HeaderLogined";
import HeaderWithLogo from "./Templates/HeaderWithLogo";
import HeaderNotLogined from "./Templates/HeaderNotLogined";
import IsLoginedHeader from "./routes/HeaderLogic";
import ApproveArticlesPage from "./pages/ApproveArticlesPage";
function App() {

  return (
      <>
      <BrowserRouter>
        <Routes>

          <Route path={"*"} element={
            <>
              <HeaderWithLogo></HeaderWithLogo>
              <ErrorPage/>
            </>
          }/>
          <Route path={ROUTES.HOME} element={
            <>
              <IsLoginedHeader/>
              <LandingPage/>
            </>
          }/>
          <Route path={ROUTES.LOGIN} element={
            <>
            <HeaderWithLogo></HeaderWithLogo>
            </>}/>
          <Route path={ROUTES.REGISTER} element={ <>
            <HeaderWithLogo></HeaderWithLogo>
            <RegisterPage/>
          </>} />


          <Route path={ROUTES.USERSLIST} element={
            <>
              <IsLogined />
              <IsLoginedHeader/>
              <UsersListPage/>
            </>
          }/>

          <Route path={ROUTES.NEWAD} element={
            <>
              <IsLogined />
              <IsLoginedHeader/>
              <CreateNewAdvertisementPage/>
            </>
          }/>

          <Route path={ROUTES.ALLADS} element={
            <>
              <IsLogined/>
                <IsLoginedHeader/>
                <AllAdvertismentMainPage/>
            </>
          }/>

          <Route path={ROUTES.PROFILE} element={
            <>
              <IsLogined/>
              <IsLoginedHeader/>
            </>
          }/>

          <Route path={ROUTES.SETTINGS} element={
            <>
              <IsLogined />
              <IsLoginedHeader/>
                <UserSettingPage/>
            </>
          }/>
          <Route path={ROUTES.SINGLEAD} element={
            <>
              <IsLogined />
              <IsLoginedHeader/>
              <SingleAdvertisementPage/>
            </>
          }/>
          <Route path={ROUTES.EDITPAGE} element={
            <>
              <IsLogined />
              <IsLoginedHeader/>
            </>
          }/>
          <Route path={ROUTES.ADMINAPPROVE} element={
            <>
              <IsLogined />
              <IsLoginedHeader/>
              <ApproveArticlesPage/>
            </>
          }/>

        </Routes>
        <Footer></Footer>
      </BrowserRouter>
      </>
  );
}
export default App;