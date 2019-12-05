import { uglify } from "rollup-plugin-uglify";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

const outputFile = process.env.NODE_ENV === "ES" ? "index.js" : "dist/element-connections.js";
const outputFormat = process.env.NODE_ENV === "ES" ? "es" : "iife";

const config = [
    {
        input: "src/index.ts",
        external: Object.keys(pkg.peerDependencies || {}),
        plugins: [
            typescript({
                typescript: require("typescript")
            })
        ],
        output: [
            {
                file: outputFile,
                format: outputFormat,
                banner: "/* eslint-disable */"
            }
        ]
    }
];

if (process.env.NODE_ENV !== "ES") {
    config[0].plugins.push(uglify())
}

export default config;
