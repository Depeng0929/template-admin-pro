import { computed } from 'vue'
import type { EChartsOption } from 'echarts'

interface optionsFn {
  (isDark: boolean): EChartsOption
}

export function useChartOption(sourceOption: optionsFn) {
  const chartOption = computed<EChartsOption>(() => {
    return sourceOption(isDark.value)
  })
  return {
    chartOption,
  }
}
