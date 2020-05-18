import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    NgZone,
    OnInit
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'ng-changeDetection';
  constructor(
    private changeDR: ChangeDetectorRef,
    private nzZone: NgZone,
  ) {
  }

  ngOnInit(): void {
    // this.nzZone.runOutsideAngular(() => {
    let count = 0;
    setInterval(() => {
      this.title += count;
      count++;
      // this.changeDR.markForCheck();
    }, 1000);
    // });
  }

  onClick(): void {
    // 在ChangeDetectionStrategy.OnPush策略下，异步调整this.title的值，
    // 同时不使用this.changeDR.markForCheck()标记需要更新，当用户点击“更新”按钮，
    // 触发当前的onClick()事件时，也会触发angular的变更检测机制，让界面更新
  }

}
