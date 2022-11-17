// import '../global.css';
import Navbar from "../components/Navbar";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <nav>
          <Navbar />
          <a href="#">Home</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
