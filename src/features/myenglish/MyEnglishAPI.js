import axios from 'axios';
// myenglish-server-service
const requestQuestionTitleBaseUrl =  'http://localhost:8080/quizrest';
const requestQuestionDetailsBaseUrl = "http://localhost:8080/quizdetailsrest";
const requestTakeQuestionBaseUrl = "http://localhost:8080/takequizrest/";
const requestLoginConfirmBaseUrl = "http://localhost:8080/login/confirm";
const authLoginUrl = "http://localhost:8080/login"

// const requestQuestionTitleBaseUrl =  'http://myenglish-server-service:8080/quizrest';
// const requestQuestionDetailsBaseUrl = "http://myenglish-server-service:8080/quizdetailsrest";
// const requestTakeQuestionBaseUrl = "http://myenglish-server-service:8080/takequizrest/";
// const authLoginUrl = "http://localhost:8082/login"
axios.defaults.withCredentials = true;


export function redirectBackendServer(){
    window.location.href = authLoginUrl;
}

export const questionTitleSave = async (questionTitle) => {
    try{
        return await axios.post(requestQuestionTitleBaseUrl+'/save', questionTitle);
    }catch (error){
        redirectBackendServer();
        throw error;
    }
}

export const questionTitleUpdate = async (newQuestionTitle) => {
    try{
        return await axios.post(requestQuestionTitleBaseUrl+'/update', newQuestionTitle);
    }catch (error){
        redirectBackendServer();
        throw error;
    }
}

export const questionTitleGet = async ()=> {
    try{
        const response = await axios.get(requestQuestionTitleBaseUrl)
        return response.data;
    }catch (error){
        //redirectBackendServer();
        throw error;
    }
}

export const questionTitleDelete = async (questionTitle) => {
    try{
        return await axios.post(requestQuestionTitleBaseUrl+'/delete', questionTitle);
    }catch (error){
        redirectBackendServer();
        throw error;
    }
}

export const questionDetailsAdd = async (questionDetailsWrapper) => {
    try {
        return await axios.post(requestQuestionDetailsBaseUrl + '/save', questionDetailsWrapper);
    } catch (error) {
        redirectBackendServer();
        throw error;
    }
}


export const questionDetailsUpdate = async (questionDetailsWrapper) => {
    try {
        return await axios.post(requestQuestionDetailsBaseUrl + '/update', questionDetailsWrapper);
    } catch (error) {
        redirectBackendServer();
        throw error;
    }
}

export const questionDetailsEdit = async (questionDetails) => {
    try {
        const response = await axios.post(requestQuestionDetailsBaseUrl + '/edit', questionDetails);
        return response.data;
    } catch (error) {
        redirectBackendServer();
        throw error;
    }
}

export const questionDetailsGet = async (questionTitle) => {
    try {
        const response = await axios.post(requestQuestionDetailsBaseUrl + "/all", questionTitle);
        return response.data;
    } catch (error) {
        redirectBackendServer();
        throw error;
    }
}

export const questionDetailsDelete = async (details) => {
    try {
        return await axios.post(requestQuestionDetailsBaseUrl + '/delete', details);
    } catch (error) {
        redirectBackendServer();
        throw error;
    }
}

export const takeQuizGet = async (questionTitle) => {
    try {
        const response = await axios.post(requestTakeQuestionBaseUrl, questionTitle);
        return response.data;
    } catch (error) {
        redirectBackendServer();
        throw error;
    }
}

export const loginConfirmGet = async () => {
    try {
        const response = await axios.get(requestLoginConfirmBaseUrl);
        return response.data;
    } catch (error) {
        redirectBackendServer();
        throw error;
    }
}


