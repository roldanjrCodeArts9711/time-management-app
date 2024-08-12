import { SVG } from "components";
import React, { useState } from "react";
import {
  StyledCollapse,
  StyledCollapseContent,
  StyledCollapseContentResponsive,
  StyledCollapseHeading,
} from "styles";

type Props = {
  children?: React.ReactNode;
  title?: string;
  heightResponsive?: boolean;
};

const Collapse: React.FC<Props> = ({
  children,
  title,
  heightResponsive = false,
}) => {
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <StyledCollapse>
      {title && (
        <StyledCollapseHeading
          as={"button"}
          open={open}
          onClick={toggleCollapse}
        >
          {title}
          <SVG name="chevron-down" />
        </StyledCollapseHeading>
      )}
      {open ? (
        heightResponsive ? (
          <StyledCollapseContentResponsive>
            {children}
          </StyledCollapseContentResponsive>
        ) : (
          <StyledCollapseContent>{children}</StyledCollapseContent>
        )
      ) : null}
    </StyledCollapse>
  );
};

export default React.memo(Collapse);
