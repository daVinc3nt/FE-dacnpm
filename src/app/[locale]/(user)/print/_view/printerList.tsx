"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "@/providers/SessionProvider";
import CustomLoadingElement from "../../loading";
import { useTranslations } from "next-intl";
import { PaymentOperation, PrinterOperation } from "@/BE-library/main";
import { FaArrowCircleRight } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
function getStatusClass(status) {
	switch (status) {
        case 'active':
          return 'text-green-500';
        case 'inactive':
          return 'text-red-500';
        case 'occupied':
          return 'text-yellow-500'; // Add a color for occupied status
        case 'deleted':
          return 'text-gray-500'; // Add a color for deleted status
        default:
          return ''; // Or a default class if needed
	}
}
interface Props {
    setView: Dispatch<SetStateAction<"printer" | "uploadFile">>;
}
export default function PrinterList({setView}:Props) {
	const {session, status} =useSession()
	const [ListPayment, setListPayment] = useState(null)
	const t =useTranslations("profile")
	const action = new PrinterOperation()
	useEffect(() => {
        const fetchData = async () => {
            // const res = await action.searchStudentByID(session.id, session.sid)
			const res = await action.searchAll(session.sid)
            console.log(res)
			setListPayment(res.data)
        };
		if (session && status == "authenticated")
        	fetchData();
        console.log(status)
    }, [status]);
	return (
		<>		 
            <div className="mt-32 flex flex-col bg-white absolute animate-slide_in_up w-full h-full lg:w-[calc(60%)]
            rounded-3xl  gap-10 items-center py-10
            lg:h-[calc(80%)] overflow-y-scroll shadow-xl">
                {status === "authenticated" && session ? 
                <div className="animate-slide_in_up w-full flex flex-col gap-10">
                    {ListPayment?.map(({
                        brand,
                        description,
                        id,
                        location,
                        name,
                        status,
                        supportContact,
                        type
                    }) => (
                        <div
                        className="flex justify-between bg-white items-center
                        text-lg font-medium w-full px-10 rounded-lg shadow-md"
                        key={id}
                        >
                        <div className="flex lg:flex-row flex-col gap-5 items-center">
                            <Image 
                                src="/photos/Printer.png" 
                                alt="Printer"
                                className="lg:block hidden" 
                                width={200} 
                                height={200} />
                             {/* <Image 
                                src="/photos/Printer.png" 
                                alt="Printer" 
                                className="lg:hidden block"
                                width={100} 
                                height={100} />     */}
                            <div className="flex flex-col items-start">
                                <div className="font-bold text-xl">{id}.{name} - {type} - {brand} - <span className={`${getStatusClass(status)}`}>{status}</span></div>
                                <div className="text-sm text-gray-600">{"Phòng "+location.roomNumber+", tầng "+location.floor+", toà "+location.name+", "+location.campus}</div>
                                <div className="text-sm text-gray-600">{description}</div>
                                <div className="text-sm text-gray-600">Liên hệ: {supportContact}</div>
                            </div>
                        </div>
                        {
                        status == "inactive"? 
                        <IoWarning className="cursor-pointer h-12 w-12 text-gray-500"/>:
                        <FaArrowCircleRight 
                        onClick={()=>{
                            setView("uploadFile")
                            localStorage.setItem("PrinterId", id)}}
                        className="cursor-pointer h-12 w-12 active:scale-110 duration-150 ease-all"/>
                        }
                        </div>
                    ))}
                </div>
                :<CustomLoadingElement/>
                }
            </div>
		</>
	);
}
