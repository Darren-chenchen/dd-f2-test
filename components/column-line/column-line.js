import F2 from '@antv/my-f2';
import methods from '../mixins/methods';
import util from '../util';
import _ from '/libs/lodash'

const legendItems =  [{
        name: '个人分数',
        marker: 'square',
        fill: '#7B74FD',
        checked: true
      }, {
        name: '平均分数',
        marker: function marker(x, y, r, ctx) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = ctx.fillStyle;
          ctx.moveTo(x - r - 3, y);
          ctx.lineTo(x + r + 3, y);
          ctx.stroke();
          ctx.arc(x, y, r, 0, Math.PI * 2, false);
          ctx.fill();
        },
        fill: '#FE75B0',
        checked: true
      }]

function render(chart, props, width, height) {
  const { categories, series, xAxis, yAxis, tooltip, legend, adjust, coord } = props;
  

  chart.clear();

  let data = [];
  if (series.length === 2) {
    series[0].data.forEach((item, i) => {
      data = data.concat([
        {
          name: categories[i],
          score: item,
          avgScore: series[1].data[i],
        }
      ])
    })
  }
  
  chart.source(data);

  if(coord) {
    chart.coord(coord);
  }
  if(xAxis) {
    if(xAxis.htAlign) {
      if(!coord || !coord.transposed) {
        xAxis.label = util.label;
      }
      else {
        yAxis.label = util.label;
      }
    }
    chart.scale('name', util.scale(xAxis));
    chart.axis('name', util.axis(xAxis));
  }
  
  if(yAxis) {
    chart.scale('avgScore', true);
    chart.axis('avgScore', true); /// false,不展示右边的y坐标
    chart.scale('score', util.scale(yAxis));
    chart.axis('score', util.axis(yAxis));
  }

  if (tooltip) {
    chart.tooltip({
      showCrosshairs: tooltip.showCrosshairs,
      showTitle: tooltip.showTitle,
      showItemMarker: tooltip.showItemMarker,
      background: tooltip.background,
      crosshairsStyle: tooltip.crosshairsStyle,
      tooltipMarkerStyle: tooltip.tooltipMarkerStyle,
      onShow(ev) {
        if (props.onTooltipShow) {
          props.onTooltipShow(ev)
        }
      }
    });

    setTimeout(() => {
      console.log(tooltip.def_item, 666)
      if (tooltip.def_item) {
        // 默认展示 tooltip
        var item = tooltip.def_item; // 要展示 tooltip 的数据
        var point = chart.getPosition(item); // 获取该数据的画布坐标
        console.log(point)
        chart.showTooltip(point); 
      } 
    }, 500)
  } else {
    chart.tooltip(false)
  }

  
  chart.legend({
    custom: true,
    items: legendItems
  });

  chart.interval().position('name*score').color('#7B74FD').adjust(adjust);
  chart.line().position('name*avgScore').color('#FE75B0').adjust(adjust);

  chart.changeSize(width, height);
}

Component({
  mixins: [methods],
  props: {
    categories: [],
    series: [],
    xAxis: {
      tickCount: 3,
    },
    yAxis: {
      tickCount: 3,
    },
    tooltip: false,
    legend: false,
    adjust: 'stack',
  },
  didMount() {
    my.call('getStartupParams', {}, (result) => {
      util.tracert('column', result.appId, result.url);
    });

    const id = `am-mc-column-line-${this.$id}`;
    const ctx = this.ctx = my.createCanvasContext(id);
    const canvas = this.canvas = new F2.Renderer(ctx);

    const pixelRatio = this.pixelRatio = my.getSystemInfoSync().pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    my.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec(res => {
        if(!res || !res.length || !res[0]) {
          return;
        }
        const { width, height } = res[0];

        this.setData({
          width: width * pixelRatio,
          height: height * pixelRatio,
        }, () => {
          const { padding, appendPadding } = this.props;

          this.chart = new F2.Chart({
            el: canvas,
            width,
            height,
            padding,
            appendPadding,
          });

          render(this.chart, this.props, width, height);
        });
      });
  },
  didUpdate() {
    const id = `am-mc-column-line-${this.$id}`;
    const pixelRatio = this.pixelRatio;

    my.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec(res => {
        if(!res || !res.length || !res[0]) {
          return;
        }
        const { width, height } = res[0];
        if(this.data.width !== width * pixelRatio || this.data.height !== height * pixelRatio) {
          this.ctx.scale(pixelRatio, pixelRatio);
        }

        this.setData({
          width: width * pixelRatio,
          height: height * pixelRatio,
        }, () => {
          render(this.chart, this.props, width, height);
        });
      });
  },
});
