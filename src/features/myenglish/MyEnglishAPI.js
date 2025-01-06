import axios from 'axios';

const requestQuestionTitleBaseUrl =  'http://localhost:8080/quizrest';
const requestQuestionDetailsBaseUrl = "http://localhost:8080/quizdetailsrest";
const requestTakeQuestionBaseUrl = "http://localhost:8080/takequizrest/";
const authLoginUrl = "http://localhost:8080/login"
axios.defaults.withCredentials = true;


const redirectBackendServer = (error) => {
    window.location.href = authLoginUrl;
    alert(error);
}

export const questionTitleSave = async (questionTitle) => {
    try{
        const saveTitleUrl = new URL("/save",requestQuestionTitleBaseUrl);
        return await axios.post(saveTitleUrl.toString(), questionTitle);
    }catch (error){
        redirectBackendServer(error);
        throw error;
    }
}

export const questionTitleUpdate = async (newQuestionTitle) => {
    try{
        const updateTitleUrl = new URL("/update",requestQuestionTitleBaseUrl)
        return await axios.post(updateTitleUrl.toString(), newQuestionTitle);
    }catch (error){
        redirectBackendServer(error);
        throw error;
    }
}

export const questionTitleGet = async ()=> {
    try{
        const response = await axios.get(requestQuestionTitleBaseUrl)
        return response.data;
    }catch (error){
        redirectBackendServer(error);
        throw error;
    }
}

export const questionTitleDelete = async (questionTitle) => {
    try{
        const deleteTitleUrl = new URL(requestQuestionTitleBaseUrl,"/delete");
        return await axios.post(deleteTitleUrl.toString(), questionTitle);
    }catch (error){
        redirectBackendServer(error);
        throw error;
    }
}

export const questionDetailsSave = async (questionDetailsWrapper) => {
    try {
        const saveDetailsUrl = new URL(requestQuestionDetailsBaseUrl,"/save");
        return await axios.post(saveDetailsUrl.toString(), questionDetailsWrapper);
    } catch (error) {
        redirectBackendServer(error);
        throw error;
    }
}


export const questionDetailsUpdate = async (questionDetails) => {
    try {
        const updateDetailsUrl = new URL(requestQuestionDetailsBaseUrl,"/update");
        return await axios.post(updateDetailsUrl.toString(), questionDetails);
    } catch (error) {
        redirectBackendServer(error);
        throw error;
    }
}

export const questionDetailsEdit = async (questionDetails) => {
    try {
        const editDetailsUrl = new URL(requestQuestionDetailsBaseUrl,"/edit");
        const response = await axios.post(editDetailsUrl, questionDetails);
        return response.data;
    } catch (error) {
        redirectBackendServer(error);
        throw error;
    }
}

export const questionDetailsGet = async (questionTitle) => {
    try {
        const getDetailsUrl = new URL(requestQuestionDetailsBaseUrl,"/");
        const response = await axios.post(getDetailsUrl.toString(), questionTitle);
        return response.data;
    } catch (error) {
        redirectBackendServer(error);
        throw error;
    }
}

export const questionDetailsDelete = async (details) => {
    try {
        const deleteDetailsUrl = new URL(requestQuestionDetailsBaseUrl,"/delete");
        return await axios.post(deleteDetailsUrl.toString(), details);
    } catch (error) {
        redirectBackendServer(error);
        throw error;
    }
}

export const takeQuizGet = async (questionTitle) => {
    try {
        const response = await axios.post(requestTakeQuestionBaseUrl, questionTitle);
        return response.data;
    } catch (error) {
        redirectBackendServer(error);
        throw error;
    }
}




