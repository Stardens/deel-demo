export class PaySlip {
    id?: string;
    year?: number;
    period?: string;
    first_name?: string;
    last_name?: string;
    is_document_available?: boolean;
    from_date?: string;
    to_date?: string;
    gross_amount?: number;
    net_amount?: number;
    document_url?: string;

    constructor(
        id: string,
        year: number,
        period: string,
        first_name: string,
        last_name: string,
        is_document_available: boolean,
        from_date: string,
        to_date: string,
        gross_amount: number,
        net_amount: number,
        document_url: string,
    ) {
        this.id = id;
        this.year = year,
        this.period = period,
        this.first_name = first_name;
        this.last_name = last_name;
        this.is_document_available = is_document_available;
        this.from_date = from_date;
        this.to_date = to_date;
        this.gross_amount = gross_amount;
        this.net_amount = net_amount;
        this.document_url = document_url;
    }
}
