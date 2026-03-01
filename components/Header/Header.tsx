import { Fragment } from "react";
import DesktopHeader from "@/components/Header/DesktopHeader";
import MobileHeader from "@/components/Header/MobileHeader";

const Header = () => {
  return (
    <Fragment>
      <DesktopHeader />
      <MobileHeader />
    </Fragment>
  );
};

export default Header;
