"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { PaySlipService } from "@/api/PaySlipService";
import { PaySlip } from "@/api/models/PaySlip";
import logo from "../assets/images/deel-logo-blue.svg";

import RiseLoader from "../../node_modules/react-spinners/RiseLoader";

export default function Home() {
  const payslipService = new PaySlipService();

  const router = useRouter();

  const [payslipsList, setPayslipsList] = useState<PaySlip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Using set time out to mock http requests
    setTimeout(() => {
      setPayslipsList(payslipService.getAllPaySlips());
      setIsLoading(false);
      console.log(payslipsList);
    }, 2000);
  }, [payslipsList]);

  function renderList() {
    return payslipsList.map((payslip: PaySlip) => (
      <>
        <a
          onClick={() => router.push("/payslip-details" + "?id=" + payslip.id)}
          // href="/payslip-details"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_self"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            {payslip.period}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {payslip.from_date + " - " + payslip.to_date}
          </p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {"Total gross amount: " + payslip.gross_amount + "$"}
          </p>
        </a>
      </>
    ));
  }

  return (
    <>
      {isLoading ? (
        <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
          <RiseLoader />
        </div>
      ) : (
        <main className="md:flex p-8 pt-14 min-h-screen flex-col items-center justify-between md:p-24 bg-white">
          <div className="z-10 md:px-5 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src={logo}
              alt="Deel Logo"
              width={72}
              priority
            />
          </div>

          <div className="mb-32 mt-16 md:flex flex-col md:text-center lg:max-w-5xl lg:w-full lg:mb-0  lg:text-left">
            <p className={`mb-3 text-2xl font-semibold text-blue-900`}>
              Available payslips
            </p>
            {renderList()}
          </div>
        </main>
      )}
    </>
  );
}
