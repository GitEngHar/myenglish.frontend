import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPEN_API;

const openai = axios.create({
    baseURL: 'https://api.openai.com/v1/chat',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    },
});

let responseAIData = "";

export const getOpenAIResponse = async (prompt) => {
    try {
        const response = await openai.post('/completions', {
            model: 'gpt-3.5-turbo-1106',
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt }
                    ],
                },
            ],
            max_tokens: 100,
        });
        console.log(response);
        if(response.data.choices.length > 0){
            console.log(response.data.choices[0]);
            console.log(response.data.choices[0].message.content);
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