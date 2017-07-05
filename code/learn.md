

### 浏览器渲染执行流程 

1.HTML代码转化成DOM
2.CSS代码转化成CSSOM（CSS Object Model）
3.结合DOM和CSSOM，生成一棵渲染树（包含每个节点的视觉信息）
4.生成布局（layout），即将所有渲染树的所有节点进行平面合成
5.将布局绘制（paint）在屏幕上

style写在body前后的区别：

* 写在head标签中利于浏览器逐步渲染（resources downloading->CSSOM+DOM->RenderTree(composite)->Layout->paint）。具体渲染过程请参考
http://blog.csdn.net/wozaixia...

* 写在body标签后由于浏览器以逐行方式对html文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题