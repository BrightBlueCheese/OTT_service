import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Contents,
  Landing,
  Login,
  Main,
  NotFound,
  RegisterStep2,
  RegisterDone,
  RegisterStep1,
  RegisterStep3,
  TheaterList,
  Theater,
} from ".";
import { Header } from "../components";
import Contents2 from "./Contents2";
import Contents3 from "./Contents3";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register/step1" element={<RegisterStep1 />} />
        <Route path="/register/step2" element={<RegisterStep2 />} />
        <Route path="/register/step3" element={<RegisterStep3 />} />
        <Route path="/register/done" element={<RegisterDone />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/contents" element={<Contents />} />
        <Route path="/contents2" element={<Contents2 />} />
        <Route path="/contents3" element={<Contents3 />} />
        <Route path="/theater_list" element={<TheaterList />} />
        <Route path="/theater/:id" element={<Theater />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
