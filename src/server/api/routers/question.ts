import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Question, FormQuestion } from "@prisma/client";
interface ExtendedFormQuestion extends FormQuestion {
  question: Question;
}

export const questionRouter = createTRPCRouter({
  getFormQuestion: publicProcedure
  .query(async ({ ctx }) => {
    try {
      const formQuestions = await ctx.db.formQuestion.findMany({
        include: {
          question: true,
        },
      });
  
      const groupedQuestions: Record<string, ExtendedFormQuestion[]> = {
        part1: [],
        part2: [],
        part3: [],
      };
  
      for (const question of formQuestions) {
        switch (question.renderer) {
          case 'part_1':
            groupedQuestions.part1!.push(question);
            break;
          case 'part_2':
            groupedQuestions.part2!.push(question);
            break;
          case 'part_3':
            groupedQuestions.part3!.push(question);
            break;
          default:
            break;
        }
      }
      Object.values(groupedQuestions).forEach((part) => {
        part.sort((a, b) => a.question.order - b.question.order);
      });

      console.log(groupedQuestions);
    
      return groupedQuestions;
  
    } catch (error) {
      console.error(error);
      throw new Error("Failed to retrieve form questions");
    }
  }),
  
});
