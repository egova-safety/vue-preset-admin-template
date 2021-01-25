import ServiceBase from "./service-base";
import { service } from "@egova/flagwind-web";
import Cookies from "js-cookie";
import JSEncrypt from "jsencrypt";

export default class CommonService extends ServiceBase {
    /**
     * 登录
     * @param username
     * @param password
     */
    public async login(username: string, password: string): Promise<any> {
        return this._post<any>(`${this.securityServer}/oauth/extras/token`, {
            client_id: "unity-client",
            client_secret: "unity",
            grant_type: "password",
            password: this.getEncryptPassword(password),
            username: username
        });
    }

    public getEncryptPassword(password: string): string {
        let publicKey = Cookies.get("public-key");
        if (publicKey === "none" || !publicKey) {
            return password;
        }
        let encryptor = new JSEncrypt(); // 新建JSEncrypt对象
        encryptor.setPublicKey(publicKey); // 设置公钥
        return encryptor.encrypt(password);
    }

    @service("query", { title: "获取加密需要的公钥" })
    public async getPublicKey(): Promise<any> {
        let or = await this._get<any>(
            `${this.securityServer}/oauth/extras/public-key`
        );
        Cookies.set("public-key", or.result || "none");
        return or;
    }

    /**
     *
     * @param cache 为true时，优先读取localStorage中的信息。
     */
    @service("query", { title: "获取当前用户信息" })
    public getCurrentUser(cache: boolean = true) {
        if (cache && localStorage.getItem("user")) {
            return {
                result: JSON.parse(localStorage.getItem("user") || ""),
                hasError: false
            };
        }
        return this._get<any>(`${this.securityServer}/unity/user/composite`);
    }
}
