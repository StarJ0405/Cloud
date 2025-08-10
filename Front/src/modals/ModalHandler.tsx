import ConfirmModal from "@/modals/confirm/ConfirmModal";
import ContextMenuModal from "@/modals/context/ContextMenuModal";
import ToastModal from "@/modals/toast/ToastModal";
import NiceModal from "@ebay/nice-modal-react";
import UserModal from "./admin/user/UserModal";
import InputModal from "./input/InputModal";
import ListModal from "./list/ListModal";

function ModalHandler() {
  NiceModal.register("toast", ToastModal);
  NiceModal.register("confirm", ConfirmModal);
  NiceModal.register("list", ListModal);
  NiceModal.register("contextMenu", ContextMenuModal);
  NiceModal.register("input", InputModal);
  // admin
  NiceModal.register("userDetail", UserModal);
  return <></>;
}

export default ModalHandler;
