# angular中的更新策略

## 通过zone.js检测更新
- 在通常情况下，angular能够做到被更改的数据及时更新到界面上，是因为他通过zone.js来实现对属性值改变的检测，从而及时更新到界面上。
- zone.js能够捕捉到的值的改变有3种情况：setTimeout等timer事件、click,mousemove等events事件和xhr请求.都是异步操作；
- 因为是通过zone.js实现属性值的变更检测，因此可通过依赖注入NgZone,调用NgZone.runOutsideAngular()方法，避免被zone.js检测。但也因此，当值改变时，无法及时更新到模板中，除非在里面调用NgZone实例的其它方法,比如NgZone.run()；
- zone.js只是官方提供的一种便捷方式，能够及时捕捉到属性值的改变，并将它更新到界面上。但它并不属于angular变更检测的核心。事实上，一个angular项目完全可以移除zone.js，只是这样的话需要开发者在需要的地方，手动触发angular的变更检测机制，让数据更新到界面上。

## 调整更新策略为ChangeDetectionStrategy.OnPush
- 将组件的更新策略调整为ChangeDetectionStrategy.OnPush后，angular将失去对大部分情况属性值改变的响应，比如setTimeout等异步事件、xhr请求等事件。这种时候如果需要将更改后的数据更新到界面上，需要依赖注入ChangeDetectorRef类型实例，调用ChangeDetectorRef.markForCheck()方法才行。
- 但是OnPush策略下，也并不是所有情况都需要调用ChangeDetectorRef.markForCheck()方法才能将数据更新到界面上。当@Input()的值改变时会自动触发angular的检测机制。当模板中的一些事件(比如click)被触发时，也会触发angular的检测机制。
