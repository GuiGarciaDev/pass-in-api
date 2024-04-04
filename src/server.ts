import fastify from "fastify"

import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"

import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod"
import { createEvent } from "./routes/create-event.js"
import { registerForEvent } from "./routes/register-for-event.js"
import { getEvent } from "./routes/get-events.js"
import { getAttendeeBadge } from "./routes/get-attendee-badge.js"
import { checkIn } from "./routes/check-in.js"
import { getEventAttendees } from "./routes/get-event-attendees.js"
import { errorHandler } from "./error-handler.js"
import fastifyCors from "@fastify/cors"

// Challenge: implement nanoId for attendee id in badge route

const PORT = 3333

const app = fastify()

app.register(fastifyCors, {
  origin: "*",
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description:
        "Documentação da API criada durante o evento NLW Unite da Rocketseat no mês de Abril de 2024.",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler)

app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
  console.log(`Server running on port: ${PORT}`)
})
