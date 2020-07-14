import * as axios from 'axios';

const instanse = axios.create({
    withCredentials:true,
    baseURL:"https://social-network.samuraijs.com/api/1.0/",
    headers:{"API-KEY":"f338f55c-cff9-4974-8101-8f1d00bc0c1a"}
})

export const UsersAPI = {
    getUsers(pageNumber,pageSize){
        return  instanse.get(`users?page=${pageNumber}&count=${pageSize}`)
        .then(response=>{return response.data})
    },
    followUser(userId){
        return instanse.post(`follow/`+userId)
        .then(response=>{return response.data})
    },
    unfollowUser(userId){
        return instanse.delete(`follow/`+userId)
        .then(response=>{return response.data})
    },
    getProfile(userId){
        return profileAPI.getProfile(userId);
    }
    
}
export const profileAPI = {
    getProfile(userId){
        return instanse.get(`profile/`+userId)
        .then(response=>{return response})
    },
    getStatus(userId){
        return instanse.get(`/profile/status/`+userId)
        .then(response=>{return response})
    },
    updateStatus(status){
        // console.log(status);
        return instanse.put(`/profile/status`,{status})
    },
    updatePhoto(photoFile){
        let formData = new FormData();
        formData.append("image",photoFile)
        return instanse.put(`/profile/photo`,formData,{
            headers:{
                'Content-Type':"multipart/form-data"
            }
        });
    },
    saveUserData(data){
        return instanse.put('/profile',data);
    }

    
}

export const authApi = {
    me(){
        return instanse.get(`auth/me`)
        .then(response=>{return response})
    },
    login(email,password,rememberMe = false,captcha=null){
        return instanse.post(`auth/login`,{email,password,rememberMe,captcha});
    },
    logout(){
        return instanse.delete(`auth/login`);
    }
}

export const securityApi = {
    getCaptchaUrl(){
        return instanse.get("security/get-captcha-url");
    }
}


export const CatsApi = {
    getCatsWithApi(limit){
        return axios({
            method: 'get',
            url: 'https://api.thecatapi.com/v1/images/search',
            params: { limit:limit, size:"full" },
            headers:{"x-api-key":"DEMO-API-KEY"}
        });
    }
}


export const AlbumsApi = {
    getAlbumsFromApi(){
        return axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/albums',
        });
    }
}

export const JsonPostsApi = {
    getJsonPostsApi(){
        return axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/posts',
        });
    }
}




