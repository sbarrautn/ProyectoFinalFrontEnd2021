<template>
  <footer class="footer px-4">
    <div class=" text-center">
            <!-- © {{year}} -->
              <p 
              class="font-weight-bold ml-1" 
              target="_blank"
              style="color:#5d71e2 "
              
              >
               Apoyo en el Proceso de Enseñanza-Aprendizaje de los Sistemas del Cuerpo Humano 
              </p>
              
            </div>
    <b-row align-v="center" class="justify-content-lg-between">
      <b-col lg="6">
        <b-nav align="center" class="nav-footer justify-content-lg-end">
         <!--
          <b-nav-item href="https://www.creative-tim.com"  target="_blank">
            Creative Tim
          </b-nav-item>
          <b-nav-item href="https://www.creative-tim.com/presentation" target="_blank">
           About Us
          </b-nav-item>
          <b-nav-item href="http://blog.creative-tim.com" target="_blank">
            Blog
          </b-nav-item>
          <b-nav-item href="https://www.creative-tim.com/license" target="_blank">
            License
          </b-nav-item>
          -->
        </b-nav>
      </b-col>
    </b-row>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
