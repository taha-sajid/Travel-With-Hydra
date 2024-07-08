import Header from "../components/Header/header";
import "./styles/globals.css";
import "./styles/fonts.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
