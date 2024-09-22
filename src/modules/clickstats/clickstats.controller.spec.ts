import { Test, TestingModule } from '@nestjs/testing';
import { ClickstatsController } from './clickstats.controller';

describe('ClickstatsController', () => {
  let controller: ClickstatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClickstatsController],
    }).compile();

    controller = module.get<ClickstatsController>(ClickstatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
