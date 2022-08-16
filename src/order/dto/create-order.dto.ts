import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional } from "class-validator";

export class CreateOrderDto {
    ticker: string;
    buy: 'long' | 'short';
    startDate: Date;
    startPrice: number;
    volume: number;
    endDate: Date;
    endPrice: number;
    commission: number;
    channel: number;
}

export class QueryArg {
    ticker: string | string[];
    limit?: string
    offset?: string
}
export class BasicFiltersDTO {
    @IsArray()
    @IsOptional()
    @IsNumber({}, { each: true })
    @Type(() => Number)
    id?: Array<number>;
    ticker?: Array<string>
  }