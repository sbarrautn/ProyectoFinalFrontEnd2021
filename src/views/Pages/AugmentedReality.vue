<template>
  <div>
    <!-- Header -->
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
         style="min-height: 400px; background-image: url(img/theme/students-in-classroom-792x418.jpg); background-size: cover; background-position: center top;">
      <b-container fluid style="height: auto">
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center mt-8" >
          <b-row>
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">Visualización de sistemas</h1>
              <p class="text-white mt-0 mb-5">Al escanear el marcador correspondiente usted podrá visualizar los diferentes sistemas que conforman el cuerpo humano, realizar filtrado de los mismos</p>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>
    <!-- Page content -->
    <div class="mt--0 pb-5 container">

           <iframe src="https://wvlhk.csb.app/" width="100%" height="700px" style="margin-right: 0px; margin-left: 0px; margin-top: 0px; margin-bottom:0px;" allow="camera; microphone">
            </iframe>

    </div>
  </div>
</template>
<script>
import router from "../../routes/router";

export default {
  data() {
    return {
    };
  },
  methods: {
    
  }
};
</script>


<style scoped>
   .container{
     /*display: flex;*/
     justify-content: center;
     margin-top: 0,5px;
     margin-left: 0,5px;
     margin-right: 0,5px;
   }
  </style>
