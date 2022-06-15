import {httpPost} from "./index";

export default {
    getToken: (data) => httpPost({url: '/security/auth_check', data}),
}