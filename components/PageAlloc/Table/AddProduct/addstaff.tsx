import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import CustomDropdown from "./dropdown";
import { toast } from "sonner";
import { LocationOperation, PageAllocOperation, PrinterOperation } from "@/BE-library/main";
import { useSession } from "@/providers/SessionProvider";
import Cookies from 'js-cookie';
interface AddStaffProps {
  onClose: () => void;
  reload: any;
}
const AddStaff: React.FC<AddStaffProps> = ({ onClose, reload }) => {
  const openModal = (type) => {
    setType(type);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const [selectedLocation, setselectlocation] = useState<string>("");
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type, setType] = useState();
  // const intl = useIntl();
  
  const [Printer, setPrinter] = useState<any>();
  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  
  const handleClose = () => {
    console.log(location)
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleInputChange = (key: string, value: any) => {
    if (key === "location"){
      setPrinter((prevState) => ({
        ...prevState,
        [key]: {
          id: value.id
        },
      }));
    }
    else setPrinter((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };


  // A function to handle the password input change

  // A function to handle the confirm password input change
  // const handleConfirm = async () => {
  //   const Order = new OrdersOperation();
  //   const condition: UploadingOrderFileCondition = {
  //     file: selectedFile,
  //   };
  //   console.log(condition);
  //   try {
  //     const checkfile = await Order.checkFileFormat(condition);
  //     console.log(checkfile);
  //     if (checkfile.error.error) {
  //       alert(checkfile.error.message);
  //       setSelectedFile(null);
  //       return;
  //     }
  //     if (checkfile.valid === false) {
  //       alert(checkfile.message);
  //       setSelectedFile(null);
  //       return;
  //     }
  //     const response = await Order.createByFile(condition);
  //     console.log(response);
  //     alert(response.message);
  //     setSelectedFile(null);
  //     reload();
  //   } catch (e) {
  //     console.log(e);
  //     alert("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const senddata = async ()=>{
      const action =new PageAllocOperation()
      const cnpm_token = Cookies.get("gid");
      const res= await action.insert(Printer, cnpm_token)
      if (res?.status >= 200 && res?.status <= 299) {
        toast.success("Thêm thành công.")
      }
      else {
        toast.error(res.message)
      }
      handleClose()
      reload();
    }
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
        className={`relative w-[98%] sm:w-9/12 lg:w-1/2 bg-white dark:bg-[#14141a] rounded-xl p-4 overflow-y-auto ${
          isShaking ? "animate-shake" : ""
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">
            Add product
          </div>
          <IoMdClose className=" absolute right-0 w-8 h-8 cursor-pointer
            rounded-full mb-2 text-white hover:bg-gray-400 hover:text-black"
            onClick={handleClose}/>
        </div>
        <form
          method="POST" onSubmit={()=>{console.log("hello")}}
        >
          <div className="h-fit border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white  dark:bg-[#14141a] p-5 rounded-md text-black dark:text-white">
            <div 
              className="w-fit h-fit"
            >
              <div className="flex flex-row gap-3">
                <input required
                  type="string"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                  `}
                  placeholder="Năm"
                  onChange={(e) => handleInputChange("year", e.target.value)}
                />
                <input required
                  type="string"
                  className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder={"Học kì"}
                  onChange={(e) => handleInputChange("semester", e.target.value)}
                />
              </div>

              <div className="flex gap-3 mt-3">
              <input required
                  type="number"
                  className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder="Số lượng"
                  onChange={(e) => handleInputChange("numberOfPages", e.target.value)}
                />
              </div>
              
              <div className="flex gap-3 mt-3"> 
                  <div className="w-full">
                  <span
                    className="text-xs text-gray-400"
                  >
                    {"Ngày cấp"}
                  </span>

                  <input required
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="text-xs md:text-sm border border-gray-600 rounded bg-white dark:bg-[#14141a] h-10 p-2 w-full dark:text-white"
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button
            className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
          bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
            onClick={handleSubmit}
             type="submit"
          >
             Add
          </Button>
         
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddStaff;
