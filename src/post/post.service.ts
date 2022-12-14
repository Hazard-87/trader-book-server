import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}

  create(dto: CreatePostDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const res = await this.repository.findOne(+id);
    if (!res) {
      throw new NotFoundException('Статья не найдена');
    }
    return res;
  }

  async update(id: number, dto: UpdatePostDto) {
    const res = await this.repository.update(id, dto);
    if (!res.affected) {
      throw new NotFoundException('Статья не найдена');
    }
    return res;
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
