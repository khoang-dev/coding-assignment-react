import apiClient from "./apiConfig";

async function getList() {
    return apiClient.get('/users');
}

const userApi = { getList };

export default userApi;