import AdminAuthProvider from "@/providers/AdminAuthPorivder/AdminAuthPorivder";
import AuthProvider from "@/providers/AuthPorivder/AuthPorivder";
import ModalProvider from "@/providers/ModalProvider/ModalProvider";

export default async function ({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <ModalProvider>
        {/*  */}
        {children}
        {/*  */}
      </ModalProvider>
    </AdminAuthProvider>
  );
}