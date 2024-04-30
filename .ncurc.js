// google packages are here because upgrading them
// currently breaks their compatibility
// affects: src/requested-changes-download/sheetsClient.ts

// pinned eslint as peer deps are using older version

const pinned = ["google-auth-library", "eslint"]
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
