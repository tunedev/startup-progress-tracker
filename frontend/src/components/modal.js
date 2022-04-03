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

function ModalDismissButton({ children: child }) {
  const { setIsOpen } = useContext(ModalContext);

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({ children: child }) {
  const { isOpen, setIsOpen } = useContext(ModalContext);

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
    "aria-expanded": isOpen,
  });
}

function ModalContentBase(props) {
  const { isOpen, setIsOpen } = useContext(ModalContext);
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  );
}

function ModalContents({ title, children, ...props }) {
  return (
    <ModalContentBase {...props}>
      <div
        css={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}
      >
        <ModalDismissButton>
          <CirleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>x</span>
          </CirleButton>
        </ModalDismissButton>
      </div>
      <h3 css={{ textAlign: "center" }}>{title}</h3>
      {children}
    </ModalContentBase>
  );
}

export { Modal, ModalContents, ModalOpenButton, ModalDismissButton };
