import { createTRPCRouter, protectedProcedure } from "@/trpc/api/trpc";
import { ZodOnboardingMutationSchema } from "./schema";
import { generatePublicId } from "@/common/id";

export const onboardingRouter = createTRPCRouter({
  onboard: protectedProcedure
    .input(ZodOnboardingMutationSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const publicId = generatePublicId();

        const company = await ctx.db.company.create({
          data: {
            ...input.company,
            incorporationDate: new Date(input.company.incorporationDate),
            publicId,
          },
        });

        const user = await ctx.db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            name: `${input.user.name}`,
            email: `${input.user.email}`,
          },
          select: {
            id: true,
          },
        });

        await ctx.db.membership.create({
          data: {
            access: "admin",
            active: true,
            isOnboarded: true,
            status: "accepted",
            title: input.user.title,
            userId: user.id,
            companyId: company.id,
            lastAccessed: new Date(),
          },

          // TODO: create an Audit Log
        });
        return { success: true, message: "successfully onboarded", publicId };
      } catch (error) {
        return { success: false, message: "failed to onboard" };
      }
    }),
});
