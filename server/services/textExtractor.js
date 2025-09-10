import mammoth from 'mammoth';

export class TextExtractor {
  /**
   * Extract text from uploaded file buffer
   */
  static async extractText(buffer, mimetype) {
    try {
      switch (mimetype) {
        case 'application/pdf':
          return await this.extractFromPdf(buffer);

        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/msword':
          return await this.extractFromDoc(buffer);

        default:
          throw new Error(`Unsupported file type: ${mimetype}`);
      }
    } catch (error) {
      console.error('Text extraction error:', error);
      throw new Error('Failed to extract text from file');
    }
  }

  /**
   * Extract text from PDF buffer using pdf-parse
   */
  static async extractFromPdf(buffer) {
    try {
      console.log('🔍 Starting PDF text extraction...');

      // Try to import pdf-parse dynamically
      let pdfParse;
      try {
        const pdfParseModule = await import('pdf-parse');
        pdfParse = pdfParseModule.default || pdfParseModule;
        console.log('✅ pdf-parse module loaded successfully');
      } catch (importError) {
        console.warn('⚠️ pdf-parse not available, using basic extraction:', importError.message);
        return this.basicPdfExtraction(buffer);
      }

      console.log('🔍 Extracting text from PDF using pdf-parse...');
      const pdfData = await pdfParse(buffer, {
        max: 0, // No limit on pages
        version: 'default'
      });

      if (pdfData && pdfData.text && pdfData.text.length > 50) {
        console.log(`✅ Successfully extracted ${pdfData.text.length} characters from PDF`);
        return pdfData.text;
      } else {
        console.log('⚠️ PDF extraction yielded insufficient text, trying basic extraction');
        return this.basicPdfExtraction(buffer);
      }
    } catch (error) {
      console.error('❌ PDF extraction error:', error.message);
      console.log('🔄 Falling back to basic extraction');
      return this.basicPdfExtraction(buffer);
    }
  }

  /**
   * Basic PDF text extraction fallback
   */
  static basicPdfExtraction(buffer) {
    try {
      const bufferString = buffer.toString('utf8');
      let extractedText = bufferString.replace(/[^\x20-\x7E\n]/g, ' ');
      extractedText = extractedText.replace(/\s+/g, ' ').trim();

      if (extractedText.length < 50) {
        throw new Error('Could not extract sufficient text from PDF. Please ensure the PDF contains readable text and is not image-based.');
      }

      return extractedText;
    } catch (error) {
      throw new Error('Failed to extract text from PDF. Please try a different file format or ensure the PDF contains text (not just images).');
    }
  }

  /**
   * Extract text from DOC/DOCX buffer
   */
  static async extractFromDoc(buffer) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  }

  /**
   * Clean and normalize extracted text
   */
  static cleanText(text) {
    return text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
      .trim();
  }
}
