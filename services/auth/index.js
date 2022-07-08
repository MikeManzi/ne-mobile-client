import axios from "axios";
import BASE_URL from "../../helpers/url";

export const register = async (data) => {
    return axios.post(`${BASE_URL}/api/users/register`, data)
    .then((res) => {
        console.log(res);
        return res?.data;
    })
    .catch((err) => {
            console.log("ubufu")
            return err;
        }
        );
}
