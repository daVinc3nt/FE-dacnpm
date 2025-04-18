import { PrintJobPayload } from "@/BE-library/interfaces";
import { PrintJobOperation } from "@/BE-library/main";
import { useSession } from "@/providers/SessionProvider";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GoAlertFill } from "react-icons/go";
import { toast } from "sonner";
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
function ConfigArea({ num_pages, set_pages_state}) {
  const {session, status} =useSession()
  const [validation, setValidation] = useState(true);
  const [alertContent, setContent] = useState("");
  const [customEntries, setCustomEntries] = useState({
    number_pages: "hidden",
    pages_per_sheet: "hidden",
    scale: "hidden",
  });

  const pagePattern =
    /^([1-9]\d*|[1-9]\d*-[1-9]\d*)(,([1-9]\d*|[1-9]\d*-[1-9]\d*))*$/;

  const validateInput = (input) => {
    let sanitizedValue = input.value.replace(/[^0-9]/g, "");
    sanitizedValue = sanitizedValue.replace(/^0+/, "");
    input.value = sanitizedValue;
    input.setSelectionRange(sanitizedValue.length, sanitizedValue.length);
  };

  const isValidPageFormat = (value) => {
    if (pagePattern.test(value)) {
      setValidation(true);
      set_pages_state(true);
      const pageSpecs = value.split(",");

      for (let pageSpec of pageSpecs) {
        if (pageSpec.includes("-")) {
          const [start, end] = pageSpec.split("-").map(Number);
          if (start > end) {
            setContent(
              "Trang bắt đầu phải không vượt quá trang kết thúc: " + pageSpec
            );
            setValidation(false);
            set_pages_state(false);
            break;
          }
          if (start > num_pages || end > num_pages) {
            setContent("Bạn đã nhập trang vượt quá số trang của tài liệu!");
            setValidation(false);
            set_pages_state(false);
            break;
          }
        } else {
          if (pageSpec > num_pages) {
            setContent("Bạn đã nhập trang vượt quá số trang của tài liệu!");
            setValidation(false);
            set_pages_state(false);
            break;
          }
        }
      }
    } else {
      setContent("Vui lòng nhập đúng định dạng!");
      setValidation(false);
      set_pages_state(false);
    }
  };

  const customSelection = (id) => {
    let selectTag = document.getElementById(id) as HTMLInputElement;
    // const idHeader = id.slice(0, -7);

    if (selectTag.value !== "custom") {
      setCustomEntries({ ...customEntries, [id]: "hidden" });
    } else {
      setCustomEntries({ ...customEntries, [id]: "block" });
    }
  };
  const handleSubmission = async () => {
    // Handle form submission
    const action = new PrintJobOperation()
    const configData: PrintJobPayload = {
        file_id: parseInt(localStorage.getItem("fileId")),
        printer_id: parseInt(localStorage.getItem("PrinterId")),
        color_mode: (document.getElementById('page_color') as HTMLSelectElement).value == "1",
        page_size: (document.getElementById('page_size') as HTMLSelectElement).value,
        page_side: (document.getElementById('is_duplex') as HTMLSelectElement).value,
        page_number: (document.getElementById('pages-entry') as HTMLInputElement).value,
        number_of_copies: parseInt((document.getElementById('numberOfCopies') as HTMLInputElement).value),
        is_duplex: (document.getElementById('is_duplex') as HTMLSelectElement).value == "1"
    };
    if (status === "authenticated")
    {    toast.promise(
            action.create(configData, session.sid),{
            loading: 'Đang xử lý giao dịch...',
            success: (data) => {
                if (data.status !== 200)
                    throw new Error(data.message)
                return data.message;
            },
            error: (err)=>{return err.message}
        })}
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-2 w-full p-10">
        <div className="font-bold text-lg">Thiết lập cấu hình in</div>

        <div className="flex items-center gap-2">
          <div className="w-1/3">Số trang</div>
          <select
            className="w-2/3 border rounded p-2 text-gray-500"
            id="number_pages"
            onChange={() => customSelection("number_pages")}
          >
            <option value="All">Toàn bộ</option>
            <option value="Odd">In trang lẻ</option>
            <option value="Even">In trang chẵn</option>
            <option value="custom">Tùy chỉnh</option>
          </select>
        </div>
        
        <div className={`flex items-center gap-2 ${customEntries["number_pages"]}`}>
          <div className="w-1/3"></div>
          <input
            type="text"
            className="w-2/3 border rounded p-2 text-gray-500"
            id="pages-entry"
            placeholder="VD. 1,2,3,4,..."
            onBlur={(event) => isValidPageFormat(event.target.value)}
          />
        </div>

        <div className={`flex items-center gap-2 ${validation ? "hidden" : ""}`}>
          <div className="w-1/3"></div>
          <div className="w-2/3 bg-red-100 text-red-600 p-2 rounded flex items-center">
            <GoAlertFill className="mr-2" />
            {alertContent}
          </div>
        </div>

        <div className="flex items-center gap-2">
            <div className="w-1/3">Mặt in</div>
            <select
                className="w-2/3 border rounded p-2 text-gray-500"
                id="is_duplex"
            >
                <option value={"one sided"}>Một mặt</option>
                <option value={"double sided"}>Hai mặt</option>
            </select>
        </div>

        <div className="flex items-center gap-2">
            <div className="w-1/3">Khổ giấy</div>
            <select
                className="w-2/3 border rounded p-2 text-gray-500"
                id="page_size"
            >
                <option value="A4">A4</option>
                <option value="A3">A3</option>
            </select>
        </div>

        <div className="flex items-center gap-2">
            <div className="w-1/3">In màu</div>
            <select
                className="w-2/3 border rounded p-2 text-gray-500"
                id="page_color"
            >
                <option value={1}>Có</option>
                <option value={0}>Không</option>
            </select>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-1/3">Số bản in</div>
            <input
                type="number"
                className="w-2/3 border rounded p-2 text-gray-500"
                id="numberOfCopies"
            />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded active:scale-95 duration-150 ease-in-out"
          onClick={handleSubmission}
        >
          Xác nhận
        </button>
        <Link href="/print" className="w-full bg-red-500 text-white p-2 rounded text-center active:scale-95 duration-150 ease-in-out">
          Quay lại
        </Link>
      </div>
    </>
  );
}

export default ConfigArea;
