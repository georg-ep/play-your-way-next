"use client";
import React, { useEffect } from "react";
import {
  Modal as NextUIModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import { ModalProps } from "@/interfaces/components/Modal";
import { useUIStore } from "@/stores/ui";

export default function Modal({
  title = "",
  body,
  onSubmit = () => null,
  showActions = true,
  submitText = "Submit",
  className = "",
}: ModalProps) {
  const { isModalOpen, closeModal } = useUIStore();

  return (
    <NextUIModal
      isOpen={isModalOpen}
      onOpenChange={closeModal}
      isKeyboardDismissDisabled={false}
      isDismissable={false}
      className={className}
      placement={"top-center"}
      scrollBehavior="normal"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>{body}</ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={closeModal}>
              Close
            </Button>
            {showActions && (
              <Button color="primary" onPress={onSubmit}>
                {submitText}
              </Button>
            )}
          </ModalFooter>
        </>
      </ModalContent>
    </NextUIModal>
  );
}
