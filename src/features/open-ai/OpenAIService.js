import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPEN_API;
const model_name = 'gpt-4o-2024-05-13';
const openai = axios.create({
    baseURL: 'https://api.openai.com/v1/chat',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    },
});
let prompt = "画像から情景を読み取り 4択の日本文を英語に訳す問題を出題して\n" +
    "問題は日本語 で 回答候補が英語\n" +
    "候補は英語の候補で、1~4で1つだけ正解がある\n" +
    "\n" +
    "以下の形式で出力して\n" +
    "問題:\n" +
    "1. 回答候補1\n" +
    "2. 回答候補2\n" +
    "3. 回答候補3\n" +
    "4. 回答候補4\n" +
    "答え:n番(1~4の数値)";
let responseAIData = "";

export const getOpenAIResponse = async (base64_image) => {
    try {
        // console.log(base64_image[0])
        // return "hoge";

        const response = await openai.post('/completions', {
            model: model_name,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: prompt,
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