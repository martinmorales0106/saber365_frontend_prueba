import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const SinRegistrar = () => {
  return (
    <div>
      <Header />
      <div>
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SinRegistrar;
