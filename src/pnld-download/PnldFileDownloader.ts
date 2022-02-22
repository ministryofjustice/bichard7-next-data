/* eslint-disable no-await-in-loop */
import puppeteer from "puppeteer"
import * as fs from "fs"
import { PnldConfig } from "./config"

export type PnldFile = {
  date: Date
  link?: puppeteer.ElementHandle | null
  fileName?: string
}

export default class PnldFileDownloader {
  browser: puppeteer.Browser

  page: puppeteer.Page

  tmpDir: string

  options: PnldConfig

  constructor(options: PnldConfig) {
    this.options = options
  }

  async setupPuppeteer(): Promise<void> {
    this.browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: this.options.headless,
      args: [
        // Required for Docker version of Puppeteer
        "--no-sandbox",
        "--disable-setuid-sandbox",
        // This will write shared memory files into /tmp instead of /dev/shm,
        // because Docker’s default for /dev/shm is 64MB
        "--disable-dev-shm-usage",
        "--window-size=1024x768"
      ]
    })
    this.page = await this.browser.newPage()
    await this.page.setViewport({
      width: 1024,
      height: 768
    })
  }

  async closePuppeteer(): Promise<void> {
    this.browser.close()
  }

  async setupDownloadFolder(): Promise<void> {
    this.tmpDir = `${this.options.tmpDir}/pnld`
    if (fs.existsSync(this.tmpDir)) {
      await fs.promises.rm(this.tmpDir, { recursive: true })
    }
    await fs.promises.mkdir(this.tmpDir, { recursive: true })
    if (this.page) {
      // eslint-disable-next-line no-underscore-dangle
      await (this.page as any)._client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: this.tmpDir
      })
    }
  }

  async login(): Promise<void> {
    await this.page.goto(this.options.loginUrl)
    await this.page.waitForSelector("button#next")
    await this.page.type("#logonIdentifier", this.options.username)
    await this.page.type("#password", this.options.password)
    return Promise.all([this.page.click("button#next"), this.page.waitForNavigation()]).then(() => {})
  }

  async waitForZipCount(zipCount: number, timeout: number): Promise<void> {
    for (let i = 0; i < timeout; i++) {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((res) => setTimeout(res, 1000))
      const dir = await fs.promises.readdir(this.tmpDir)
      const count = dir.reduce((acc, filename) => {
        if (filename.endsWith(".zip")) {
          return acc + 1
        }
        return acc
      }, 0)
      if (count === zipCount) {
        return
      }
    }
  }

  async downloadFile(link: puppeteer.ElementHandle): Promise<string> {
    const before = await fs.promises.readdir(this.tmpDir)
    await link.click()
    await this.waitForZipCount(before.length + 1, 60)
    const after = await fs.promises.readdir(this.tmpDir)
    const fileName = after.filter((f) => !before.includes(f))[0]
    return `${this.tmpDir}/${fileName}`
  }

  async getFileLinks(): Promise<PnldFile[]> {
    const links: PnldFile[] = []
    await this.page.goto(this.options.downloadUrl)
    // The links are in a 4 x 4 table with the date in the 1st column and the link in the second
    const columnCount = 4
    const rowCount = 4
    const tds = await this.page.$$(".table-responsive table tbody td")
    for (let i = 0; i < rowCount * columnCount; i += columnCount) {
      const date = await tds[i].evaluate((node) => (node as any).innerText)
      const link = await tds[i + 1].$("a")
      links.push({ date: new Date(date), link })
    }
    return links
  }

  async downloadArchives(): Promise<PnldFile[]> {
    await this.setupDownloadFolder()
    const fileLinks = await this.getFileLinks()

    // eslint-disable-next-line no-restricted-syntax
    for (const fileLink of fileLinks) {
      if (fileLink.link) {
        fileLink.fileName = await this.downloadFile(fileLink.link)
      }
    }
    return fileLinks
  }

  async download(): Promise<PnldFile[]> {
    await this.setupPuppeteer()
    await this.login()
    const fileList = await this.downloadArchives()
    await this.closePuppeteer()
    return fileList.map((f) => ({ date: f.date, fileName: f.fileName }))
  }
}
