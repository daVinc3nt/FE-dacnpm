"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import { LocationOperation } from "@/BE-library/main";
import { useSession } from "@/providers/SessionProvider";
import Cookies from 'js-cookie';
interface AddStaffProps {
  onClose: () => void;
  reload: any;
}

const AddStaff: React.FC<AddStaffProps> = ({ onClose, reload }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const [fileData, setFileData] = useState({
    name: "",
    campus: "",
    floor: 0,
    roomNumber: 0,
  });

  const [error, setError] = useState<string>(""); // Lưu trữ lỗi nếu có

  // Hàm đóng cửa sổ modal
  const handleClose = () => {
    setIsVisible(false);
  };

  // Hàm hoàn thành hoạt động animation
  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  // Hàm xử lý thay đổi input
  const handleInputChange = (key: string, value: any) => {
    setFileData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Hàm gửi dữ liệu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra xem tên file có hợp lệ không
    const { name, campus, floor, roomNumber } = fileData;

    // Kiểm tra các trường dữ liệu
    if (!name || !campus || floor === 0 || roomNumber === 0) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Thực hiện gửi dữ liệu
    const senddata = async () => {
      const action = new LocationOperation();
      const cnpm_token = Cookies.get("gid");
      try {
        const res = await action.create(fileData, cnpm_token);
        if (res.status === 201) {
          toast.success("Thêm địa điểm máy in thành công");
          handleClose();
          reload();
        } else if (res.status === 500) {
          toast.warning("Địa điểm máy in đã tồn tại. Vui lòng thử lại địa điểm khác.");
          handleClose();
          reload();
        } else {
          toast.error("Thêm địa điểm không thành công. Vui lòng thử lại.");
          handleClose();
          reload();
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
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
        className={`relative w-[98%] sm:w-9/12 lg:w-2/5 bg-white dark:bg-[#14141a] rounded-xl p-4 overflow-y-auto ${isShaking ? "animate-shake" : ""
          }`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">
            Thêm địa điểm máy in
          </div>
          <IoMdClose
            className="absolute right-0 w-8 h-8 cursor-pointer rounded-full mb-2 text-white hover:bg-gray-400 hover:text-black"
            onClick={handleClose}
          />
        </div>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="h-fit border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white dark:bg-[#14141a] p-5 rounded-md text-black dark:text-white">
            <div
              className="w-fit h-fit"
            >
              <div className="flex flex-col gap-3">
                <input
                  required
                  type="text"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                  `}
                  placeholder="Nhập tên tòa"
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <input
                  required
                  type="text"
                  className="text-xs md:text-sm border border-gray-600 rounded bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder="Nhập cơ sở: cs1, cs2,..."
                  onChange={(e) => handleInputChange("campus", e.target.value)}
                />
                <input
                  required
                  type="number"
                  className="text-xs md:text-sm border border-gray-600 rounded bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder="Nhập số tầng"
                  onChange={(e) => handleInputChange("floor", parseInt(e.target.value))}
                />
                <input
                  required
                  type="number"
                  className="text-xs md:text-sm border border-gray-600 rounded bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder="Nhập số phòng"
                  onChange={(e) => handleInputChange("roomNumber", parseInt(e.target.value))}
                />
              </div>
            </div>
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
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
