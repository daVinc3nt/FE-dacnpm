"use client";
import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaPen } from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { TabSlider } from "@/components/SliderTab/TabSlider";
import CustomDropdown from "./AddProduct/dropdown";

interface DetailStaffProps {
  onClose: () => void;
  dataInitial: any;
  reload: any;
}

interface Location {
  id: number;
  name: string;
  campus: string;
  floor: number;
  roomNumber: number;
}

const DetailStaff: React.FC<DetailStaffProps> = ({ onClose, dataInitial, reload }) => {
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState<any>(dataInitial);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Location | null>(null);
  const [filter, setFilter] = useState<"details" | "students">("details");
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectFileFormat = (format: Location) => {
    setSelectedLocations(format);
    console.log("Selected file format:", format);
  };

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

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const traverse = (obj: any, isEditing: boolean) => {
    return obj
      ? Object.keys(obj).map((key) => {
          const value = obj[key] ?? "No info";
          return (
            <div
              key={key}
              className="bg-gray-100 p-3 rounded-xl shadow-inner dark:text-black h-2/6 w-32"
            >
              <div className="font-bold text-base text-black dark:text-black">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </div>
              {isEditing ? (
                <input
                  className="text-gray-500 w-fit inline-block break-all dark:text-black border-b-2"
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setData({ ...data, [key]: e.target.value })
                  }
                  disabled={key === "id"}
                />
              ) : (
                <div className="text-gray-500 w-fit inline-block break-all dark:text-black">
                  {value}
                </div>
              )}
            </div>
          );
        })
      : null;
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-[#545e7b]"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-4/6 bg-white dark:bg-[#14141a] h-3/6 rounded-xl p-2
            ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-black dark:text-white w-full text-center">
            Thông tin chi tiết
          </div>

          <IoMdClose
            className="absolute right-0 w-8 h-8 cursor-pointer rounded-full mb-2 text-black dark:text-white hover:bg-gray-400 hover:text-black"
            onClick={handleClose}
          />
        </div>
        <div
          className="w-full h-5/6 border border-[#545e7b] mt-4 no-scrollbar justify-center flex flex-wrap gap-5 bg-gray-100 dark:bg-[#14141a] p-5 rounded-md dark:text-white text-black"
        >
          {filter === "details" && traverse(data, isEditing)}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailStaff;
