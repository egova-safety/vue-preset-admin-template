import { MutationTree } from "vuex";
import UserState from "./state";
import { UserInfo } from "@/models";
import Cookies from "js-cookie";
export function save(state: UserState, userInfo: UserInfo): void {
    state.id = userInfo.user?.id;
    state.name = userInfo.user?.name;
    state.photo = userInfo.user?.photo;
    state.userName = userInfo.user?.username;
    state.detail = userInfo.user;
    state.person = userInfo.person;
    Cookies.set("username", state.userName);
    Cookies.set("personId", userInfo.user?.personId || "");
    if (userInfo.access_token) {
        Cookies.set("access_token", userInfo.access_token);
    }
    localStorage.setItem("user", JSON.stringify(userInfo));
}
export function clear(state: UserState): void {
    state.id = "";
    state.name = "";
    state.photo = "";
    state.userName = "";
    state.detail = {};
    state.permissions = [];
    state.person = [];
    Cookies.remove("username");
    Cookies.remove("personId");
    Cookies.remove("access_token");
    localStorage.clear();
}
export function logout(state: UserState): void {
    clear(state);
}
export default <MutationTree<UserState>>{
    save,
    clear,
    logout
};
