import { Component, OnInit, OnChanges, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sd-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, OnChanges {
  @Input() config: any;
  @Input() data: any;
  @Output() refresh = new EventEmitter();

  BMapClass: any = null;
  MapInstance: any = null;
  currentMapData: any = {};
  cacheRectangle: any = [];
  cachePolygonAll: any = [];
  rootEl = 'allMap';
  defaultPoint: any = {
    longitude: 116.403694,
    latitude: 39.916042
  };
  defaultZoom: any = 11;
  clickPoint: any = null;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    // 第一次进入，地图异步并没有加载成功
    if (changes.data.firstChange) {
      // 设置默认type，将会在地图加载成功后，加载
      if (!this.config.defaultType) {
        // init data
        this.currentMapData.area = changes.data.currentValue.area;
        this.currentMapData.mapData = changes.data.currentValue.mapData;
        this.setDataConfig(changes.data.currentValue.type, '');
      }
      return;
    }

    // 1. 点击marker，跳转下一个层次，调用refresh，从外界主动获取数据
    // 2. 组件外，主动修改data数据
    // 3. 地图缩放，改变zoom，调用refresh，从外界主动获取数据
    if (!changes.data.firstChange) {
      // init data
      this.currentMapData.area = changes.data.currentValue.area;
      this.currentMapData.mapData = changes.data.currentValue.mapData;

      // 针对“组件外“操作，传递的数据类型和当前类型不等，不是refresh获取数据
      if (changes.data.currentValue.type !== this.currentMapData.config.type) {
        this.setDataConfig(changes.data.currentValue.type, '');
      }

      // 根据当前数据currentMapData，渲染数据
      this.render();
    }
  }

  ngOnInit() {
    // $this
    const $this = this;

    const ak = this.config.ak;

    this.load(ak).then(() => {
      // 脚本加载成功后，初始化地图信息
      $this.initBMapClass();
      $this.initBMapInstance();
      $this.initBMapEnvent();

      // 地图加载成功后，根据默认类型拉取数据
      if (this.config.defaultType) {
        this.setDataConfig(this.config.defaultType, '');
        this.refreshMap();
      } else {
        // 根据当前数据currentMapData，渲染数据
        this.render();
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    // BMapClass
    const BMap = this.BMapClass;
    // MapInstance
    const map = this.MapInstance;

    // center point
    let point = this.clickPoint;
    if (!point) {
      point = new BMap.Point(this.defaultPoint.longitude, this.defaultPoint.latitude);
    }
    this.clickPoint = null;
    map.centerAndZoom(point, this.currentMapData.config.zoom);

    // 自动收集坐标、自动收集区域位置
    const promises = this.collectGeographicInformation();

    // 收集搜集数据
    Promise.all(promises).then(values => {
      // 初始化数据
      this.addMarker();
    }).catch(reason => {
      console.log(reason);
    });
  }

  load(ak: string): Promise<any> {
    const Map_URL = '//api.map.baidu.com/api?v=2.0&ak=' + ak + '&callback=JSONP_CALLBACK';
    const p = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.setAttribute('src', Map_URL);
      script.async = true;
      script.onload = function () {
        script.parentNode.removeChild(script);
      };
      window['JSONP_CALLBACK'] = function (json) {
        resolve(json);
      };

      document.head.appendChild(script);
    });

    return p;
  }

  initBMapClass() {
    // 从api中获取BMap类
    const BMap = (<any>window)['BMap'];
    this.BMapClass = BMap;
  }

  initBMapInstance() {
    // 类
    const BMap = this.BMapClass;

    // 创建Map实例
    const map = new BMap.Map(this.rootEl, {
      enableMapClick: false,
      minZoom: 10
    });
    this.MapInstance = map;
  }

  initBMapEnvent() {
    // BMapClass
    const BMap = this.BMapClass;
    // MapInstance
    const map = this.MapInstance;

    // $this
    const $this = this;

    // 初始化地图
    // 第一个参数, 设置中心点坐标，可以使用中文或英文
    // 第二个参数, 设置地图级别, 级别为0 ~ 19, 数字越大，越详细
    const point = new BMap.Point(this.defaultPoint.longitude, this.defaultPoint.latitude);
    map.centerAndZoom(point, this.defaultZoom);
    // map.centerAndZoom("北京", 11);
    // map.centerAndZoom("Hongkong", 11);

    // 利用鼠标滚轮控制大小
    map.enableScrollWheelZoom(true);

    // 监听地图级别缩放事件，显示不同级别的数据
    map.addEventListener('zoomend', function () {
      // 获取地图缩放级别
      const zoomLevel = map.getZoom();
      // 根据缩放来显示对应内容
      if ($this.currentMapData.config.zoom !== zoomLevel) {
        $this.setDataConfig('', zoomLevel);
        // 获取新数据，刷新地图
        $this.refreshMap();
      }
    });

    // 监听地图移动,根据视野动态加载
    map.addEventListener('moveend', function () {
      // 获取地图缩放级别
      const zoomLevel = map.getZoom();
      // // 根据缩放来显示对应内容
      // $this.config.dataConfig.forEach(dataItem => {
      //   if (zoomLevel >= dataItem.zoomRange[0] && zoomLevel <= dataItem.zoomRange[1]) {
      //       // currentDataConfig
      //       $this.currentMapDataConfig = dataItem;
      //       $this.refresh.emit(dataItem.type);
      //   }
      // });
    });
  }

  refreshMap() {
    this.refresh.emit(this.currentMapData.config.type);
  }

  /**
   * 设置不同类型的marker: circle, rectangle
   */
  addMarker() {
    // MapInstance
    const map = this.MapInstance;

    // 当前要显示数据层的配置信息
    const curConf = this.currentMapData.config;
    const mapData = this.currentMapData.mapData;
    const areaData = this.currentMapData.area;

    // 初始化数据
    this.cacheRectangle = [];
    this.cachePolygonAll = [];

    // $this
    const $this = this;

    // 清空当前地图显示
    map.clearOverlays();

    // 循环处理展示数据项
    for (let index = 0; index < mapData.length; index++) {
      // itemData
      const itemData = mapData[index];

      // 如果有bound，将会对元素绘制区域
      if (curConf.bound) {
        // 绘画行政边界
        this.setBoundary(itemData, areaData);
      }

      // 设置label
      this.labelFactory(curConf.mode, itemData);
    }

    // 根据视野动态加载
    // this.addViewLabel(this.cacheRectangle);
  }

  labelFactory(mode, itemData) {
    // label
    let label: any;

    // mode
    if (mode === 'circle') {
      label = this.circle(itemData);
    } else if (mode === 'rectangle') {
      label = this.rectangle(itemData);
    }

    return label;
  }

  circle(itemData) {
    // BMapClass
    const BMap = this.BMapClass;
    // MapInstance
    const map = this.MapInstance;

    // 当前要显示数据层的配置信息
    const curConf = this.currentMapData.config;

    // $this
    const $this = this;

    // 设置显示位置
    const point = new BMap.Point(itemData.longitude, itemData.latitude);

    // 自定义label
    const tpl = '<div class="circleContent" data-longitude="' + itemData.longitude + '"' +
      ' data-latitude="' + itemData.latitude + '">' +
      '<p class="name" title="' + itemData.title + '">' + itemData.title + '</p>' +
      '<p class="count"><span>' + itemData.count + '</span>公司</p>' +
      '</div>';

    // label 在此处添加点位位置信息
    const label = new BMap.Label(tpl, {
      position: point,
      offset: new BMap.Size(-42, -42)
    });

    // 设置样式
    label.setStyle({
      width: '80px', // 宽
      height: '80px', // 高度
      border: '0', // 边
      borderRadius: '80px',
      background: '#46ACFF', // 背景颜色
      opacity: 0.9,
      cursor: 'pointer',
      zIndex: 2
    });
    label.setTitle(itemData.title);

    // 当鼠标悬停在label上时显示行政区划边界
    label.addEventListener('mouseover', function () {
      // 修改覆盖物背景颜色
      label.setStyle({
        background: '#E2A76E',
        zIndex: 4
      });

      // 显示区域展示
      if (curConf.bound) {
        $this.polygonAll('show', itemData);
      }
    });

    // 当鼠标离开时在删除边界折线数据
    label.addEventListener('mouseout', function () {
      // 修改覆盖物背景颜色
      label.setStyle({
        background: '#46ACFF',
        zIndex: 2
      });

      // 显示区域展示
      if (curConf.bound) {
        $this.polygonAll('hide', itemData);
      }
    });

    label.addEventListener('click', function () {
      // 点击事件后，将当前配置取下一层类型
      const nextType = curConf.nextType;

      // 设置点击位置
      $this.clickPoint = label.getPosition();

      // 更新为下一层配置为当前配置
      $this.setDataConfig(nextType, '');

      // 获取新数据，刷新地图
      $this.refreshMap();
    });

    // 添加点位
    map.addOverlay(label);

    return label;
  }

  rectangle(itemData) {
    // BMapClass
    const BMap = this.BMapClass;
    // MapInstance
    const map = this.MapInstance;

    // 设置显示位置
    const point = new BMap.Point(itemData.longitude, itemData.latitude);

    // 自定义label样式
    const tpl = '<div class="labelName" data-longitude="' + itemData.longitude + '"' +
      ' data-latitude="' + itemData.latitude + '">' +
      '<span class="name" title="' + itemData.title + '">' + itemData.title + '</span>' +
      '</div>';

    // label 在此处添加点位位置信息
    const label = new BMap.Label(tpl, {
      position: point,
      offset: new BMap.Size(-42, -42)
    });

    // 设置样式
    label.setStyle({
      height: '22px', // 高度
      lineHeight: '22px',
      border: '1px solid #46ACFF', // 边
      borderRadius: '2px',
      background: '#fff', // 背景颜色
      opacity: 0.9,
      cursor: 'pointer',
      zIndex: 2
    });
    label.setTitle(itemData.title);

    // 修改覆盖物背景颜色
    label.addEventListener('mouseover', function () {
      label.setStyle({
        // background: '#E2A76E',
        zIndex: 4
      });
    });

    // 修改覆盖物背景颜色
    label.addEventListener('mouseout', function () {
      label.setStyle({
        background: '#fff',
        zIndex: 2
      });
    });

    label.addEventListener('click', function () { });

    // 添加点位
    map.addOverlay(label);

    // 直接缓存起来
    this.cacheRectangle.push(label);

    return label;
  }

  polygonAll(type, itemData) {
    // name
    let name = itemData.name;
    if (!name) {
      name = itemData.title;
    }

    // operation
    if (type === 'show') {
      this.cachePolygonAll[name].show();
    } else if (type === 'hide') {
      this.cachePolygonAll[name].hide();
    }
  }

  /**
   * 根据地图视野动态加载数据，当数据多时此方法用来提高地图加载性能
   * 本次模拟数据较少，看不出太大效果
   * @param {Object} labels
   */
  addViewLabel(mkr) {
    // MapInstance
    const map = this.MapInstance;

    map.clearOverlays();
    for (let i = 0; i < mkr.length; i++) {
      const result = this.isPointInRect(mkr[i].point, map.getBounds());
      if (result === true) {
        map.addOverlay(mkr[i]);
      } else {
        map.removeOverlay(mkr[i]);
      }
    }
  }

  // 判断地图视野包含哪些点
  isPointInRect(point, bounds) {
    // BMapClass
    const BMap = this.BMapClass;

    // 检查类型是否正确
    if (!(point instanceof BMap.Point) ||
      !(bounds instanceof BMap.Bounds)) {
      return false;
    }

    // 西南脚点
    const sw = bounds.getSouthWest();
    // 东北脚点
    const ne = bounds.getNorthEast();

    return (point.lng >= sw.lng && point.lng <= ne.lng && point.lat >= sw.lat && point.lat <= ne.lat);
  }

  // 根据行政区划绘制边界
  setBoundary(itemData, area) {
    // BMapClass
    const BMap = this.BMapClass;
    // MapInstance
    const map = this.MapInstance;

    // 名字
    let name = itemData.name;
    if (!name) {
      name = itemData.title;
    }

    area = area === undefined ? {} : area;

    // 建立多边形覆盖物
    const ply = new BMap.Polygon(area[name], {
      strokeWeight: 1,
      strokeColor: '#0A77FB',
      fillColor: '#7EB8FC'
    });

    // 默认隐藏
    ply.hide();

    // 添加覆盖物
    map.addOverlay(ply);

    // 缓存区域设置类
    this.cachePolygonAll[name] = ply;
  }

  /**
	 * 自动收集坐标、自动收集区域位置
	 */
  collectGeographicInformation() {
    // 当前要显示数据层的配置信息
    const curConf = this.currentMapData.config;
    const mapData = this.currentMapData.mapData;
    const areaData = this.currentMapData.area === undefined ? {} : this.currentMapData.area;

    // 如果后台传了area数据，就不自动搜集了
    let bound = curConf.bound;
    if (bound && areaData !== undefined && areaData.length > 0) {
      bound = false;
    }

    // promises
    const promises = [];

    // 坐标开启的化，使用LocalSearch自动搜集地理坐标
    if (!curConf.coordinate && !bound) {
      return promises;
    }

    // BMapClass
    const BMap = this.BMapClass;
    // MapInstance
    const map = this.MapInstance;

    // 循环处理
    for (let index = 0; index < mapData.length; index++) {
      // itemData
      const itemData = mapData[index];

      // 名字
      let name = itemData.name;
      if (!name) {
        name = itemData.title;
      }

      // 坐标开启，使用LocalSearch自动搜集地理区域
      if (bound) {
        const p = new Promise((resolve, reject) => {
          // 获取范围
          const bdary = new BMap.Boundary();
          // 获取行政区域, 行政区域的点有多少个
          bdary.get(name, function (rs) {
            const count = rs.boundaries.length;
            if (count > 0) {
              areaData[name] = rs.boundaries[0];
            }

            resolve(areaData[name]);
          });
        });

        // promises
        promises.push(p);
      }

      // 坐标开启，使用LocalSearch自动搜集地理区域
      if (curConf.coordinate) {
        const p = new Promise((resolve, reject) => {

          // 搜集地理位置信息
          const localSearch = new BMap.LocalSearch(map);

          // 根据具体名字查找
          localSearch.search(name);

          // 查找后结果
          localSearch.setSearchCompleteCallback((searchResult) => {
            // keyword
            const keyword = searchResult.keyword;

            // getPoi
            const poi = searchResult.getPoi(0);

            // 设置坐标
            itemData.longitude = poi.point.lng;
            itemData.latitude = poi.point.lat;

            resolve(itemData);
          });
        });

        // promises
        promises.push(p);
      }
    }

    return promises;
  }

  setDataConfig(type, zoom) {
    // 当前要显示数据层的配置信息
    const curConf = this.currentMapData.config;

    // 点击事件后，将当前配置更新为下一层配置
    let curDataConfig;
    for (let index = 0; index < this.config.dataConfig.length; index++) {
      // dataConfig
      const dataConfig = this.config.dataConfig[index];

      if (type) {
        // 满足的配置
        if (dataConfig.type === type) {
          // currentData Config
          curDataConfig = dataConfig;
          break;
        }
      } else {
        // 满足的配置
        if (zoom >= dataConfig.zoomRange[0] && zoom <= dataConfig.zoomRange[1]) {
          // currentData Config
          curDataConfig = dataConfig;
          break;
        }
      }
    }

    // 从当前配置，如果没有nextType, 设置默认type
    if (!curDataConfig) {
      curDataConfig = {
        type: type,
        zoom: curConf.zoom + 1
      };
    }

    this.currentMapData.config = curDataConfig;
  }
}
