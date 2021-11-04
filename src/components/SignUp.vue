<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <b-form>
        <h3>firstName:</h3>
        <b-form-input autofocus v-model="firstName"></b-form-input>
        <h3>lastName:</h3>
        <b-form-input v-model="lastName"></b-form-input>
        <h3>email:</h3>
        <b-form-input v-model="email"></b-form-input>
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
  name: 'SignUp',
  data() {
    return {
      msg: 'SignUp',
      info: null,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    attemptLogin: function () {
      axios.post('http://api.proyecto.test/api/signup', {
        firstName: this.firstName,
        lastName: this.lastName,
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
