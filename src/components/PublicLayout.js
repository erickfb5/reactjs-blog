import { Header, Nav, Footer } from "./";

const PublicLayout = ({ children }) => (
  <>
    <Header title="React JS Blog" />
    <Nav />
    {children}
    <Footer />
  </>
);

export default PublicLayout;