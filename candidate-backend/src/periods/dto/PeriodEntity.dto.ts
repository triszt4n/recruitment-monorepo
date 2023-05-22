import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator'

export class PeriodEntity {
  @IsInt()
  @Min(1)
  id: number

  @IsNotEmpty()
  @MinLength(3)
  title: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean

  constructor(partial: Partial<PeriodEntity>) {
    Object.assign(this, partial)
  }
}
