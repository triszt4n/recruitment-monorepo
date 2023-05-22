import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
} from 'class-validator'

const CommunityString = [
  'ac',
  'bss',
  'ha5kfu',
  'lego',
  'kirdev',
  'mgmt',
  'sem',
  'spot',
  'schdesign',
]

export class InviteEntity {
  @IsInt()
  @Min(1)
  id: number

  @IsNotEmpty()
  @IsEmail()
  supposedEmail: string

  @IsNotEmpty()
  supposedLastName: string

  @IsNotEmpty()
  supposedFirstName: string

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(CommunityString)
  communities: string[]

  @IsBoolean()
  @IsOptional()
  isEmailSent: boolean

  constructor(partial: Partial<InviteEntity>) {
    Object.assign(this, partial)
  }
}
