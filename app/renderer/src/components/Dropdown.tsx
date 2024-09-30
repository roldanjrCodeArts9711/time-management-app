import { SVG } from "components";
import React, { useState } from "react";
import {
  StyledDropdown,
  StyledDropdownContent,
  StyledDropdownHeading,
} from "styles";

type Props = {
  children?: React.ReactNode;
};

// Todo, convert this into a dropdown menu instead of Radio buttons
const Dropdown: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <StyledDropdown>
      <StyledDropdownHeading
        as={"button"}
        open={open}
        onClick={toggleDropdown}
      >
        Notification Sound
        <SVG name="chevron-down" />
      </StyledDropdownHeading>
      {open && (
        <StyledDropdownContent>{children}</StyledDropdownContent>
      )}
    </StyledDropdown>
  );
};

export default React.memo(Dropdown);
