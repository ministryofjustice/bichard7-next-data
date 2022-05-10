import { XMLParser } from "fast-xml-parser"
import { OffenceCode } from "../types/OffenceCode"
import valueToBoolean from "../lib/valueToBoolean"

export type PnldOffenceParsedXml = {
  documents: {
    document: {
      codes: {
        cjsoffencecode: string
        recordableonpncindicator: {
          code: string
        }
        notifiabletoho: {
          code: string
        }
        hoclassification: string
      }
      libra: {
        cjsoffencecategory: {
          code: string
        }
      }
      english: {
        title: string
      }
    }
  }
}

export default async (xmlData: string): Promise<OffenceCode> => {
  const options = {
    ignoreAttributes: false,
    removeNSPrefix: true
  }

  const parser = new XMLParser(options)
  const parsedObj = parser.parse(xmlData) as PnldOffenceParsedXml
  const doc = parsedObj.documents.document

  return {
    cjsCode: doc.codes?.cjsoffencecode,
    description: doc.codes?.cjsoffencecode,
    offenceTitle: doc.english?.title,
    recordableOnPnc: valueToBoolean(doc.codes?.recordableonpncindicator?.code),
    notifiableToHo: valueToBoolean(doc.codes?.notifiabletoho?.code),
    homeOfficeClassification: doc.codes?.hoclassification,
    offenceCategory: doc.libra.cjsoffencecategory?.code,
    resultHalfLifeHours: null
  }
}
