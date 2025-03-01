declare module 'mammoth' {
  interface ExtractResult {
    value: string;
    messages: any[];
  }

  interface ExtractOptions {
    arrayBuffer: Buffer | ArrayBuffer;
  }

  export function extractRawText(options: ExtractOptions): Promise<ExtractResult>;
}
