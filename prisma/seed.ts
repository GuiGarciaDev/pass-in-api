import { prisma } from "../src/lib/prisma";

async function seed() {
    await prisma.event.create({
        data: {
            id: "c759ba6e-5275-4cac-bf91-02b784d88198",
            title: "Unite Summit",
            slug: "unite-summid",
            details: "Um evento p/ devs apaixonados por codar!",
            maximumAttendees: 120,
        }
    })
}

seed().then(() => {
    console.log("Database seeded");
    prisma.$disconnect
    
})
