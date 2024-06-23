const generateVerificationCode = (length: number = 6): string => {
    let randomString = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * 10);
      randomString += randomIndex;
    }
  
    return randomString;
  };
  
  export default generateVerificationCode;
  