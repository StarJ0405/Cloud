"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const BrowserDetectContext = createContext<{
  deviceType: DeviceType;
  OS: OSType;
  webView: boolean;
  isMobile: boolean;
  isDeskTop: boolean;
  isTablet: boolean;
  domain: string;
  subdomain: string;
}>({
  deviceType: "" as DeviceType,
  OS: "" as OSType,
  webView: false,
  isMobile: false,
  isDeskTop: false,
  isTablet: false,
  domain: "",
  subdomain: "",
});

const MOBILE_MAX_WIDTH = 768;
const TABLET_MAX_WIDTH = 1024;

export default function BrowserEventProviderClient({
  children,
  initDeviceType,
  initOS,
  initWebView,
  subdomain
}: {
  children: React.ReactNode;
  initDeviceType: DeviceType;
  initOS: OSType;
  initWebView: boolean;
  subdomain: string;
}) {
  const [deviceType] = useState(initDeviceType);
  const [OS] = useState(initOS);
  const [webView] = useState(initWebView);
  const [domain, setDomain] = useState('');
  useEffect(() => {
    setDomain((window?.location?.origin || "").replace(`${subdomain}.`, ''))
  }, [])
  return (
    <BrowserDetectContext.Provider
      value={{
        deviceType,
        OS,
        webView,
        isMobile: deviceType === "mobile",
        isDeskTop: deviceType === "desktop",
        isTablet: deviceType === "tablet",
        domain,
        subdomain,
      }}
    >
      {children}
    </BrowserDetectContext.Provider>
  );
}

export const useBrowserEvent = () => useContext(BrowserDetectContext);
