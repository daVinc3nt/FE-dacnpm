import "../../globals.css";
import { ReactNode } from "react";
import Wrapper from "@/components/LayoutWrapper";

type Props = {
	children: ReactNode;
  };

export default async function RootLayout({
	children
  }: Props) {
	return (
        <section className="no-scrollbar hide-scrollbar">
            <Wrapper>
            {children}
            </Wrapper>
        </section>
	);
}