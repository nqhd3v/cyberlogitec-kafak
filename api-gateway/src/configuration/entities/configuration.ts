import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TerminalInfo } from '../../terminal/entities/terminal-info';
import {
  ConfigurationGroup,
  ConfigurationValueType,
} from '../configuration.enum';

@Entity({ name: 'terminal_configuration' })
export class TerminalConfiguration {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'group',
    enum: ConfigurationGroup,
  })
  public group: string;

  @Column()
  item: string;

  @Column({
    name: 'description',
    default: '',
  })
  description: string;

  @Column({
    name: 'value_type',
    enum: ConfigurationValueType,
    default: ConfigurationValueType.TEXT,
  })
  value_type: string;

  @Column({
    name: 'value_1',
    default: '',
  })
  value_1: string;

  @Column({
    name: 'value_2',
    default: '',
  })
  value_2: string;

  @ManyToOne(() => TerminalInfo)
  @JoinColumn()
  terminal: TerminalInfo;
}
