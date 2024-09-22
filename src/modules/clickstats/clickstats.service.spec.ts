import { Test, TestingModule } from '@nestjs/testing';
import { ClickstatsService } from './clickstats.service';

describe('ClickstatsService', () => {
  let service: ClickstatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClickstatsService],
    }).compile();

    service = module.get<ClickstatsService>(ClickstatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
