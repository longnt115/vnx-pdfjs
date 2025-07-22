import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.js';

// Set worker path
if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
}

class VNX_PDFJS {
  constructor(options = {}) {
    this.container = options.container || document.body;
    this.scale = options.scale || 1.5;
  }

  async loadDocument(url) {
    try {
      this.pdfDoc = await pdfjsLib.getDocument(url).promise;
      console.log('PDF loaded');
      return this.pdfDoc;
    } catch (error) {
      console.error('Error loading PDF:', error);
      throw error;
    }
  }

  async renderPage(pageNum, container) {
    if (!this.pdfDoc) {
      throw new Error('PDF document not loaded. Call loadDocument first.');
    }

    const page = await this.pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: this.scale });
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Append canvas to container
    container = container || this.container;
    container.appendChild(canvas);
    
    // Render PDF page into canvas context
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    
    await page.render(renderContext).promise;
    return { page, viewport };
  }
}

// Export for browser
if (typeof window !== 'undefined') {
  window.VNX_PDFJS = VNX_PDFJS;
}

export default VNX_PDFJS;
