import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLoaderComponent } from '@components/page-loader/page-loader.component';

@Component({
  imports: [PageLoaderComponent, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
