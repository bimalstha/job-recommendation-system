
const recommendedJobs = async (data1, data2) => {
  try {
    const textArray1 = data1.split(" ");
    const textArray2 = data2.split(" ");
    const textArray = textArray1.concat(textArray2);
    const uniqueArrayContent = textArray.filter((item, index) => {
      return textArray.indexOf(item) === index;
    });
    uniqueArrayContent.forEach((item, index) => {
    return  uniqueArrayContent[index] = 0;
    
    });
  } catch (error) {
    throw error;
  }
};



const data = "bimal is computer";
const dataa = "resma is laptop";

recommendedJobs(data, dataa);
