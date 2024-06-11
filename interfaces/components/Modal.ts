export interface ModalProps {
    title?: string;
    body: React.ReactNode;
    onSubmit?: () => void;
    showActions?: boolean;
    className?: string;
    submitText?: string;
  }