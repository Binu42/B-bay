function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    // request has been made but server not responded with status code not under 2xx
    errorMsg = error.response.data;
    console.error("error message", errorMsg);
    // for cloudinary image upload
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    // request has made but server not responded
    errorMsg = error.request;
    console.error("error request", errorMsg);
  } else {
    // something else has happened which causes error
    errorMsg = error.message;
    console.error("error message", errorMsg);
  }
  displayError(errorMsg)
}

export default catchErrors;