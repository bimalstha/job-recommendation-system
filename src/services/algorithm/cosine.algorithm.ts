export const cosineValue = async (seekerData, jobDescriptionData) => {
  try {
    const textArrayFromSeeker = seekerData.split(" ").sort();
    const textArrayFromJobDescription = jobDescriptionData.split(" ").sort();
    const textArray = textArrayFromSeeker
      .concat(textArrayFromJobDescription)
      .sort();
    //removing dublicate item
    const uniqueArrayContent = textArray.filter((item, index) => {
      return textArray.indexOf(item) === index;
    });
    //making every item 0
    uniqueArrayContent.forEach((item, index) => {
      return (uniqueArrayContent[index] = 0);
    });
    console.log("uniqueArrayContent", uniqueArrayContent);
    //making every item 1
    textArrayFromSeeker.forEach((item, index) => {
      return (textArrayFromSeeker[index] = 1);
    });
    console.log("textArrayFromSeeker", textArrayFromSeeker);
    //making every item 1
    textArrayFromJobDescription.forEach((item, index) => {
      return (textArrayFromJobDescription[index] = 1);
    });
    console.log("textArrayFromJobDescription", textArrayFromJobDescription);
    const finalBaseArray1 = await addArrays(
      textArrayFromSeeker,
      uniqueArrayContent
    );
    console.log("finalBaseArray1", finalBaseArray1);
    const finalBaseArray2 = await addArrays(
      textArrayFromJobDescription,
      uniqueArrayContent
    );
    console.log("finalBaseArray2", finalBaseArray2);
    const Product = await dotProduct(finalBaseArray1, finalBaseArray2);
    console.log("Product", Product);
    const rootSquare1 = await squareRoot(finalBaseArray1);
    console.log("rootSquare1", rootSquare1);
    const rootSquare2 = await squareRoot(finalBaseArray2);
    console.log("rootSquare2", rootSquare2);
    return (Product / (rootSquare1 * rootSquare2)) * 100;
  } catch (error) {
    throw error;
  }
};

const addArrays = async (array1, array2) => {
  try {
    // Determine the longer array
    let maxLength = Math.max(array1.length, array2.length);
    let result = [];

    for (let i = 0; i < maxLength; i++) {
      // Check if the element exists in the first array
      let val1 = array1[i] !== undefined ? array1[i] : 0;
      // Check if the element exists in the second array
      let val2 = array2[i] !== undefined ? array2[i] : 0;

      // Add the corresponding elements or add what exists
      result.push(val1 + val2);
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const dotProduct = async (array1, array2) => {
  try {
    let sum = 0;
    for (let i = 0; i < array1.length; i++) {
      sum = sum + array1[i] * array2[i];
    }
    return sum;
  } catch (error) {
    throw error;
  }
};

const squareRoot = async (array) => {
  try {
    console.log("array", array);
    const sum = array.reduce((a, b) => {
      return a + b;
    });
    console.log("sum", sum);
    console.log("sqrt", Math.sqrt(sum));
    return Math.sqrt(sum);
  } catch (error) {
    throw error;
  }
};
// const a = "bimal is resma";
// const b = "resma is bimal and there is nothing i can do about it";

// const c = cosineValue(a, b);
// console.log(c);

export default { cosineValue };
