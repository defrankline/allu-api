import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, Pagination } from '@app/common';
import { UpdateResult } from 'typeorm';
import { CurrentUser } from '../../../auth/src/current-user.decorator';
import { User } from '../../../auth/src/user/user';
import { CreateShareTypeRequest, UpdateShareTypeRequest } from '../dto';
import { ShareTypeService } from './share-type.service';
import { ShareType } from './share-type';

@Controller('api/v1/share-service/share-types')
export class ShareTypeController {
  private readonly logger = new Logger(ShareTypeController.name);

  constructor(private readonly shareTypeService: ShareTypeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createShareTypeDto: CreateShareTypeRequest,
    @CurrentUser() user: User,
  ) {
    const companySet = !!createShareTypeDto.company;
    if (!companySet) {
      createShareTypeDto.company = user.company.id;
    }
    this.logger.log(
      user.company.name + ': Create Share Type ',
      createShareTypeDto,
    );
    return this.shareTypeService.create(createShareTypeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Query('keyword') keyword: string): Promise<Array<ShareType>> {
    return this.shareTypeService.findAll(keyword);
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard)
  getPaginated(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('keyword') keyword: string,
  ): Promise<Pagination<ShareType>> {
    return this.shareTypeService.paginate(
      {
        page: page,
        size: size,
      },
      keyword,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.shareTypeService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShareTypeDto: UpdateShareTypeRequest,
    @CurrentUser() user: User,
  ): Promise<UpdateResult> {
    const companySet = !!updateShareTypeDto.company;
    if (!companySet) {
      updateShareTypeDto.company = user.company.id;
    }
    return this.shareTypeService.update(id, updateShareTypeDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.shareTypeService.delete(id);
  }
}
