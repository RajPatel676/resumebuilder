/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

// Note: TypeScript interfaces have been removed as they are only used for type checking
// The actual data structures will be validated at runtime where needed

/**
 * Example response type for /api/demo
 * Expected shape: { message: string }
 */

/**
 * Resume analysis request and response types
 * Expected shape for ResumeAnalysisResponse: {
 *   score: number,
 *   feedback: {
 *     formatting: string,
 *     skills: string,
 *     grammar: string,
 *     impact: string,
 *     atsCompatibility: string
 *   },
 *   recommendations: string[],
 *   missingKeywords: string[],
 *   strengths: string[],
 *   extractedText?: string
 * }
 */

/**
 * Expected shape for ResumeUploadError: {
 *   error: string,
 *   message: string
 * }
 */
