import solid from "solid-start/vite";
import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import presetWind from "@unocss/preset-wind";
import presetUno from "@unocss/preset-uno";

export default defineConfig({
  plugins: [
    solid(),
    UnoCSS({
      presets: [
        presetWind(),
        presetUno(),
      ],
    }),
  ],
});
