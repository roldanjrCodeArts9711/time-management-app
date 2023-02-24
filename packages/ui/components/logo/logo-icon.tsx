import { memo } from "react";
import { styled, SxProps, VariantProps } from "../../theme";

const StyledSvg = styled("svg", {
  variants: {
    appState: {
      "stay-focused": {
        color: "$blue9",
      },
      "short-break": {
        color: "$green9",
      },
      "long-break": {
        color: "$orange9",
      },
      "special-break": {
        color: "$brown9",
      },
    },
  },
  defaultVariants: {
    appState: "stay-focused",
  },
});

export type LogoIconProps = {
  /**
   * The size of the icon, it is used for both width and height
   */
  iconSize: SxProps["width" | "height"];
} & VariantProps<typeof StyledSvg>;

const LogoIcon = ({ iconSize, ...rest }: LogoIconProps) => {
  return (
    <StyledSvg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      css={{
        width: iconSize,
        height: iconSize,
      }}
      {...rest}
    >
      <rect
        x="10"
        y="10"
        width="236"
        height="236"
        rx="50"
        stroke="currentColor"
        strokeWidth="20"
      />
      <path
        d="M102.728 131.301H129.078C136.387 131.301 142.621 128.721 147.781 123.562C152.879 118.464 155.428 112.261 155.428 104.951C155.428 97.6424 152.879 91.4081 147.781 86.2488C142.621 81.0894 136.387 78.5097 129.078 78.5097C121.769 78.5097 115.535 81.0894 110.375 86.2488C105.277 91.4081 102.728 97.6424 102.728 104.951V131.301ZM102.728 153.873V188.791C102.728 191.924 101.623 194.534 99.4118 196.622C97.2006 198.834 94.5902 199.939 91.5806 199.939H91.3042C88.2945 199.939 85.6841 198.834 83.473 196.622C81.2618 194.534 80.1562 191.924 80.1562 188.791L80.1562 104.951C80.1562 91.4388 84.9471 79.8917 94.5288 70.31C104.11 60.7897 115.627 56.0296 129.078 56.0296C142.591 56.0296 154.107 60.7897 163.627 70.31C173.209 79.8917 178 91.4388 178 104.951C178 118.403 173.209 129.919 163.627 139.501C154.107 149.083 142.591 153.873 129.078 153.873H102.728Z"
        fill="currentColor"
      />
    </StyledSvg>
  );
};

export default memo(LogoIcon);
