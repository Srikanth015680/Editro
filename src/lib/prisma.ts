
// import { PrismaClient } from '../generated/prisma/client';
// declare global {
//     namespace globalThis {
//         var prismadb: PrismaClient;
//     }
// }

// const prisma = globalThis.prismadb || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prismadb = prisma;

// export default prisma;














import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;