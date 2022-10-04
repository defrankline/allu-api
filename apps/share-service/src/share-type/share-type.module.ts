import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareType } from './share-type';
import { ShareTypeService } from './share-type.service';
import { ShareTypeController } from './share-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShareType])],
  controllers: [ShareTypeController],
  providers: [ShareTypeService],
  exports: [ShareTypeService],
})
export class ShareTypeModule {}
