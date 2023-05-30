### 卖座网

#### 前端：FS 文件夹

- 技术栈： React、Redux、React Router、antd-mobile、axios、

- 项目中性能优化：
- 优化首屏加载速度：对首页的 tab 切换做了组件懒加载，切换到该 tab 才动态加载该组件，重新切换，已经加载过的不需要再次加载，直接从缓存中读取

```js
const NowPlaying = React.lazy(() => import('./films/NowPlaying'));
const SoonComing = React.lazy(() => import('./films/SoonComing'));
<Suspense fallback={<div>loading中</div>}>
  <Route path="/films/nowplaying" component={NowPlaying} />
  <Route path="/films/sooncoming" component={SoonComing} />
</Suspense>;
```

- 优化图片加载速度：对首页的图片进行了懒加载，只加载可视区内的图片，而不是一次性加载所有图片

```js
import LazyLoad from 'react-lazy-load';
<LazyLoad>
  <Image
    src={item.poster}
    lazy
    width={80}
    height={100}
    onClick={(e) => {
      e.stopPropagation();
      setVisible(true);
    }}
  />
</LazyLoad>;
```

#### 后端：CMS 文件夹

- 技术栈： Express、multer、Mongoose

- mongod.exe --dbpath="F:\gky\gky-mongodb\大作业\DB\db" // 在安装 mongodb 的 bin 目录下，指定数据库存放目录，不可关闭，关闭即表示关闭服务器，每次都要先使用这条命令打开 mongodb 数据库，dbpath 是 db 目录

#### 数据库：DB/db

- 技术栈：MongoDB

#### 数据：DB/dbdata

- 1.把数据导入 MongoDB Compass 软件：若是数组对象格式，添加`--jsonArray`;若是对象格式，不需要。

```bash
mongoimport --host localhost --port 27017 --db gyk_mongodb --collection citys --file "F:\gky\gky-mongodb\大作业\DB\dbdata\city.json" --jsonArray
mongoimport --host localhost --port 27017 --db gyk_mongodb --collection users --file "F:\gky\gky-mongodb\大作业\DB\dbdata\user.json"
```

- 2.运行服务器：进入 CMS/myapp

```bash
cd CMS/myapp
npm start
```

- 3.运行前端页面：进入 FS/myapp

```bash
cd FS/myapp
npm start
```

#### 发布到阿里云服务器：登录 ssh 服务器

##### 实例密码：CQLcql0527.

##### ECS 密码：CQL520

- 前端

  - `npm run build` 之后，把包放到 web/maizuo 下
  - 配置反向代理是在 nginx.conf 下配置才生效

- 后端

  - 把修改的文件增量替换到 node 下面，cd 到 node，sh build.sh 再 sh docker_run.sh
  - 服务器上查看日志 docker logs -f --tail 100 express

- 数据库
  - 在本地连接上公网的数据库，导入数据即可
