class ErrorHandler extends Error {
    readonly statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  
      // Ensure the correct prototype is used for extending built-in Error
      Object.setPrototypeOf(this, ErrorHandler.prototype);
    }
  }
  
  export default ErrorHandler;
  