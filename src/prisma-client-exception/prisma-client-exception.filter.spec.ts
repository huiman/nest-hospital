import { PrismaClientExceptionFilter } from '../filters/prisma-client-exception.filter';

describe('PrismaClientExceptionFilter', () => {
  it('should be defined', () => {
    expect(new PrismaClientExceptionFilter()).toBeDefined();
  });
});
