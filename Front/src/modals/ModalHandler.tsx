import ConfirmModal from "@/modals/confirm/ConfirmModal";
import ContextMenuModal from "@/modals/context/ContextMenuModal";
import ToastModal from "@/modals/toast/ToastModal";
import NiceModal from "@ebay/nice-modal-react";
import BrandModal from "./admin/brand/BrandModal";
import CategoriesModal from "./admin/category/CategoriesModal";
import CategoryList from "./admin/category/CategoryListModal";
import CategoryModal from "./admin/category/CategoryModal";
import StoreModal from "./admin/store/StoreModal";
import ListModal from "./list/ListModal";

function ModalHandler() {
  NiceModal.register("toast", ToastModal);
  NiceModal.register("confirm", ConfirmModal);
  NiceModal.register("list", ListModal);
  NiceModal.register("contextMenu", ContextMenuModal);
  // admin
  NiceModal.register("storeDetail", StoreModal);
  NiceModal.register("brandDetail", BrandModal);
  NiceModal.register("categoryList", CategoryList);
  NiceModal.register("categories", CategoriesModal);
  NiceModal.register("categoryDetail", CategoryModal);
  return <></>;
}

export default ModalHandler;
