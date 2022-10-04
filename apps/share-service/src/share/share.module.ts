import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareService } from './share.service';
import { Share } from './share';
import { ShareController } from './share.controller';
import { RmqModule } from '@app/common';
import { TRANSACTION_SERVICE } from '../constants/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Share]),
    RmqModule.register({
      name: TRANSACTION_SERVICE,
    }),
  ],
  controllers: [ShareController],
  providers: [ShareService],
  exports: [ShareService],
})
export class ShareModule {}
