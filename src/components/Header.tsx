import React from "react";
import Container from "./Container";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-white py-5">
      <Container>
        <Logo />
        {/* <Navigation /> */}
        {/* <Cart /> */}
      </Container>
    </header>
  );
};

export default Header;
