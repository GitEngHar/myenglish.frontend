import axios from 'axios';
// myenglish-server-service
const requestQuestionTitleBaseUrl =  `${process.env.REACT_APP_SERVER_DOMAIN}/quizrest`;
const requestQuestionDetailsBaseUrl = `${process.env.REACT_APP_SERVER_DOMAIN}/quizdetailsrest`;
const requestLoginConfirmBaseUrl = `${process.env.REACT_APP_SERVER_LOGIN_API_DOMAIN}/confirm`;
const authLoginUrl = `${process.env.REACT_APP_SERVER_LOGIN_DOMAIN}`

// const requestQuestionTitleBaseUrl =  'http://myenglish-server-service.myenglish.svc.cluster.local:8080/quizrest';
// const requestQuestionDetailsBaseUrl = "http://myenglish-server-service.myenglish.svc.cluster.local:8080/quizdetailsrest";
// const requestTakeQuestionBaseUrl = "http://myenglish-server-service.myenglish.svc.cluster.local:8080/takequizrest/";
// const requestLoginConfirmBaseUrl = "http://myenglish-server-service.myenglish.svc.cluster.local:8080/login/confirm";
// const requestQuestionTitleBaseUrl =  'http://localhost:8082/quizrest';
// const requestQuestionDetailsBaseUrl = "http://localhost:8082/quizdetailsrest";
// const requestTakeQuestionBaseUrl = "http://localhost:8082/takequizrest/";
// const requestLoginConfirmBaseUrl = "http://localhost:8082/login/confirm";
// const authLoginUrl = "http://localhost:8082/login"
axios.defaults.withCredentials = true;


export function redirectBackendServer(){
    window.location.href = authLoginUrl;
}

export const questionTitleSave = async (questionTitle) => {
    try{
        return await axios.post(requestQuestionTitleBaseUrl+'/save', questionTitle);
    }catch (error){
        return error;
    }
}

export const questionTitleUpdate = async (newQuestionTitle) => {
    try{
        return await axios.post(requestQuestionTitleBaseUrl+'/update', newQuestionTitle);
    }catch (error){
        return error
    }
}

export const questionTitleGet = async ()=> {
    try{
        const response = await axios.get(requestQuestionTitleBaseUrl)
        return response.data;
    }catch (error){
        return error;
    }
}

export const questionTitleDelete = async (questionTitle) => {
    try{
        return await axios.post(requestQuestionTitleBaseUrl+'/delete', questionTitle);
    }catch (error){
        return error;
    }
}

export const questionDetailsAdd = async (questionDetails) => {
    try {
        return await axios.post(requestQuestionDetailsBaseUrl + '/save', questionDetails);
    } catch (error) {
        return error;
    }
}


export const questionDetailsUpdate = async (questionDetails) => {
    try {
        return await axios.post(requestQuestionDetailsBaseUrl + '/update', questionDetails);
    } catch (error) {
        return error;
    }
}
export const questionDetailsGet = async (questionTitle) => {
    try {
        const response = await axios.post(requestQuestionDetailsBaseUrl + "/all", questionTitle);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const questionDetailsDelete = async (details) => {
    try {
        return await axios.post(requestQuestionDetailsBaseUrl + '/delete', details);
    } catch (error) {
        return error;
    }
}

export const loginConfirmGet = async () => {
    try {
        const response = await axios.get(requestLoginConfirmBaseUrl);
        return response.data;
    } catch (error) {
        return error;
    }
}


