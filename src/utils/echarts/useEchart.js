import * as echarts from "echarts";
import { debounce } from "lodash";

export default (el, options) => {
  const echartInstance = echarts.init(el, "default", { devicePixelRatio: 2 });

  if (options) {
    echartInstance.setOption(options);
  }

  const setOptions = (options) => {
    echartInstance.setOption(options);
  };
  const updateSize = () => {
    echartInstance.resize();
  }

  window.addEventListener(
    "resize",
    debounce(() => {
      echartInstance.resize();
    }, 100)
  );

  return {
    echartInstance,
    setOptions,
    updateSize,
  }
}
