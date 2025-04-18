"use client";
import Image from "next/image";
import Aos from "@/components/aos";
import 'aos/dist/aos.css'
import { useEffect, useRef, useState } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useSession } from "@/providers/SessionProvider";
import { UpdateAccountPayload } from "@/BE-library/interfaces";
import PrinterList from "./_view/printerList";
import UploadFile from "./_view/uploadFile";
export default function Print() {
	const {session, status} =useSession()
	const [data, setData] = useState<UpdateAccountPayload>({});
	const [files, setFiles] = useState([]);
	const fileInputRef = useRef(null);
	const [view, setView] = useState<"printer"|"uploadFile">("printer");
	// Helper function to determine the file icon based on file extension
	return (
		<>
		<Aos/>
			<div className="h-screen flex justify-center">
				<div className="relative w-screen px-20 flex items-center h-screen bg-[#0259BC]">
					<Image src="/photos/Vector13.png" alt="Bg" width={9999} height={9999} 
						className="absolute bottom-0 left-0"
					/>
					<Image src="/photos/Vector14.png" alt="Bg" width={9999} height={9999} 
						className="absolute bottom-0 left-0"
					/>		
				</div>
				{view =="printer" && <PrinterList setView={setView}/>}
				{view =="uploadFile" && <UploadFile/>}
			</div>
		</>
		
	);
}
