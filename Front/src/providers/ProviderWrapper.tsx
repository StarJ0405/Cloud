import AuthProvider from "./AuthPorivder/AuthPorivder";
import BrowserEventProvider from "./BrowserEventProvider/BrowserEventProvider";
import ModalProvider from "./ModalProvider/ModalProvider";
import ProviderWrapperClient from "./ProviderWrapperClient";
import StoreProvider from "./StoreProvider/StorePorivder";
export default async function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProviderWrapperClient>
      <BrowserEventProvider>
        <StoreProvider>
          <AuthProvider>
            <ModalProvider>
              {/*  */}
              {children}
              {/*  */}
            </ModalProvider>
          </AuthProvider>
        </StoreProvider>
      </BrowserEventProvider>
    </ProviderWrapperClient>
  );
}
