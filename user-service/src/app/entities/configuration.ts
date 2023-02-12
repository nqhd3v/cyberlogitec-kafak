import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TerminalInfo } from './terminal-info';

@Entity({ name: 'terminal_configuration' })
export class TerminalConfiguration {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public group: string;

  @Column()
  item: string;

  @Column({
    name: 'description',
    default: '',
  })
  description: string;

  @Column()
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
