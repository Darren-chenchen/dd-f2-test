Component({
  mixins: [],
   data: {
    categories: [],
    series: [{data: [0]}],
    xAxis: {
    },
    yAxis: {
    },
    legend: {
      
    },
    tooltip: {
    },
  },
  props: {},
  didMount() {
    setTimeout(() => {
      this.setData({
        categories: [
          '2017-06-05', '2017-06-06', '2017-06-07', '2017-06-08', '2017-06-09', '2017-06-10',              '2017-06-11', '2017-06-12', '2017-06-13', '2017-06-14', '2017-06-15', '2017-06-16',              '2017-06-17', '2017-06-18', '2017-06-19', '2017-06-20', '2017-06-21', '2017-06-22'],
        series: [
          {
            type: 'legend1',
            style: 'dash',
            point: {
              size: 1,
              stroke: '#F00',
              lineWidth: 1,
            },
            data: [116, 129, 135, 86, 73, 85, 73, 68, 92, 130, 245, 139, 115, 111, 309, 206, 137, 128],
          },
          {
            type: 'legend2',
            color: '#93F',
            style: 'smooth',
            data: [60, 55, 57, 111, 83, 77, 88, 69, 64, 111, 131, 107, 113, 92, 91, 66, 107, 106, 72],
          },
        ],
        xAxis: {
          tickCount: 3,
        },
        yAxis: {
          tickCount: 3,
        },
        legend: {
          position: 'top',
          offsetY: 5
        },
        tooltip: {
          showTitle: true,
          showCrosshairs: true,
        },
      })
    }, 1000)
  },
  didUpdate() {},
  didUnmount() {},
  methods: {},
});

