import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPEN_API;
const PROMPT = process.env.REACT_APP_OPEN_PROMPT;
const model_name = 'gpt-4o-2024-05-13';
const openai = axios.create({
    baseURL: 'https://api.openai.com/v1/chat',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    },
});

let responseAIData = "";

export const getOpenAIResponse = async (base64_image) => {
    try {
        const response = await openai.post('/completions', {
            model: model_name,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: PROMPT,
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