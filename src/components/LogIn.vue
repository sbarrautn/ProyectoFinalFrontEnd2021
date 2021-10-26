<!--
&lt;!&ndash;<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>&ndash;&gt;
&lt;!&ndash;<script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>&ndash;&gt;
&lt;!&ndash;&#45;&#45;&#45;&#45; Include the above in your HEAD tag &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;

<!DOCTYPE html>
<html>
<head>
  <title>Login Page</title>

  &lt;!&ndash;Bootsrap 4 CDN&ndash;&gt;
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

  &lt;!&ndash;Fontawesome CDN&ndash;&gt;
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

  &lt;!&ndash;Custom styles&ndash;&gt;
&lt;!&ndash;  <link rel="stylesheet" type="text/css" href="styles.css">&ndash;&gt;
</head>
<body>
<div class="container">
  <div class="d-flex justify-content-center h-100">
    <div class="card">
      <div class="card-header">
        <h3>Sign In</h3>
        <div class="d-flex justify-content-end social_icon">
          <span><i class="fab fa-facebook-square"></i></span>
          <span><i class="fab fa-google-plus-square"></i></span>
          <span><i class="fab fa-twitter-square"></i></span>
        </div>
      </div>
      <div class="card-body">
        <form>
          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="username">

          </div>
          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <input type="password" class="form-control" placeholder="password">
          </div>
          <div class="row align-items-center remember">
            <input type="checkbox">Remember Me
          </div>
          <div class="form-group">
            <input type="submit" value="Login" class="btn float-right login_btn">
          </div>
        </form>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-center links">
          Don't have an account?<a href="#">Sign Up</a>
        </div>
        <div class="d-flex justify-content-center">
          <a href="#">Forgot your password?</a>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>


<style>

@import url('https://fonts.googleapis.com/css?family=Numans');

html,body{
  background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  font-family: 'Numans', sans-serif;
}

.container{
  height: 100%;
  align-content: center;
}

.card{
  height: 370px;
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: rgba(0,0,0,0.5) !important;
}

.social_icon span{
  font-size: 60px;
  margin-left: 10px;
  color: #FFC312;
}

.social_icon span:hover{
  color: white;
  cursor: pointer;
}

.card-header h3{
  color: white;
}

.social_icon{
  position: absolute;
  right: 20px;
  top: -45px;
}

.input-group-prepend span{
  width: 50px;
  background-color: #FFC312;
  color: black;
  border:0 !important;
}

input:focus{
  outline: 0 0 0 0  !important;
  box-shadow: 0 0 0 0 !important;

}

.remember{
  color: white;
}

.remember input
{
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.login_btn{
  color: black;
  background-color: #FFC312;
  width: 100px;
}

.login_btn:hover{
  color: black;
  background-color: white;
}

.links{
  color: white;
}

.links a{
  margin-left: 4px;
}
</style>
-->


<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <b-form>
        <h3>email:</h3>
        <b-form-input autofocus v-model="email"></b-form-input>
        <h3>password:</h3>
        <b-form-input v-model="password"></b-form-input>
        <b-button v-on:click="attemptLogin">Enviar</b-button>
      </b-form>
    </div>
    <div>
      {{ info }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Login',
      info: null,
      email: '',
      password: ''
    }
  },
  methods: {
    attemptLogin: function () {
      console.log("I'm logging in!!!")
      console.log(this.email)
      console.log(this.password)

      //testing with 3rd party api
      /*axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => (this.info = response))*/

      //testing GET request with ping action
      /*axios
        .get('http://api.proyecto.test/api/ping')
        .then(response => (this.info = response))*/

      //testing POST request with login endpoint
      axios.post('http://api.proyecto.test/api/login', {
        email: this.email,
        password: this.password
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  align-content: center;
}

.hello div {
  width: 50%;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #c40505;
}
</style>
