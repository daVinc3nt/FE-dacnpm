import axios, { AxiosResponse } from "axios";
import { BulkCreateFullFlashCard, CheckExistAccount, ConfirmPayload, CreateFTag, CreateFullFlashCard, CreateFullPracticeFromTest, CreateFullQuiz, CreateFullTest, CreateTag, CreateTestFromQuizIds, EmailResetPassword, FetchingType, GetRecord, InitRecord, LangVersion, LoginPayload, PrintJobPayload, RecordFetchingType, RefreshToken, RemarkWriting, ResendOTPPayload, SearchPayload, SignUpPayload, Skill, UpdateAccountPayload, UpdateAvatarPayload, UpdateFTag, UpdateFullFlashCard, UpdateFullQuiz, UpdateFullRecord, UpdateFullTest, UpdateQuiz, UpdateRecord, UpdateRecordConfig, UpdateTag, VerifyOtpForResetPasswordPayload, VerifyOtpPayload } from "./interfaces";
import { UUID } from "crypto";

export class AuthOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/internal/admin';
        this.langQuery = `lang=${LangVersion.vi}`;
    }
    async getAdmin(limit: number, page: number, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/get`, {
                params: {limit, page},
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    public async signup(payload: SignUpPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/signup?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error signing up: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    public async login(payload: LoginPayload) {
       try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/login`,payload,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}
export class AdminAccountOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/internal/admin/detail/me';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }

    async getAuthenticatedInfo(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async resetPassword(email: EmailResetPassword) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/password/reset?${this.langQuery}`, email, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async checkExist(email: CheckExistAccount) {
        try {      
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/check?${this.langQuery}`, email, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error.message);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    public async verifyOtpForResetPassword(payload: VerifyOtpForResetPasswordPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/otp/verify?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error verifying otp: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}
export class AccountOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/users';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }

    async search(payload: SearchPayload, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/search?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async findOne(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/search/${id}?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async update(id: UUID, payload: UpdateAccountPayload, token: string) {
        try {
			const response: AxiosResponse = await axios.put(`${this.baseUrl}/update/${id}?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async updateAvatar(id: UUID, payload: UpdateAvatarPayload, token: string) {
        try {
            const formData = new FormData();
            formData.append('avatar', payload.avatar);

			const response: AxiosResponse = await axios.put(`${this.baseUrl}/avatar/update/${id}?${this.langQuery}`, formData, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating avatar: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    // will return image url in data
    async getAvatar(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/avatar/get/${id}?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error getting avatar: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    // get total amount number of accounts
    async count(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/count?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async getAuthenticatedInfo(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/detail`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async resetPassword(email: EmailResetPassword) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/password/reset?${this.langQuery}`, email, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async checkExist(email: CheckExistAccount) {
        try {      
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/check?${this.langQuery}`, email, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error.message);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    public async verifyOtpForResetPassword(payload: VerifyOtpForResetPasswordPayload) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/otp/verify?${this.langQuery}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error verifying otp: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}
export class PaymentOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/payments';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }

    async create(a4Count: number, a3Count:number, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/payments/create?a4Count=${a4Count}&a3Count=${a3Count}`,{},{
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async getAll(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/payments`,{
                withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error get all payments: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    //for admin
    async searchStudentByID(studentId: number, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/student/${studentId}`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    //for admin
    async searchByStudent(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/student`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async confirm( payload: ConfirmPayload ,token: string) {
        try {
			const response: AxiosResponse = await axios.post(`https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/momo/ipn`,payload,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}
export class PrinterOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/printers';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }

    async create(payload: any, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}`, payload, {

				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    //get tags
    async searchAll(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async update(id: UUID, payload: UpdatePrinterPayload, token: string) {
        try {
			const response: AxiosResponse = await axios.put(`${this.baseUrl}/${id}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async delete(id: string, token: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/${id}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}
export class FileOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/files';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }

    async create(a4Count: number, a3Count:number, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/create?a4Count=${a4Count}&a3Count=${a3Count}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async searchAllUserFiles(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/get-all`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async searchFilesById(id: string, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async delete(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/delete/${id}?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}
export class PrintJobOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/print_jobs';
    }
    async create(payload: PrintJobPayload, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}/create`, payload,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return {message:error?.response?.data.message, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async searchAllUserFiles(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/get-all`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async searchFilesById(id: string, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}
export class UserOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/users';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }
    async searchAllUser(limit: number, page: number, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/get`,{
                params: {limit, page},
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async searchFilesById(id: string, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async delete(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/delete/${id}?${this.langQuery}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}
export class LocationOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/locations';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }
    async create(payload: any, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}`, payload, {

				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async searchAll(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async searchFilesById(id: string, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async delete(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/${id}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}
export class FileFormatOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/file-formats';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }

    async create(payload: any, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}`, payload, {

				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    //get tags
    async searchAll(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }

    async delete(id: string, token: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/${id}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}

export class PageAllocOperation {
    private baseUrl: string;
    private langQuery: string;

    constructor() {
        this.baseUrl = 'https://co3001-software-engineering-internal-kw83.onrender.com/api/v1/page-allocations';
        this.langQuery = `lang=${LangVersion.vi}`;
    }

    setLanguage(lang: LangVersion) {
        this.langQuery = `lang=${lang}`;
    }
    async insert(payload: any, token: string) {
        try {
			const response: AxiosResponse = await axios.post(`${this.baseUrl}`, payload, {

				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async getAll(token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async getById(id: string, token: string) {
        try {
			const response: AxiosResponse = await axios.get(`${this.baseUrl}/${id}`,{
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error searching accounts: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async update(id: UUID, payload: any, token: string) {
        try {
			const response: AxiosResponse = await axios.put(`${this.baseUrl}/${id}`, payload, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
    async delete(id: UUID, token: string) {
        try {
			const response: AxiosResponse = await axios.delete(`${this.baseUrl}/${id}`, {
				withCredentials: true,
                validateStatus: status => status >= 200 && status <= 500,
                headers: {
                    Authorization: `Bearer ${token}`
                },
			});
			
			return {
                success: response.data.success,
                message: response.data.message,
                data: response.data.data,
                status: response.status
            };
		} 
		catch (error: any) {
			console.log("Error updating account: ", error?.response?.data);
            console.error("Request that caused the error: ", error?.request);
            return { success: error?.response?.data, request: error?.request, status: error.response ? error.response.status : null };
		}
    }
}

// flash card

export interface UpdatePrinterPayload {
    name?: number;
    brand?: string;
    type?: string;
    lastMaintenanceDate?: number[];
    supportContact?: string;
    description?: string;
    a4RemainingPages?: number;
    a3RemainingPages?: number;
    status?: string;
    location?: {
        id?: number;
    };
    spso?: {
        id?: number;
    };
}
