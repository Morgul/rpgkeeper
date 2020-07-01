module.exports = {
  entry: "client/components/systems/generic-experiment/GenericSystem/src/App.fsproj",
  outDir: "client/components/systems/generic-experiment/",
  babel: {
    presets: [["@babel/preset-env", { modules: "commonjs" }]],
    sourceMaps: true,
  },
  // The `onCompiled` hook (optional) is raised after each compilation
  onCompiled() {
      console.log("Compilation finished!")
  }
}
