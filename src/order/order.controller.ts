import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { BasicFiltersDTO, CreateOrderDto, QueryArg } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { query } from 'express';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findByParams(
    @Query('id') id?: string | string[],
    @Query() query?: QueryArg,
     ) {
    if (id) {
      return this.orderService.findByIds(id);
    } else {
      return this.orderService.findAll(query);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
