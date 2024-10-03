import axios from 'axios';

const requestQuestionTitleBaseUrl =  'http://localhost:8080/quizrest';
const requestQuestionDetailsBaseUrl = "http://localhost:8080/quizdetailsrest";
const requestTakeQuestionBaseUrl = "http://localhost:8080/takequizrest/";

export const questionTitleSave = async (questionTitle) => {
    try{
        return await axios.post(requestQuestionTitleBaseUrl+'/save', questionTitle);
    }catch (error){
        throw error;
    }
}

export const questionTitleUpdate = async (newQuestionTitle) => {
    try{
        return await axios.post(requestQuestionTitleBaseUrl+'/update', newQuestionTitle);
    }catch (error){
        throw error;
    }
}

export const questionTitleGet = async ()=> {
    try{
        const response = await axios.get(requestQuestionTitleBaseUrl)
        return response.data;
    }catch (error){
        throw error;
    }
}

export const questionTitleDelete = async (questionTitle) => {
    try{
        return await axios.post(requestQuestionTitleBaseUrl+'/delete', questionTitle);
    }catch (error){
        throw error;
    }
}

export const questionDetailsSave = async (questionDetailsWrapper) => {
    try {
        return await axios.post(requestQuestionDetailsBaseUrl + '/save', questionDetailsWrapper);
    } catch (error) {
        throw error;
    }
}


export const questionDetailsUpdate = async (questionDetails) => {
    try {
        return await axios.post(requestQuestionDetailsBaseUrl + '/update', questionDetails);
    } catch (error) {
        throw error;
    }
}

export const questionDetailsEdit = async (questionDetails) => {
    try {
        const response = await axios.post(requestQuestionDetailsBaseUrl + '/edit', questionDetails);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const questionDetailsGet = async (questionTitle) => {
    try {
        const response = await axios.post(requestQuestionDetailsBaseUrl + "/", questionTitle);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const questionDetailsDelete = async (details) => {
    try {
        return await axios.post(requestQuestionDetailsBaseUrl + '/delete', details);
    } catch (error) {
        throw error;
    }
}

export const takeQuizGet = async (questionTitle) => {
    try {
        const response = await axios.post(requestTakeQuestionBaseUrl, questionTitle);
        return response.data;
    } catch (error) {
        throw error;
    }
}


