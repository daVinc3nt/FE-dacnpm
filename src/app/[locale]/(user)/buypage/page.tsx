"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "@/providers/SessionProvider";
import CustomLoadingElement from "../../loading";
import { useTranslations } from "next-intl";
import { PaymentOperation } from "@/BE-library/main";
import moment from "moment";
import Aos from "@/components/aos";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface Payment {
	id: number,
	balance: number,
	amount: number,
	status: string,
	method: string,
	transactionDate: Date
}
function getStatusClass(status) {
	switch (status) {
	  case 'in progress':
		return 'text-yellow-500';
	  case 'successful':
		return 'text-green-500';
	  case 'failed':
		return 'text-red-500';
	  default:
		return ''; // Hoặc một lớp mặc định nếu cần
	}
}
export default function BuyPage() {
	const {session, status} =useSession()
    const [a4Count, seta4Count] = useState<number>(0)
	const [a3Count, seta3Count] = useState<number>(0)
	const t =useTranslations("profile")
    const router = useRouter()
	const action = new PaymentOperation()
    const handlePurchase = async () => {
        const total = (a4Count || 0) * 500 + (a3Count || 0) * 1000
        // const res = await action.searchStudentByID(session.id, session.sid)
        if (total < 1000 ) {
            toast.warning("Số lượng không hợp lệ hoặc nhỏ hơn yêu cầu!")
        }
        if (confirm(`Xác nhận thanh toán ${total} vnđ`) == true) {
            toast.promise(action.create(a4Count,a3Count, session.sid),{
                loading: 'Đang xử lý giao dịch...',
                success: (data) => {
                    // console.log(data)
                    router.push(data.data.payUrl)
                    return `Chuyển hướng đến Momo`;
                },
                error: 'Lỗi giao dịch',
            })
          } else {
            return;
          }
    };
	return (
        <>
        <Aos/>
        <section className="h-screen w-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] 
                bg-[size:14px_32px]">
            <div className="pt-24 flex flex-col gap-5 h-full items-center justify-center w-full">
                <div className="text-center h-fit rounded-full bg-blue-600 px-5 lg:px-10 py-2">
                    <h2 className="lg:text-4xl text-xl font-extrabold text-white">
                        Tài khoản đang có tổng: {session && session.student_balance} trang
                    </h2>      
                </div>
                <div className="text-left h-12">
                    <h2 className="text-lg font-medium text-black ">
                        Lưu ý: Giá trị giao dịch phải đạt hơn 1.000 vnd nhé!
                    </h2>      
                </div>
                <div className="flex animate-slide_in_up lg:gap-24 gap-10 h-[calc(60%)] w-full items-center justify-center">
                    <div className="flex h-full hover:cursor-pointer flex-col p-6 w-1/3 text-center text-white 
                    bg-blue-500 rounded-lg border border-gray-100 shadow  xl:p-8">
                        <h3 className="mb-4 text-2xl font-semibold">Giấy A4</h3>
                        <p className="font-light sm:text-lg ">Double A là nhãn hiệu giấy in photo cao cấp</p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 lg:text-5xl text-2xl font-extrabold">500 vnđ</span>
                            <span className="text-white ">/tờ</span>
                        </div>
                        <ul role="list" className="h-1/3 lg:block hidden space-y-4 text-left">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Giấy nhãn hiệu Double A</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Giấy in photo phổ biến</span>
                            </li>
                        </ul>
                        <input
                            value={a4Count? a4Count: ""}
                            onChange={(e)=>{seta4Count(e.target.valueAsNumber)}}
                            type="number" 
                            placeholder = "Nhập số lượng muốn mua"
                            className = "rounded-lg h-12 text-black px-2"/>
                    </div>
                    <div className="flex h-full hover:cursor-pointer flex-col p-6 w-1/3 text-center text-white 
                    bg-blue-500 rounded-lg border border-gray-100 shadow  xl:p-8  ">
                        <h3 className="mb-4 text-2xl font-semibold">Giấy A3</h3>
                        <p className="font-light text-white sm:text-lg "> Ưu điểm của loại giấy Paper One A3 ĐL</p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 lg:text-5xl text-2xl font-extrabold">1.000 vnđ</span>
                            <span className="text-white ">/tờ</span>
                        </div>
                        <ul role="list" className="h-1/3 lg:block hidden space-y-4 text-left">
                            <li className="flex items-center space-x-3">

                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Kích thước: 297x420 mm</span>
                            </li>
                            <li className="flex items-center space-x-3">

                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Chất liệu: bột cây keo Acacia</span>
                            </li>
                            <li className="flex items-center space-x-3">

                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>Xuất xứ: Indonesia</span> 
                            </li>
                        </ul>
                        <input
                        value={a3Count? a3Count: ""}
                        onChange={(e)=>{seta3Count(e.target.valueAsNumber)}}
                        type="number" 
                        placeholder = "Nhập số lượng muốn mua"
                        className = "rounded-lg h-12 text-black px-2"/>
                    </div>
                </div> 
                {(a4Count > 0 || a3Count > 0)  &&
                <button 
                onClick={handlePurchase}
                className="active:scale-110 duration-150 ease-all rounded-full py-2 px-5 text-lg text-white bg-green-500 tracking-tight w-fit">
                    Thanh toán {((a4Count || 0) * 500 + (a3Count || 0) * 1000).toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} vnđ
                </button>}     
            </div> 
        </section>
        </>
       );
}

