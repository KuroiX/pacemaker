<script setup lang="ts">
import {BeatManager} from "@/assets/BeatManager";
import {computed, ref} from "vue";
import {BeatContentManager} from "@/assets/BeatContentManager";
import {useTheme} from "vuetify";

const props = defineProps<{
  path: number[] | undefined,
  computeOptions: "Beat" | "Time",
}>()

const beatManager = BeatManager.getInstance()
const contentManager = BeatContentManager.getInstance()
const theme = useTheme()

const formatterFunctions = {
  Beat: formatBeat,
  Time: formatTime,
}

function formatBeat(value: any) {
  return value ? value.toFixed(0) : value
}

function formatTime(value: any) {
  const timeInMin = value / 60

  return Math.round(timeInMin / 0.5) * 0.5
}

const computeOptions = {
  Beat: computeBeat,
  Time: computeTime,
}

function computeBeat(): {name: string, data: {x: string | number, y: number | null}[]}[] | undefined {
  if (props.path == undefined) return

  const data: {x: string | number, y: number | null}[] = []
  //const data2: {x: string | number, y: number | null}[] = []
  //const data3: {x: string | number, y: number | null}[] = []

  for (let i = 0; i < props.path.length; i++) {
    //console.log("index " + i + " value " + props.path[i])
    const beat = beatManager.getNode(props.path[i].toString())

    let intensity = null
    //let gameplay = null
    //let narrative = null

    if (beat.data.contentId != -1) {
      const content = contentManager.getContent(beat.data.contentId)

      intensity = (content.intensity + content.narrativeIntensity) * 0.5
      //gameplay = content.intensity
      //narrative = content.narrativeIntensity
    }

    data.push({x: i, y: intensity})
    //data2.push({x: i, y: gameplay})
    //data3.push({x: i, y: narrative})
  }

  return [{name: 'computed intensity', data: data}] //, {name: 'gameplay intensity', data: data2}, {name: 'narrative intensity', data: data3}]
}

function computeTime(): {name: string, data: {x: string | number, y: number | null}[]}[] | undefined {
  if (props.path == undefined) return

  const data: {x: string | number, y: number | null}[] = []
  //const data2: {x: string | number, y: number | null}[] = []
  //const data3: {x: string | number, y: number | null}[] = []

  let currentTime = 0

  for (let i = 0; i < props.path.length; i++) {
    //console.log("index " + i + " value " + props.path[i])
    const beat = beatManager.getNode(props.path[i].toString())

    if (beat.data.contentId == -1) {
      data.push({x: currentTime, y: null})
      currentTime += 30
      continue
    }

    const content = contentManager.getContent(beat.data.contentId)

    const min = content.expectedPlaytime ? parseInt(content.expectedPlaytime.substring(0, 2)) : 0
    const sec = content.expectedPlaytime ? parseInt(content.expectedPlaytime.substring(3, 5)) : 30

    const upperBound = min * 2 + Math.floor(sec/30)
    const intensity = (content.intensity + content.narrativeIntensity) * 0.5
    for (let j = 1; j <= upperBound; j++) {
      data.push({x: currentTime, y: intensity})
      //data2.push({x: currentTime, y: content.intensity})
      //data3.push({x: currentTime, y: content.narrativeIntensity})
      currentTime += 30
    }
  }

  return [{name: 'computed intensity', data: data}] // {name: 'gameplay intensity', data: data2}, {name: 'narrative intensity', data: data3}]
}

const xAxisTitle = {
  Beat: "Beat",
  Time: "Time in minutes"
}

const options = computed(() => {
  return {
    chart: {
      id: 'vuechart-example',
      background: theme.current.value.colors['surface'],
    },
    theme: {
      mode: theme.global.current.value.dark ? 'dark' : 'light',
      palette: 'palette1',
      monochrome: {
        enabled: true,
        color: "#001678",
        shadeTo: 'light',
        shadeIntensity: 0.65
      },
    },
    title: {
      text: 'Intensity',
      align: 'left',
      style: {
        fontFamily: "Roboto",
      }
    },
    xaxis: {
      type: 'numeric',
      title: {
        text: xAxisTitle[props.computeOptions],
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: '12px',
          fontFamily: 'Roboto',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-title',
        },
      },
      labels: {
        rotate: 0,
        text: '',
        rotateAlways: false,
        formatter: formatterFunctions[props.computeOptions],
      },
      decimalsInFloat: 0
    },
    stroke: {
      width: [5, 5, 4], // array for subsequent data series
      curve: 'smooth', // 'straight' enables missing data points
      lineCap: 'round',
    },
    markers: {
      showNullDataPoints: false,
    },
    /*
    annotations: {
      points: [{
        x: 2,
        y: 64,
        marker: {
          strokeColor: theme.current.value.colors['primary'],
        },
      }]
    },
    tooltip: {
      x: {
        show: true,
      },
      y: {
        formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
          return value
        }
      },
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        return '<v-card class="arrow_box" title="help">' +
          '<v-card-text>' + series[seriesIndex][dataPointIndex] + '</v-card-text>' +
          '</v-card>'
      }
      */
  }
})

const series = computed(computeOptions[props.computeOptions])

</script>

<template>
  <apexchart width="100%" type="line" :options="options" :series="series"></apexchart>
</template>

<style scoped>

</style>
