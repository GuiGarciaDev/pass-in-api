import {
  BadRequest
} from "./chunk-3Z2SFYEF.js";
import {
  prisma
} from "./chunk-ERVDTVHJ.js";

// src/routes/register-for-event.ts
import z from "zod";
async function registerForEvent(app) {
  app.withTypeProvider().post(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Register an attendee in one event",
        tags: ["attendees"],
        body: z.object({
          name: z.string().min(4),
          email: z.string().email()
        }),
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {
          201: z.object({
            attendeeId: z.number()
          })
        }
      }
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { name, email } = request.body;
      const attendeeFromEmail = await prisma.attendee.findUnique({
        where: {
          email_eventId: {
            email,
            eventId
          }
        }
      });
      if (attendeeFromEmail !== null) {
        throw new BadRequest("This email is already registered for this event.");
      }
      const [event, amountOfAttendeesForEvent] = await Promise.all([
        // Running this two queries in parallel
        prisma.event.findUnique({
          where: {
            id: eventId
          }
        }),
        prisma.attendee.count({
          where: {
            eventId
          }
        })
      ]);
      if (event?.maximumAttendees && amountOfAttendeesForEvent > event.maximumAttendees) {
        throw new BadRequest(
          "Ops, the maximum number of attendees for this event has been reached."
        );
      }
      const attendee = await prisma.attendee.create({
        data: {
          name,
          email,
          eventId
        }
      });
      return reply.status(201).send({ attendeeId: attendee.id });
    }
  );
}

export {
  registerForEvent
};
