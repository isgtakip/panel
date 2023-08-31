/*eslint-disable*/
export default function (ctx, inject) {
    let {
        app: { $axios },
    } = ctx;
const ya = $axios.create()
yaskaApi.defaults.withCredentials = true
yaskaApi.setBaseURL(process.env.apiURL)
inject('yaskaApi', yaskaApi)
}