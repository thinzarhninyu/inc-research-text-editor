import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ExtendedFormQuestion } from "@/types/ExtendedFormQuestion";
export const questionRouter = createTRPCRouter({
  getFormQuestion: publicProcedure.query(async ({ ctx }) => {
    try {
      const formQuestions = await ctx.db.formQuestion.findMany({
        include: {
          question: {
            include: {
              section: true,
            },
          },
        },
      });

      const groupedQuestions: Record<string, ExtendedFormQuestion[]> = {
        part1: [],
        part2: [],
        part3: [],
      };

      for (const question of formQuestions) {
        switch (question.renderer) {
          case "part_1":
            groupedQuestions.part1!.push(question);
            break;
          case "part_2":
            groupedQuestions.part2!.push(question);
            break;
          case "part_3":
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

  updateAnswerPart1: publicProcedure
    .input(
      z.object({
        answer: z.string(),
        formQuestionID: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.formQuestion.update({
          where: {
            id: input.formQuestionID,
          },
          data: {
            answer: input.answer,
          },
        });

        return { message: "Answers updated successfully" };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update answers");
      }
    }),

    updateAnswerPart2: publicProcedure
    .input(
      z.object({
        answer: z.string(),
        formQuestionID: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.formQuestion.update({
          where: {
            id: input.formQuestionID,
          },
          data: {
            answer: input.answer,
          },
        });

        return { message: "Answers updated successfully" };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update answers");
      }
    }),
});
