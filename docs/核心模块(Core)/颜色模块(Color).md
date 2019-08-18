# 构造器（Constructor）
	Clock( autoStart )
	autoStart — 用来初始化autoStart属性，表示是否自动启动时钟。默认是true。

# Properties
* .autoStart = ( autoStart !== undefined ) ? autoStart : true 如果设置为true，当第一次更新被调用时，自动启动时钟(默认为true)。
* .startTime 当时钟运行时，该属性用来保存时钟的起始时间。 
	这个是从1 January 1970 00:00:00 UTC开始的毫秒数。
* .oldTime 当时钟运行时，该属性用来保存最近一次更新的时间。 
	这个是从1 January 1970 00:00:00 UTC开始的毫秒数。
* .elapsedTime 当时钟运行时，该属性用来保存起始时间和最近一次更新时间之间的时间间隔。 
	这个是从1 January 1970 00:00:00 UTC开始的毫秒数。
* .running = false 这个属性跟踪时钟是否正在运行。


方法（Methods）
# .start ()
	启动时钟。
# .stop ()
	停止时钟。
# .getElapsedTime ()
	获取时钟已运行时间。
# .getDelta ()
	获取时钟增量，也就是该函数本次调用和上次调用之间的时间间隔。在调用该函数的时候会自动调用start()方法








