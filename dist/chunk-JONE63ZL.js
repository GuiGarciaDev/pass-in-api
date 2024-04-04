import {
  prisma
} from "./chunk-ERVDTVHJ.js";

// src/routes/get-event-attendees.ts
import z from "zod";
async function getEventAttendees(app) {
  app.withTypeProvider().get(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Get event attendees",
        tags: ["events"],
        params: z.object({
          eventId: z.string().uuid()
        }),
        querystring: z.object({
          query: z.string().nullish(),
          pageIndex: z.string().nullish().default("0").transform(Number)
        }),
        response: {
          200: z.object({
            attendees: z.array(
              z.object({
                id: z.number(),
                name: z.string(),
                email: z.string().email(),
                createdAt: z.date(),
                checkedInAt: z.date().nullable()
              })
            )
          })
        }
      }
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { query, pageIndex } = request.query;
      const attendee = await prisma.attendee.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          checkIn: {
            select: {
              createdAt: true
            }
          }
        },
        where: query ? {
          eventId,
          name: {
            contains: query
          }
        } : {
          eventId
        },
        take: 10,
        skip: pageIndex * 10,
        orderBy: {
          createdAt: "desc"
        }
      });
      if (attendee === null) {
        throw new Error("Event not found.");
      }
      return reply.send({
        attendees: attendee.map((attendee2) => {
          return {
            id: attendee2.id,
            name: attendee2.name,
            email: attendee2.email,
            createdAt: attendee2.createdAt,
            checkedInAt: attendee2.checkIn?.createdAt ?? null
          };
        })
      });
    }
  );
}

export {
  getEventAttendees
};
