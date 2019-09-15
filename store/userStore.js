export const state = () => ({
    userInfo: {
    }
})
// 同步事件
export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data
    },
    cleanUserInfo(state,data){
        state.userInfo={
            token:"",
            user:{}
        }
        localStorage.removeItem("store")
    }

};
// 异步事件
export const actions = {
    login(state, data) {
        return this.$axios({
            url: "/accounts/login",
            method: "post",
            data: data
        })

    }
};