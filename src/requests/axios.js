import axios from "axios";
export const axiosMap = (postUrl, method, data) => {
    if (method === "get") {
        let params = data;
        return axios({
            url: `https://restapi.amap.com/${postUrl}`,
            method: method,
            params
        })
            .then(res => res)
            .catch(err => err);
    }
};