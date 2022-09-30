import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UserService', () => {
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    userService = module.get<UserService>(UserService);

    // console.log('💫 seed executing ...');

    await userService.prismaService.user.create({
      data: {
        name: 'john',
        email: 'john@example.com',
      },
    });

    // console.log('💫 seed finished.');
  });

  it('should be defined', async () => {
    expect(userService).toBeDefined();
  });

  it('findOneUser', async () => {
    const expectedResult = {
      id: expect.any(Number),
      name: 'john',
      email: 'john@example.com',
    };

    const actualResult = await userService.findOne({
      email: expectedResult.email,
    });

    expect(expectedResult).toEqual(actualResult);
  });

  afterAll(async () => {
    await userService.prismaService.user.deleteMany();
    await userService.prismaService.$disconnect();
  });
});
