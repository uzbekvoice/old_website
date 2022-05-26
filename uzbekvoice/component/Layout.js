import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Home.module.css";

function Layout({ children }) {
  return (
    <>
      <div className="container__fluid">
        <Header />
        {children}

      
      </div>
      <Footer />
    </>
  );
}

export default Layout;
