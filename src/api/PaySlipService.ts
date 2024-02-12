const paySlipsJson = require('../assets/mocks/payslips.json')

import { PaySlip } from "./models/PaySlip";

export class PaySlipService {

    /**
   * fetch payslips by year`
   *
   * @param year
   * @returns Filtered list of payslips by input year
   */
    getPayslipsByYear(year: number) {
        return paySlipsJson.filter((i: PaySlip) =>
        year === i.year,
        );
    }

     /**
   * fetch payslips by year`
   *
   * @param year
   * @returns Filtered list of payslips by input year
   */
     getPayslipsById(id: string) {
        return paySlipsJson.filter((i: PaySlip) =>
        id === i.id,
        );
    }

    /**
   * Get all payslips
   * @returns
   */
    getAllPaySlips() {
        console.log(paySlipsJson)
        return paySlipsJson;
    }

}