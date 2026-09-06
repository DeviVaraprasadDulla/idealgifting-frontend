import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import AnnouncementBar from "../components/common/AnnouncementBar";
import FloatingWhatsApp from "../components/common/FloatingWhatsApp";

/**
 * Matches the reference's actual chrome model: the announcement marquee
 * is a normal-flow block (not fixed), and the nav is simply
 * `position: sticky; top: 0` - so no compensating top-padding or dynamic
 * offset is needed on the content below it.
 */
const MainLayout = () => {
  return (
    <>
      <AnnouncementBar onHeightChange={() => {}} />
      <Navbar />

      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>

        <Footer />
      </div>

      <FloatingWhatsApp />
    </>
  );
};

export default MainLayout;
