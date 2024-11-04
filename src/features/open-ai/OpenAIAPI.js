import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPEN_API;
let generate_question_base_prompt = process.env.REACT_APP_PROMPT_GENERATE_QUESTION;
const GENERATE_TEXT_TO_IMAGE = process.env.REACT_APP_PROMPT_IMAGE_TO_TEXT_JP;
const model_name = 'gpt-4o-2024-05-13';
//  axios.defaults.withCredentials = false;

const openai = axios.create({
    baseURL: 'https://api.openai.com/v1/chat',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    },
    withCredentials: false
});

let responseAIData = "";

export const generateOpenAITextToQuiz = async(textToImage) => {
    try {
        const GENERATE_QUESTION_PROMPT = generate_question_base_prompt.replace("GeneratedJPTEXT",textToImage);
        console.log(GENERATE_QUESTION_PROMPT)
        const response = await openai.post('/completions', {
            model: model_name,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: GENERATE_QUESTION_PROMPT,
                        }
                    ]
                }
            ],
            max_tokens: 300,
        });
        if(response.data.choices.length > 0){
            responseAIData = response.data.choices[0].message.content;
        }else{
            console.log("Not choices")
        }
        return responseAIData;
    } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        throw error;
    }
}

export const getOpenAIImagetoTextResponse = async (base64_image) => {
    try {
        console.log("prompt : ", GENERATE_TEXT_TO_IMAGE);
        const response = await openai.post('/completions', {
            model: model_name,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: GENERATE_TEXT_TO_IMAGE,
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: base64_image[0]
                        }
                        }
                ]
                }
            ],
            max_tokens: 300,
        });
        if(response.data.choices.length > 0){
            responseAIData = response.data.choices[0].message.content;
        }else{
            console.log("Not choices")
        }
        return responseAIData;
    } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        throw error;
    }
};