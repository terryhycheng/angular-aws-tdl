import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToDo } from 'src/app/models/to-do.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() toDo!: ToDo;
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onUpdate() {
    this.update.emit({ id: this.toDo.id, status: this.toDo.isFinished });
  }

  onDelete() {
    this.delete.emit(this.toDo.id);
  }
}
