import type { Data } from "../interfaces/IData.interface";
import { apiClient } from "./apiAxios"

export const getData = async (): Promise<Data[]> => {
    const response = await apiClient<Data[]>("");
    const colors = response.data;
    return colors;
}