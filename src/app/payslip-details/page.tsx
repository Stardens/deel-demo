// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
"use client";
import { useEffect, useState } from "react";

import { PaySlipService } from "@/api/PaySlipService";
import { PaySlip } from "@/api/models/PaySlip";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

import RiseLoader from "../../../node_modules/react-spinners/RiseLoader";
import arrowBack from "../../assets/images/arrow-back.svg";

import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Http, HttpDownloadFileResult } from "@capacitor-community/http";
import { FileOpener } from "../../../node_modules/@capacitor-community/file-opener/dist/esm/index";

Chart.register(ArcElement);

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const payslipID = searchParams.get("id");

  const payslipService = new PaySlipService();

  const [isLoading, setIsLoading] = useState(true);

  const [payslip, setPayslip] = useState<PaySlip>();

  const data = {
    labels: ["Earnings", "Deductions"],
    datasets: [
      {
        data: [
          payslip?.net_amount,
          payslip?.gross_amount - payslip?.net_amount,
        ],
        backgroundColor: ["#B4D081", "#FF0066"],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    // Using set time out to mock http requests
    setTimeout(() => {
      setPayslip(payslipService.getPayslipsById(payslipID)[0]);
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);

  const onPaySlipDownload = async () => {
    if (Capacitor.isNativePlatform()) {
      /*
       *
       * Using Filesystem official plugin to read/write file on filesytem -> Mobile
       * Using Fileopener community plugin to open file with native prompt -> Mobile
       *
       */
      try {
        // Check if file existing then read URI to open with opener.
        const options = {
          path: `Payslip - ` + payslip?.id + ` - ` + payslip?.period + ".pdf",
          directory: Directory.Documents,
        };
        const existingFile = await Filesystem.readFile(options);
        const fileURI = await Filesystem.getUri(options);
        FileOpener.open({ filePath: fileURI.uri, openWithDefault: false });
      } catch (err) {
        console.log("Error - Pyslip existing::", err);
        const options = {
          url: payslip?.document_url,
          filePath:
            `Payslip - ` + payslip?.id + ` - ` + payslip?.period + ".pdf",
          fileDirectory: Directory.Documents,
          method: "GET",
        };
        const response: HttpDownloadFileResult = await Http.downloadFile(
          options
        );
        FileOpener.open({ filePath: response?.path, openWithDefault: false });
      }
    } else {
      const url =
        "https://api.allorigins.win/get?url=" +
        encodeURIComponent(payslip?.document_url);
      /*
       *
       * using Java Script method to get PDF file
       * Transforming blob to save pdf on machine
       * Will NOT work in current version due to CORS issues on dev/local
       *
       */

      fetch(url).then((response) => {
        response.blob().then(async (blob) => {
          console.log("BLOB::", blob);
          const fileURL = window.URL.createObjectURL(blob);

          let alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = payslip?.period + " - " + payslip?.last_name;
          alink.click();
        });
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
          <RiseLoader />
        </div>
      ) : (
        <main className="md:flex p-8 min-h-screen flex-col items-center  md:p-24 bg-white">
          <div className="z-10 px-0 pt-10 md:px-5 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <button type="button" onClick={() => router.back()}>
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src={arrowBack}
                alt="Deel Logo"
                width={36}
                priority
              />
            </button>
          </div>
          {/* <h1>Hello, you are viewing payslip with id {payslipID}</h1> */}
          <div className="md:flex justify-center mt-8">
            <div className="h-52 flex justify-center ">
              <Doughnut data={data} />
            </div>
            <div className="mt-4 md:ml-8">
              <h2 className={`mb-3 text-2xl font-semibold text-center`}>
                {payslip?.period}
              </h2>

              <div className="mt-4 flex flex-row w-full">
                <div className="text-center">
                  <span className="inline-block  p-2 rounded-[50%] inline-block"></span>
                </div>
                <div className="ml-2">
                  <h1 className="font-bold">{payslip?.gross_amount} $</h1>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Gross Amount
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-row w-full">
                <div className="text-center">
                  <span className="inline-block border p-2 rounded-[50%] inline-block bg-earnings"></span>
                </div>
                <div className="ml-2">
                  <h1 className="font-bold">{payslip?.net_amount} $</h1>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Earnings
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-row w-full">
                <div className="text-center">
                  <span className="inline-block border p-2 rounded-[50%] inline-block bg-deductions"></span>
                </div>
                <div className="ml-2">
                  <h1 className="font-bold">
                    {payslip?.gross_amount - payslip?.net_amount} $
                  </h1>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Deductions
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-8 flex flex-row w-full">
              <h1 className="font-bold">First name:</h1>
              <p className={`ml-1 opacity-50`}>{payslip?.first_name}</p>
            </div>
            <div className="flex flex-row w-full">
              <h1 className="font-bold">Last name:</h1>
              <p className={`ml-1 opacity-50`}>{payslip?.last_name}</p>
            </div>
            <div className="flex flex-row w-full">
              <h1 className="font-bold">Period:</h1>
              <p className={`ml-1 opacity-50`}>
                {payslip?.from_date + " - " + payslip?.to_date}
              </p>
            </div>
            <button
              onClick={() => onPaySlipDownload()}
              className="mt-8 bg-silver hover:bg-deductions hover:text-white text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Download payslip</span>
            </button>
          </div>
        </main>
      )}
    </>
  );
}
