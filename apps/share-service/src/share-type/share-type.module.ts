import { Module } from '@nestjs/common';
import { ShareTypeService } from './share-type.service';
import { ShareTypeController } from './share-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareType } from './share-type';
import { AuthModule } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([ShareType]), AuthModule],
  controllers: [ShareTypeController],
  providers: [ShareTypeService],
  exports: [ShareTypeService],
})
export class ShareTypeModule {}
