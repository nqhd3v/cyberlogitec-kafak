import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TerminalCarrierType } from './carrier-type';
import { TerminalConfiguration } from './configuration';
import { TerminalOperationType } from './operation-type';

@Entity({ name: 'terminal_info' })
export class TerminalInfo {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  local_port: string;

  @Column()
  type: string;

  @Column()
  displayname: string;

  @Column()
  company_1: string;

  @Column()
  company_2: string;

  @Column()
  global_terminal_operation_1: string;

  @Column({
    name: 'global_terminal_operation_2',
    default: '',
  })
  global_terminal_operation_2: string;

  @Column({
    name: 'timezone',
    default: 'Asia/Seoul',
  })
  timezone: string;

  @Column({
    name: 'address_1',
    default: '',
  })
  address_1: string;

  @Column({
    name: 'address_2',
    default: '',
  })
  address_2: string;

  @Column({
    name: 'lat',
    default: '',
  })
  lat: string;
  @Column({
    name: 'long',
    default: '',
  })
  long: string;

  @Column({
    name: 'tel',
    default: '',
  })
  tel: string;

  @Column({
    name: 'fax',
    default: '',
  })
  fax: string;

  @Column({
    name: 'email',
    default: '',
  })
  email: string;

  @Column({
    name: 'bg_color',
    default: '#FFFFFF',
  })
  bg_color: string;

  @Column({
    name: 'font_color',
    default: '#000000',
  })
  font_color: string;

  // Images
  @Column({
    name: 'img_logo_only',
    default: '',
  })
  img_logo_only: string;

  @Column({
    name: 'img_name_only',
    default: '',
  })
  img_name_only: string;

  @Column({
    name: 'img_name_and_logo',
    default: '',
  })
  img_name_and_logo: string;

  @OneToMany(() => TerminalConfiguration, (t) => t.terminal, {
    onDelete: 'CASCADE',
  })
  configurations: TerminalConfiguration[];

  @OneToMany(() => TerminalOperationType, (t) => t.terminal, {
    onDelete: 'CASCADE',
  })
  operation_types: TerminalOperationType[];

  @OneToMany(() => TerminalCarrierType, (t) => t.terminal, {
    onDelete: 'CASCADE',
  })
  carrier_types: TerminalCarrierType[];
}
