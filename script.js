const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const formValues = [];

const formFeilds = {
  username: null,
  email: null,
  password: null,
  password2: null,
};

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
    formFeilds.email = true;
  } else {
    showError(input, "Email is not valid");
    formFeilds.email = false;
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value === "") {
      showError(input, `${getFieldName(input)} is required`);
      formFeilds.username = false;
    } else {
      showSuccess(input);
      formFeilds.username = true;
    }
  });
}

function checkPasswordMatch(password1, password2) {
  if (password1.value !== password2.value) {
    showError(password2, "Passwords do not match");
    formFeilds.password2 = false;
  } else {
    formFeilds.password2 = true;
  }
}

function checkLength(input, min, max) {
  if (input.value.length <= min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    formFeilds[input] = false;
  } else if (input.value.length >= max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
    formFeilds[input] = false;
  } else {
    showSuccess(input);
    formFeilds[input] = true;
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);

  if (password2.value !== "") {
    checkPasswordMatch(password, password2);
  }

  const formData = {
    username: username.value,
    email: email.value,
    password: password.value,
    confirmPassword: password2.value,
  };

  let hasError = false;


  Object.values(formFeilds).map((e) => {
    if (e === false) {
      hasError = true;
    }
  });
    if (hasError) return;
    formValues.push(formData);


  form.reset();


  const usernameClass = username.parentElement;
  const emailClass = email.parentElement;
  const passwordClass = password.parentElement;
  const password2Class = password2.parentElement;


  usernameClass.className = "form-control";
  emailClass.className = "form-control";
  passwordClass.className = "form-control";
  password2Class.className = "form-control";

  alert("Form Submited successfully");

  console.log("Form Inputs: ", formValues);

});
