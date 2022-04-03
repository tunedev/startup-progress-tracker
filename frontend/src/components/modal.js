/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { createContext, useContext, useState, cloneElement } from "react";
import VisuallyHidden from "@reach/visually-hidden";
import { Dialog, CirleButton } from "./lib";

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn && fn(...args));

const ModalContext = createContext();

function Modal(props) {
  const [isOpen, setIsOpen] = useState(props.isOpen || false);
  return <ModalContext.Provider value={{ isOpen, setIsOpen }} {...props} />;
}

function useModalCtx() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalCtx must be used within a ModalContext Provider");
  }
  return context;
}

function ModalDismissButton({ children: child }) {
  const { setIsOpen } = useModalCtx();

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({ children: child }) {
  const { isOpen, setIsOpen } = useModalCtx();

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
    "aria-expanded": isOpen,
  });
}

function ModalContentBase(props) {
  const { isOpen, setIsOpen } = useModalCtx();
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  );
}

function ModalContents({ title, children, ...props }) {
  return (
    <ModalContentBase {...props}>
      <div
        css={{ display: "flex", justifyContent: "flex-end", padding: "5px" }}
      >
        <ModalDismissButton>
          <CirleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>x</span>
          </CirleButton>
        </ModalDismissButton>
      </div>
      <h2 css={{ textAlign: "center", marginBottom: "10px" }}>{title}</h2>
      {children}
    </ModalContentBase>
  );
}

export {
  Modal,
  ModalContents,
  ModalOpenButton,
  ModalDismissButton,
  useModalCtx,
};
