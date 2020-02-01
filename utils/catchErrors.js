function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    // request has been made but server not responded with status code not under 2xx
    errorMsg = error.response.data;
    console.error(errorMsg);
    // for cloudinary image upload
    if (error.response.data.error) {
      errorMsg = error.response.data.error;
    }
  } else if (error.request) {
    // request has made but server not responded
    errorMsg = error.request.data;
    console.error(errorMsg);
  } else {
    // something else has happened which causes error
    errorMsg = error.message;
    console.error(errorMsg);
  }
  displayError(errorMsg)
}

export default catchErrors;