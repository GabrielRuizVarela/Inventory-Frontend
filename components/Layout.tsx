import Head from "next/head";
import { Suspense } from "react";
import SearchBar2 from "./SearchBar2";
import Sidebar2 from "./SideBar2";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <style jsx={true} global={true}>{`
        html,
        body {
          font-family: Roboto, sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </>
  );
}
