Component({
  mixins: [],
  data: {
    categories: [],
    series_column: [
      {
        data: [0],
      },
      {
        data: [0],
      }
    ],
    xAxis: {
      tickCount: 2,
    },
    yAxis: {
    },
    tooltip: {
    }
  },
  props: {},
  didMount() {
    setTimeout(() => {
      this.setData({
        categories: ['Jon Nicoll1', 'Jon Nicoll2', 'Jon Nicoll3', 'Jon Nicoll4', 'Jon Nicoll5',
                      'Jon Nicoll6', 'Jon Nicoll7', 'Jon Nicoll8', 'Jon Nicoll9', 'Jon Nicoll10'
        ],
        series_column: [
          {
            data: [10, 200, 200, 100, 79,90, 100, 260, 300, 400],
          },
          {
            data: [5, 100, 100, 60, 30,40, 60, 100, 150, 200],
          }
        ],
        xAxis: {
          tickCount: 10,
          label: {
            rotate: Math.PI / 3,
            textAlign: 'start',
            textBaseline: 'middle'
          }
        },
        yAxis: {
        },
        tooltip: {
          showCrosshairs: true,
          showItemMarker: false,
          crosshairsStyle: {
            stroke: '#7B74FD',
            lineWidth: 1
          },
        }
      })
    }, 1000)
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    _onTooltipChange() {
    }
  },
});
