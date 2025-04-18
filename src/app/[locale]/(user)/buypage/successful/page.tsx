"use client";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";


export default function Home({params}) {
	const router = useRouter()
	const [isAnimated, setIsAnimated] = useState(false);
	const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player), {
        ssr: false,
      });
	useEffect(() => {
	setIsAnimated(true);
	}, [])
	return (

			<div className="relative overflow-x-hidden py-32">
				{isAnimated && 
				<Player
                    src='/animation/confetti.json'
                    autoplay
                    className="absolute z-50 mr-auto ml-auto right-0 left-0"
                    style={{ height: '500px', width: '1000px' }}
                    rendererSettings={{
                        preserveAspectRatio: "xMidYMid slice",
                    }}
                    data-aos="fade-left"
                />}
				<div className="w-full pb-10 md:pb-20 flex flex-col gap-10 h-fit justify-center items-center md:px-20">
					<div className=" h-full w-full shadow-md bg-white py-20  
					rounded-tr-3xl rounded-tl-3xl relative
					 flex flex-col justify-start items-center gap-8">
						<div className="w-full flex flex-col justify-center items-center gap-5">
						
						</div>
						<button 
						onClick={()=>{router.push(`/buypage`)}}
						className="absolute z-[51] -bottom-5 rounded-md bg-do_bg px-5 py-2.5 
						text-white transition-all duration-300 active:-translate-y-1 active:scale-x-90
						active:scale-y-110 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] ">
							Quay lại trang mua
						</button>
					</div>
				</div>
			</div>
		
	);
}
