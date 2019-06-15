export interface SmsLogPaginationData {

    data: SmsLog [],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    totalPages: number
        
}

export interface SmsLog {
    createdBy: number,
    createdDate: Date,
    id: number,
    langugeCode: string,
    phoneNumber: string,
    text: string,
    twilioId: string
}