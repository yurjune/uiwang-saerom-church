import { Fragment } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  return (
    <Fragment>
      <DesktopHeader />
      <MobileHeader />
    </Fragment>
  );
};

export default Header;
