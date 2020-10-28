import { Component, OnInit } from '@angular/core';
import { DialogConfig } from '../../utils/dialog-config';
import { DialogRef } from '../../utils/dialog-ref';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  content: string;
  constructor(public config: DialogConfig<string>, public dialog: DialogRef) {}

  ngOnInit(): void {
    if (this.config.data) {
      this.content = this.config.data;
    }
  }

  onClose(): void {
    this.dialog.close();
  }
}
