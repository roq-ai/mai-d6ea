import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { connectionValidationSchema } from 'validationSchema/connections';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.connection
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getConnectionById();
    case 'PUT':
      return updateConnectionById();
    case 'DELETE':
      return deleteConnectionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getConnectionById() {
    const data = await prisma.connection.findFirst(convertQueryToPrismaUtil(req.query, 'connection'));
    return res.status(200).json(data);
  }

  async function updateConnectionById() {
    await connectionValidationSchema.validate(req.body);
    const data = await prisma.connection.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteConnectionById() {
    const data = await prisma.connection.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
