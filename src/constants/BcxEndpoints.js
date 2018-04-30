const SERVER_URL = "https://bcx-dev.pillarproject.io";

module.exports = {
    BCXREGISTER_URL:   SERVER_URL + "/wallet-backend/register-new-wallet",
    BCXUNREGISTER_URL: SERVER_URL + "/wallet-backend/unregister-wallet",
    BCXFCMIID_URL:     SERVER_URL + "/updatefcmiid", // /wallet-backend/updatefcmiid
    BCXHISTORY_URL:    SERVER_URL + "/txhistory", // /wallet-client/txhistory GET
    BCXBALANCE_URL:    SERVER_URL + "/balance", // /wallet-client/balance GET
}