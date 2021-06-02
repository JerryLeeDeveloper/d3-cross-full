# Training Project 01
### The goal of Training Project 01
設計一個一元二次方程式(AX<sup>2</sup>+BX+C)的座標線
#### 畫面組成:
- 三個Input
- 一個座標軸
- 一元二次方程式座標線


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Getting Started
## Installation
### Installing Angular CLI
```
npm install -g @angular/cli
```

### Installing D3.js
```
npm install --save d3
```
## Creating Project
```
ng new projname
```

# Implement Tasks
## Inputs
1. 畫出三個輸入框
2. 給定輸入框預設值0
3. 修改輸入框的值 `NgModule`
4. 驗證輸入框的值為數字(-100~+100)
    - 實做一個Number驗證器(驗證值是否為數字且在指定範圍內）
    - 使用響應式表單在輸入框上加入Number驗證器
    - 當輸入框驗證失敗時在畫面上顯示提示訊息`*ngIf=...`
    
## Coordinate Axis
1. 畫出一個十字座標軸
2. 畫出一個直線
3. 根據固定參數產生的方程式畫出一條線


## Interaction
1. 將輸入框元件內的值傳遞到座標軸元件裡
2. 當輸入框值變更時座標元件能街收到‵ngOnChanges‵
3. 動態更新資料集重繪座標軸 (座標y軸範圍要能隨著邊更）
4. 動態更新資料集重繪線
5. 當輸入框的值都驗證過時畫面上才會有線
    1. 將輸入框的驗正結果傳進座標軸元件裡
    2. 當驗證成功時畫線
    3. 驗證結果從成功變失敗時移除畫面上的線 (將線的資料集改為空陣列)



# Commands
## Angular CLI
### Create Component
``` 
ng generate component name
```
### Test App
```
ng serve --port=8888
```
## Git
- `git add .` 添加當前工作目錄到index
- `git commit -m "some comments"` 生成一個commit
- `git commit -a -m "some comments"`先add再commit (但add的文件只限於git有追蹤到的檔案 Modified/Deleted, 新增的檔案不會作用）
- `git push origin master`推送到遠端分支