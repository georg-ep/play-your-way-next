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
  title,
  body,
  onSubmit,
  showActions = true,
  className='',
}: ModalProps) {
  const { isModalOpen, closeModal } = useUIStore();

  return (
    <NextUIModal
      isOpen={isModalOpen}
      onOpenChange={closeModal}
      isDismissable={true}
      isKeyboardDismissDisabled={true}
      className={className}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>{body}</ModalBody>
          {showActions && (
            <ModalFooter>
              <Button color="danger" variant="light" onPress={closeModal}>
                Close
              </Button>
              <Button color="primary" onPress={onSubmit}>
                Action
              </Button>
            </ModalFooter>
          )}
        </>
      </ModalContent>
    </NextUIModal>
  );
}
