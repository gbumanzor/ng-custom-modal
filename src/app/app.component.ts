import { Component } from '@angular/core';
import { ExampleComponent } from './bay-modal/components/example/example.component';
import { ModalService } from './bay-modal/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngx-custom-modal';

  constructor(private modalService: ModalService) {}

  openModal(): void {
    const ref = this.modalService.open<ExampleComponent, string>(
      ExampleComponent,
      {
        data: 'I am a dynamic component inside a modal',
        height: '300px',
        width: '200px',
      }
    );

    ref.afterClosed.subscribe((result) => console.log(result));
  }
}
