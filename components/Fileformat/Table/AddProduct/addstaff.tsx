import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import { FileFormatOperation } from "@/BE-library/main";
import { useSession } from "@/providers/SessionProvider";

interface AddStaffProps {
  onClose: () => void;
  reload: any;
}

const ALLOWED_FORMATS = ["pdf", "doc", "docx", "jpg", "jpeg", "png", "xlsx", "pptx"];  // Định dạng tệp hợp lệ
import Cookies from 'js-cookie';
const AddStaff: React.FC<AddStaffProps> = ({ onClose, reload }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [formatFile, setFormatFile] = useState<any>({});
  const [error, setError] = useState<string>("");  // Lưu trữ lỗi nếu có

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setFormatFile((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lấy tên tệp và kiểm tra định dạng
    const fileName = formatFile?.name || "";
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    if (!fileExtension || !ALLOWED_FORMATS.includes(fileExtension)) {
      // Nếu định dạng không hợp lệ, sử dụng toast.error để thông báo lỗi
      toast.error(`Định dạng "${fileExtension}" không được hỗ trợ.`);
      return;
    }

    // Xử lý gửi dữ liệu
    const senddata = async () => {
      const action = new FileFormatOperation();
      const cnpm_token = Cookies.get("gid");
      const res = await action.create(formatFile, cnpm_token);
      if (res.status === 200) {
        toast.success("Thêm định dạng tệp thành công");
        handleClose();
        reload();
      } 
      else if(res.status === 401){
        toast.warning("Định dạng tệp đã tồn tại. Vui lòng thử lại định dạng khác.");
        handleClose();
        reload();
      } else {
        toast.error("Thêm định dạng không thành công. Vui lòng thử lại.");
        handleClose();
        reload();
      }
    };

    senddata();
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 lg:w-1/2 bg-white dark:bg-[#14141a] rounded-xl p-4 overflow-y-auto ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">
            Thêm định dạng tệp
          </div>
          <IoMdClose 
            className="absolute right-0 w-8 h-8 cursor-pointer rounded-full mb-2 text-white hover:bg-gray-400 hover:text-black"
            onClick={handleClose}
          />
        </div>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="h-fit border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white dark:bg-[#14141a] p-5 rounded-md text-black dark:text-white">
            <div className="flex flex-col gap-3">
              <input 
                required
                type="string"
                className={`text-xs md:text-sm border border-gray-600 rounded bg-white dark:bg-[#14141a] h-10 p-2 w-full`}
                placeholder="Nhập tên định dạng"
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Định dạng được hỗ trợ: {ALLOWED_FORMATS.join(", ")}
            </p>
          </div>
          <Button
            className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500 bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
            onClick={handleSubmit}
            type="submit"
          >
            Thêm
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddStaff;
