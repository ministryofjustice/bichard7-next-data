export default (cjsCode: string): boolean =>
  cjsCode != null && cjsCode.length > 3 && cjsCode.length < 9
