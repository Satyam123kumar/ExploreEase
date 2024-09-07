import axios from "axios";

export const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
        headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json"
        }
    }).then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        window.location.reload();
    })
}