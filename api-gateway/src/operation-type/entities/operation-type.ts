import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TerminalInfo } from '../../terminal/entities/terminal-info';

@Entity({ name: 'terminal_operation_type' })
export class TerminalOperationType {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  prefix: string;

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

  @ManyToOne(() => TerminalInfo)
  @JoinColumn()
  terminal: TerminalInfo;
}
