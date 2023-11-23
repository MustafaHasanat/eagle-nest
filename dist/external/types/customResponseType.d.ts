type CustomResponseType<dataType> = {
    message: string;
    data: dataType;
    status: number;
    errors?: string[];
};
export default CustomResponseType;
