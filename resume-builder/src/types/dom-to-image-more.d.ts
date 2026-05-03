declare module 'dom-to-image-more' {
  interface Options {
    quality?: number
    pixelRatio?: number
    bgcolor?: string
    style?: Record<string, string>
    filter?: (node: Node) => boolean
    width?: number
    height?: number
    cacheBust?: boolean
    imagePlaceholder?: string
  }

  interface DomToImage {
    toPng(node: Node, options?: Options): Promise<string>
    toJpeg(node: Node, options?: Options): Promise<string>
    toSvg(node: Node, options?: Options): Promise<string>
    toBlob(node: Node, options?: Options): Promise<Blob>
    toPixelData(node: Node, options?: Options): Promise<Uint8ClampedArray>
  }

  const domtoimage: DomToImage
  export default domtoimage
}