import { HandGestureService } from './hand-gesture/hand-gesture.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canva!: ElementRef<HTMLCanvasElement>;
  @ViewChild('home') home!: ElementRef<HTMLAnchorElement>;
  @ViewChild('about') about!: ElementRef<HTMLAnchorElement>;

  opened$ = this._recognizer.swipe$.pipe(
    filter(value => value === 'left' || value === 'right'),
    map(value => value === 'right')
  );

  selection$ = this._recognizer.gesture$.pipe(
    filter(value => value === 'one' || value === 'two'),
    map(value => (value === 'one' ? 'home': 'about'))
  );

  constructor(private _recognizer: HandGestureService,
    private _router: Router) {}

  get stream() {
    return this._recognizer.stream;
  }

  ngAfterViewInit() {
    this._recognizer.initialize(
      this.canva.nativeElement,
      this.video.nativeElement
    )
  }
}
