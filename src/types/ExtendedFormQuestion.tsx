import { Question, FormQuestion, Section} from "@prisma/client";
export interface ExtendedFormQuestion extends FormQuestion {
  question: Question & { section: Section };
}
