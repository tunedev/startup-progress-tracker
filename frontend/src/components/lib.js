/** @jsxRuntime classic */
/* @jsx jsx */

import { jsx, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as colors from "styles/colors";
import * as mq from "styles/media-queries";
import { FaSpinner } from "react-icons/fa";
import { Dialog as ReachDialog } from "@reach/dialog";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});

Spinner.defaultProps = {
  "aria-label": "Loading",
  color: colors.primary,
};

const buttonVariants = {
  primary: {
    backgroundColor: colors.primary,
    color: colors.base,
  },
  secondary: {
    backgroundColor: colors.gray,
    color: colors.text,
  },
};

const Button = styled.button(
  {
    padding: "10px 15px",
    border: "0",
    borderRadius: "4px",
    lineHeight: "1.5",
  },
  (variant = "primary") => buttonVariants[variant]
);

function FullPageSpinner() {
  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.gray,
        fontSize: "4em",
        height: "100vh",
      }}
    >
      <Spinner />
    </div>
  );
}

const Dialog = styled(ReachDialog)({
  maxWidth: "550px",
  borderRadius: "4px",
  paddingBottom: "3.5em",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
  margin: "20vh auto",
  [mq.small]: {
    width: "100%",
    margin: "10vh auto",
  },
});

const CirleButton = styled.button({
  borderRadius: "30px",
  padding: "0",
  width: "40px",
  height: "40px",
  lineHeight: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: colors.base,
  color: colors.text,
  border: `1px solid ${colors.gray2}`,
  cursor: "pointer",
});

export { Spinner, Button, FullPageSpinner, Dialog, CirleButton };
