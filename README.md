### 仿卖座网

#### 前端：FS 文件夹

- 技术栈： React、Redux、React Router、antd-mobile、axios、

#### 后端：CMS 文件夹

- 技术栈： Express、multer

#### 数据库：DB 文件夹

- 技术栈：MongoDB

#### 数据：DB 文件夹

### 1.把数据导入 MongoDB Compass 软件：若是数组对象格式，添加`--jsonArray`;若是对象格式，不需要。

```bash
mongoimport --host localhost --port 27017 --db gyk_mongodb --collection films --file "F:\gky\gky-mongodb\大作业\DB\dbdata\film.json" --jsonArray
```

### 2.运行服务器：进入 CMS/myapp

```bash
cd CMS/myapp
npm start
```

### 3.运行前端页面：进入 FS/myapp

```bash
cd FS/myapp
npm start
```
