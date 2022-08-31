//Core
import Head from "next/head";
import { Box } from "@mui/material";
//React
import { Navbar, Sidebar } from "../ui";
//Commons

interface ILayoutProps {
  title?: string;
  children: JSX.Element | JSX.Element[];
}
export const Layout: React.FC<ILayoutProps> = ({
  title = "OpenJira",
  children,
}) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
