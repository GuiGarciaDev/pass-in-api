import {
  registerForEvent
} from "./chunk-3LNWXRCH.js";
import {
  errorHandler
} from "./chunk-PHNKM77N.js";
import {
  checkIn
} from "./chunk-K2CKNR44.js";
import {
  createEvent
} from "./chunk-LUN7LWCT.js";
import "./chunk-FKJUWZ4X.js";
import {
  getAttendeeBadge
} from "./chunk-JFCYZNL2.js";
import {
  getEventAttendees
} from "./chunk-JONE63ZL.js";
import {
  getEvent
} from "./chunk-HZ6B5C5G.js";
import "./chunk-3Z2SFYEF.js";
import "./chunk-ERVDTVHJ.js";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform
} from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
var PORT = 3333;
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Documenta\xE7\xE3o da API criada durante o evento NLW Unite da Rocketseat no m\xEAs de Abril de 2024.",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
  console.log(`Server running on port: ${PORT}`);
});
