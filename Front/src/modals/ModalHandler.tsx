import ConfirmModal from "@/modals/confirm/ConfirmModal";
import ContextMenuModal from "@/modals/context/ContextMenuModal";
import ToastModal from "@/modals/toast/ToastModal";
import NiceModal from "@ebay/nice-modal-react";
import InputModal from "./input/InputModal";
import ListModal from "./list/ListModal";

function ModalHandler() {
  NiceModal.register("toast", ToastModal);
  NiceModal.register("confirm", ConfirmModal);
  NiceModal.register("list", ListModal);
  NiceModal.register("contextMenu", ContextMenuModal);
  NiceModal.register("input", InputModal);
  // main
  // admin
  return <></>;
}

export default ModalHandler;
