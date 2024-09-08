import { QuestionDetails } from "./QuestionDetails";
import { QuestionAnswer } from "./QuestionAnswer";
export interface QuestionDetailsWrapper{
	/** 詳細なクイズ */
	myEnglishQuizDetailsForm : QuestionDetails;
	myEnglishQuizAnswerForm : QuestionAnswer;
}	