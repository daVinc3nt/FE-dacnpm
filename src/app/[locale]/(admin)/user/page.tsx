import StaffMenu from "@/components/Users/StaffMenu";
import { useSession } from "@/providers/SessionProvider";
import type { NextPage } from "next";

const staff: NextPage = () => {
  return (
    <>
        <StaffMenu /> 
    </>
  );
};

export default staff;
