import { PrismaClient } from "@prisma/client/";
import fastify from "fastify";
import z from "zod";

const PORT = 3333

const app = fastify()

const prisma = new PrismaClient()

app.post("/events", async (request, reply) => {
    const bodySchema = z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable()
    })
    const { title, details, maximumAttendees} = bodySchema.parse(request.body)

    const event = await prisma.event.create({
        data: {
            title, 
            details, 
            maximumAttendees,
            slug: "ohmaga"
        }
    })

    reply.send({ eventId: event.id }).code(201)
})

app.listen({ port: PORT }).then(() =>{
    console.log(`Server running on port: ${PORT}`)
})