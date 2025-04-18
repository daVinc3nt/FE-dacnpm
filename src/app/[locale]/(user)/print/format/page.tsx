"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ConfigArea from "@/components/Print_config/ConfigArea";
import FilePreview from "@/components/Print_config/FilePreview";
import { FileOperation } from "@/BE-library/main";
import { useSession } from "@/providers/SessionProvider";

interface printJob {
  file_id: number;
  printer_id: number;
  page_number: string;
  page_size: string;
  number_of_copies: number;
  color_mode: boolean;
  page_side: string;
  is_duplex: boolean;
}
const docs = [
  // {uri: require("../assets/test_docs/GAIN.pdf")},
  // {uri: require("../assets/test_docs/ascii-art.txt")},
  // {uri: require("../assets/test_docs/Phú Lâm.csv")}
];

function PrintConfig() {
  const [printJobFormat, setPrintJobFormat] = useState<printJob>();
  const no_pages_of_files = 100; // Use for simulation
  const [pagesState, setPagesState] = useState(true);
  const [doc, setDoc] = useState("");
  const {session, status} = useSession();
  const action = new FileOperation();
  useEffect(() => {
    const fetchData = async () => {
        const res = await action.searchFilesById(localStorage.getItem("fileId"), session.sid);
        console.log(res)
        setDoc(res.data.url)
    }
  if (status == "authenticated")
        fetchData();
      console.log(status)
  }, [status]);
  return (
    <>
      <div
        className="w-screen h-fit shadow-lg overflow-hidden pt-20 overflow-y-scroll"
      >
        <div className="lg:flex-row flex flex-col items-center w-full h-fit lg:px-20 px-5 py-10">
            <div id="document-preview"  className="lg:w-1/2 w-full h-screen">
                <FilePreview docs={doc} />
            </div>
            <div className="lg:w-1/2 w-full h-fit">
                <ConfigArea
                    num_pages={no_pages_of_files}
                    set_pages_state={setPagesState}
                />
            </div>
        </div>
      </div>
      {/* <ConfigModal
          user_id={user.customer_id}
          user_balance={user.balance}
          file_name={state ? state.name : ""}
          file_num_pages={no_pages_of_files}
          file_config={config}
          state={modalState}
          submit_state={configSubmitState}
          support_function={handleHideModal}
        /> */}
    </>
  );
}

export default PrintConfig;
