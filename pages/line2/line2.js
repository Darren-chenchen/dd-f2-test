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
            categories: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        series: [
          {
            type: 'legend1',
            style: 'smooth',
            color: '#7B74FD',
            point: {
              size: 0,
              stroke: '#F00',
              lineWidth: 1,
            },
            data: [116, 129, 135, 86, 73, 85, 73, 68, 92, 130, 245, 139, 115, 111, 309, 206, 137, 128, 200, 100, 120, 90, 10, 100],
          },
          {
            type: 'legend2',
            color: '#FFD700',
            style: 'smooth',
            data: [60, 55, 57, 111, 83, 77, 88, 69, 64, 111, 131, 107, 113, 92, 91, 66, 107, 106, 72, 200, 20, 40, 50, 90],
          },
        ],
        xAxis: {
          tickCount: 2,
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
          background: {
            fill: '#FFF'
          },
          def_item: {key: '02:00', value: 135}
        },
      })
    }, 1000)
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    _onTooltipChange(e) {
      let item = e.items[0]
      item.value = ''

      let hour = item.title.substring(0, 2)
      let index = this.data.categories.findIndex((xvalue) => {
        return xvalue === item.title
      })
      let amt = 0
      let cv = 0
      if (index != -1) {
        amt = this.data.series[0].data[index] || 0
        cv = this.data.series[1].data[index] || 0
      }

      this.setData({
        currentCv: cv,
        currentAmt: amt,
        currentTimerRangeStr: `${item.title}-${hour}:59`
      })
    }
  },
});

