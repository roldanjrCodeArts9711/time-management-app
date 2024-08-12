import styled from "styled-components/macro";

export const StyledCollapse = styled.div`
  width: 100%;
  min-height: 4rem;

  display: grid;
  grid-template-rows: 4rem;
`;

export const StyledCollapseHeading = styled.h4<{ open?: boolean }>`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: var(--color-body-text);
  font-weight: 400;
  border: none;
  background-color: transparent;

  &:focus {
    color: var(--color-primary);
  }

  & > svg {
    width: 1.4rem;
    height: 1.4rem;

    margin-right: 0.8rem;

    transform: ${(p) => p.open && "rotate(180deg)"};
    transition: transform 180ms ease;
  }

  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 1px;

    background-color: var(--color-border-secondary);
  }
`;

export const StyledCollapseContent = styled.div`
  width: 100%;
  height: 4rem;

  display: flex;
  align-items: center;

  animation: enter 180ms ease;

  & > label:not(:last-of-type) {
    margin-right: 3.2rem;
  }

  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 1px;

    background-color: var(--color-border-secondary);
  }

  @keyframes enter {
    0% {
      opacity: 0;
      transform: translateY(-1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StyledCollapseContentResponsive = styled(
  StyledCollapseContent
)`
  height: auto;
`;
