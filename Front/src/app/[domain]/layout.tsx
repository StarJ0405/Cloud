import AuthProvider from "@/providers/AuthPorivder/AuthPorivder";
import ModalProvider from "@/providers/ModalProvider/ModalProvider";

export default async function ({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ModalProvider>
        {/*  */}
        {children}
        {/*  */}
      </ModalProvider>
    </AuthProvider>
  );
}
