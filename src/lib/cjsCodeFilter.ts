export default (cjsCode: string | null): boolean =>
  cjsCode != null && cjsCode.trim().length > 3 && cjsCode.trim().length < 9
