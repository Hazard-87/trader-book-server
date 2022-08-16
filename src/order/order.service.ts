import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { Brackets, InsertValuesMissingError, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private repository: Repository<OrderEntity>,
  ) {}

  create(dto: CreateOrderDto) {
    return this.repository.save(dto);
  }

  findByIds(id) {
    return this.repository.findByIds(id);
  }

  async findAll(query) {
    const qb = this.repository.createQueryBuilder('orders');
    qb.orderBy('id', 'ASC');
    qb.limit(+query.limit || 2);
    qb.offset(+query.offset || 0);
    qb.orderBy('id', query.order || 'ASC');
    delete query.limit;
    delete query.offset;
    delete query.order;

    const items = [];
    const params = [];
    const keys = Object.keys(query);
    keys.forEach((key) => {
      if (Array.isArray(query[key])) {
        query[key].forEach((item) => {
          items.push({ [key]: item });
        })
      } else {
        params.push({ [key]: query[key] });
      }
    });

    qb.where(params)
    .andWhere(
      new Brackets((qb) => {
        console.log(items)
        items.forEach((item, idx) => {
          if (idx === 0) {
            qb.where(item);
          } else {
            qb.orWhere(item)
          }
        });
      }),
    );

    const [result, total] = await qb.getManyAndCount();

    return {
      result,
      total,
    };
  }

  update(id: number, dto: UpdateOrderDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
