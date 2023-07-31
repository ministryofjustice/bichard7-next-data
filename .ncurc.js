// google packages are here because upgrading them
// currently breaks their compatibility
// affects: src/requested-changes-download/sheetsClient.ts
const pinned = ["google-auth-library"]
const ignored = ["googleapis"]

module.exports = {
  target: (package) => {
    if (pinned.some((p) => new RegExp(`^${p}$`).test(package))) {
      const res = "minor"
      console.log(` ${package} is pinned to ${res} upgrades only (.ncurc.js)`)
      return res
    }
    return "latest"
  },

  filterResults: (package) => {
    if (ignored.some((p) => new RegExp(`^${p}$`).test(package))) {
      return
    }
    return true
  }
}
