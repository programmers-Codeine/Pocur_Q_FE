export interface ModalProps {
  open: boolean;
  onClose?: () => void;
}

export interface WarnModalProps extends ModalProps {
  autoClose?: number;
}
