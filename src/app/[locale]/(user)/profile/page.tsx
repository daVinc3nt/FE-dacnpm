"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "@/providers/SessionProvider";
import CustomLoadingElement from "../../loading";
import { useTranslations } from "next-intl";
import { PaymentOperation } from "@/BE-library/main";
import moment from "moment";
import { TabSlider } from "@/components/SliderTab/TabSlider";
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
export default function Profile() {
	const filterData = [
		{ id: 0, name: "Lịch sử giao dịch", value: "PaymentHistory" },
		{ id: 1, name: "Lịch sử in ấn", value: "PrintHistory" },
	  ]
	const [filter, setFilter] = useState<"PaymentHistory" | "PrintHistory">("PaymentHistory");
	const {session, status} =useSession()
	const [ListPayment, setListPayment] = useState<Payment[]>(null)
	const t =useTranslations("profile")
	const action = new PaymentOperation()
	useEffect(() => {
        const fetchData = async () => {
            const res = await action.searchByStudent(session.sid)
			setListPayment(res.data)
        };
		if (status == "authenticated")
        	fetchData();
    }, [status]);
	return (
		<>
			{status === "authenticated" && session ? 
			<div className="px-10 md:px-20 h-screen flex justify-center">
				<div className=" bg-white mt-32 animate-slide_in_up  
				rounded-3xl justify-center w-full  flex flex-col h-[calc(600px)] shadow-xl">
					<div className="flex gap-5 items-center justify-between bg-blue-500 p-20 rounded-tr-3xl rounded-tl-3xl w-full h-52">
						<div className="w-fit gap-5 items-center justify-center flex">
							<div className=" h-fit animate-pop flex flex-col items-center justify-center">
								{!session.image_url && (
									<div className="relative flex w-32 h-32 hover:cursor-pointer rounded-full overflow-hidden transition-all duration-500 cursor-pointer">
									<Image
										width={100}
										height={100}
										className="w-full h-full object-cover"
										alt="avatar"
										src={"/photos/SunGlass.jpg"}
									/>
									</div>
								)}
								{session.image_url && session  && (
									<div className="relative flex w-32 h-32 hover:cursor-pointer rounded-full overflow-hidden transition-all duration-300 cursor-pointer">
									<Image
										alt="avatar"
										src={session.image_url}
										width={100}
										height={100}
										className="w-full h-full object-cover"
									/>
									</div>
								)}
							</div>
							<div className="w-fit">
								{session != null ? 
									<div className="flex text-white flex-col w-fit">
										<div className=" w-full break-all font-extrabold text-3xl">
											{session && session.full_name ? session.full_name: "Không có thông tin!"}
										</div>
										<div className=" w-full break-all">
											{session && session.email ? session.email: "Tài khoản của bạn không sử dụng email!"}
										</div>
									</div> 
									: <>{t("no_user")}</>
								}
							</div>
						</div>
						<div className="w-fit text-white animate-pop">
							Số trang khả dụng:<br/> 
							<span className="text-2xl">
								{session ? session.student_balance +" trang"
								: t("no_info")}
							</span>
						</div>
					</div>
					
					<TabSlider allTabs={filterData} onSelectOption={setFilter} /> 

					<div className="grid grid-cols-6 text-center items-center p-4 text-lg font-bold w-full">
							<div>ID</div>
							<div>Số tờ mua</div>
							<div>Thanh toán</div>
							<div>Trạng thái</div>
							<div>Phương thức</div>
							<div>Vào lúc</div>
					</div>
					<div className="flex flex-col gap-10 overflow-y-scroll hide-scrollbar flex-1">
						{ListPayment?.sort((a, b) => {
							return b.id - a.id;
						}).map(({ id, balance, amount, status, method, transactionDate}) => (
							<div
							className="grid grid-cols-6 text-center items-center p-4 text-lg font-medium w-full rounded-lg shadow-md"
							key={id}
							>
							<div>{id}</div>
							<div>{balance} tờ</div>
							<div>{amount} vnd</div>
							<div className={`${getStatusClass(status)}`}>{status}</div>
							<div>{method}</div>
							<div className="flex flex-col items-center space-y-1">
								<span>{moment(new Date(transactionDate[0], transactionDate[1] - 1, transactionDate[2], transactionDate[3], transactionDate[4], transactionDate[5])).format("DD/MM/YYYY")}</span>
								<span>{moment(new Date(transactionDate[0], transactionDate[1] - 1, transactionDate[2], transactionDate[3], transactionDate[4], transactionDate[5])).format("HH:mm:ss")}</span>
							</div>
							</div>
						))}
					</div>
				</div>
			</div> :
			<div className="h-screen  w-screen">
				<CustomLoadingElement/>
			</div>
			}
		</>
	);
}
