export default function axiosErrorHandler(error: any) {
    if (error.response) {
        return error.response.data.message;
    }
    if (error.request) return error.request;
    return error.message;
}