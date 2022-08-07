import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // SSR : server side rendering
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <Navbar />
      <div className='flex gap-6 md:gap-20'>
        <div className='h-[92vh] overflow-hidden xl:overflow-auto'>
          <Sidebar />
        </div>
        <div className='mt-4 flex flex-col bg-[#464099] gap-10 overflow-auto h-[88vh] videos flex-1'>
          <Component {...pageProps} />;
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
