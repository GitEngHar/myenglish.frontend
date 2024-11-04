import {QuestionDetailsWrapper} from '../types/QuestionDetailsWrapper'
import {QuestionDetails} from '../types/QuestionDetails'
import {QuestionAnswer} from '../types/QuestionAnswer'
import {QuestionTitle} from '../types/QuestionTitle'
import {generateOpenAITextToQuiz, getOpenAIImagetoTextResponse} from '../features/open-ai/OpenAIAPI';
import {questionDetailsSave} from '../features/myenglish/MyEnglishAPI'
/* OpenAIに関連する機能 */
export class OpenAIService {
    mockData : string = "問題: 渋谷のスクランブル交差点は、多くの人々が行き交う活気に満ちた場所です。\n" +
        "\n" +
        "選択肢:\n" +
        "1. Shibuya Crossing is a lively place where many people come and go.\n" +
        "2. Shibuya Crossing is a quiet place where few people visit.\n" +
        "3. Shibuya Crossing is an old and historical place.\n" +
        "4. Shibuya Crossing is a peaceful place in the countryside.\n" +
        "\n" +
        "答え: 1";

     private convertAIDataToWrapper(responseAIData:string,questionTiltleId:number): QuestionDetailsWrapper | null{
        console.log(responseAIData)
        //正規表現で文字列を抜き出す
        const questionWordMatch = responseAIData.match(/^問題:\s*([\s\S]*?)\s*1./);
        const answerCandidateNo1Match  = responseAIData.match(/1.\s*([\s\S]*?)\s*2./);
        const answerCandidateNo2Match  = responseAIData.match(/2.\s*([\s\S]*?)\s*3./);
        const answerCandidateNo3Match  = responseAIData.match(/3.\s*([\s\S]*?)\s*4./);
        const answerCandidateNo4Match  = responseAIData.match(/4.\s*([\s\S]*?)\s*答え/);
        const answerIdMatch  = responseAIData.match(/答え\s*(.*)/);

        //抜き出せた場合に文字列を格納しそれ以外はnull
        const questionWord = questionWordMatch ? questionWordMatch[1] : null;
        const answerCandidateNo1 = answerCandidateNo1Match ? answerCandidateNo1Match[1] :null;
        const answerCandidateNo2 = answerCandidateNo2Match ? answerCandidateNo2Match[1] :null;
        const answerCandidateNo3 = answerCandidateNo3Match ? answerCandidateNo3Match[1] :null;
        const answerCandidateNo4 = answerCandidateNo4Match ? answerCandidateNo4Match[1] :null;
        const answerIdString = answerIdMatch ? answerIdMatch[1]: null;
        let answerId : number|null;

        let questionDetails : QuestionDetails;
        let questionAnswer : QuestionAnswer;
        let questionDetailsWrapper : QuestionDetailsWrapper

        if(questionWord == null){
            console.log("convertAIDataToWrapperでnull (questionWord)")
            return null;
        }else{
            questionDetails = {
                questionDetailsId : 0,
                questionTitleId : questionTiltleId,
                questionWord : questionWord
            };
        }

        if(answerIdString == null){
            console.log("convertAIDataToWrapperでnull (answerIdString)")
            return null;
        }else{
            const result = answerIdString.match(/\d+/);
            console.log("result=",result);
            answerId = result ? parseInt(result[0], 10) : null;
        }

        if(
            answerCandidateNo1 == null || answerCandidateNo2 == null ||
            answerCandidateNo3 == null || answerCandidateNo4 == null ||
            answerId == null
        ){
            console.log("answerCandidata1",answerCandidateNo1);
            console.log("answerCandidata2",answerCandidateNo2);
            console.log("answerCandidata3",answerCandidateNo3);
            console.log("answerCandidata4",answerCandidateNo4);
            return null;
        }else{
            questionAnswer = {
                questionAnswerId : 0,
                questionTitleId : questionTiltleId,
                questionDetailsId : 0,
                answerId : answerId,
                answerCandidateNo1 : answerCandidateNo1,
                answerCandidateNo2 : answerCandidateNo2,
                answerCandidateNo3 : answerCandidateNo3,
                answerCandidateNo4 : answerCandidateNo4
            }
        }


        questionDetailsWrapper = {
            myEnglishQuizDetailsForm : questionDetails,
            myEnglishQuizAnswerForm : questionAnswer
        }


        return questionDetailsWrapper;
    }

    async generateAIQuestion (base64Image:string[],questionTitle:QuestionTitle): Promise<string>{
        // 画像を解析して日本語で出力する
        let imageDescriptionJP : string = await getOpenAIImagetoTextResponse(base64Image);
        console.log(imageDescriptionJP);
        // 日本語の出力から問題文を作成する
        let generatedQuiz : string = await generateOpenAITextToQuiz(imageDescriptionJP);
        console.log(imageDescriptionJP);
        // データを登録
        const questionDetailsWrapper = this.convertAIDataToWrapper(generatedQuiz,questionTitle.questionTitleId);
        if (questionDetailsWrapper != null){
            await questionDetailsSave(questionDetailsWrapper);
        }else{
            console.log("データ登録を回避")
        }
        return generatedQuiz;
    }

}