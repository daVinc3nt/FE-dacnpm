"use client"

import { FileOperation } from "@/BE-library/main";
import { useSession } from "@/providers/SessionProvider";
import { useEffect } from "react";
const docs = [
    // {uri: require("@/assets/test_docs/GAIN.pdf")},
    // {uri: require("@/assets/test_docs/ascii-art.txt")},
    // {uri: require("@/assets/test_docs/Phú Lâm.csv")}
  ];
export default  function FilePreview({ docs }){
    const {session, status} = useSession();
    const action = new FileOperation();
    useEffect(() => {
        const fetchData = async () => {
            const res = await action.searchAllUserFiles(session.sid);
            console.log(res)
        }
		if (status == "authenticated")
        	fetchData();
        console.log(status)
    }, [status]);
    return (
        <div className="relative rounded-xl w-full h-full flex items-center bg-[#373839]">
            <iframe src={docs} className="h-full w-full rounded-xl" allow="autoplay"></iframe>
        </div>
    );
}