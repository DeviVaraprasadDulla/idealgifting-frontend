import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar, { NAVBAR_HEIGHT } from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import AnnouncementBar from "../components/common/AnnouncementBar";
import FloatingWhatsApp from "../components/common/FloatingWhatsApp";

const MainLayout = () => {
  const [announcementHeight, setAnnouncementHeight] = useState(0);

  return (
    <>
      <AnnouncementBar onHeightChange={setAnnouncementHeight} />
      <Navbar topOffset={announcementHeight} />

      <div
        style={{ paddingTop: NAVBAR_HEIGHT + announcementHeight }}
        className="min-h-screen flex flex-col"
      >
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
