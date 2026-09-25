import { Flex } from "@chakra-ui/react";
import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import AdminUploadClient from "./AdminUploadClient";

export const metadata: Metadata = {
  title: "관리자",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <Flex minH="100vh" direction="column">
      <Header />
      <Flex as="main" flex="1">
        <AdminUploadClient />
      </Flex>
      <Footer />
    </Flex>
  );
}
