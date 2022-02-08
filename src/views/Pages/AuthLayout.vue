<template>
  <div class="main-content bg-default">
    <notifications></notifications>
    <base-nav
      v-model="showMenu"
      :transparent="true"
      menu-classes="justify-content-end"
      class="navbar-horizontal navbar-main navbar-top navbar-dark"
      expand="lg"
    >
      <div slot="brand" class="navbar-wrapper">
       <!-- <b-navbar-brand to="/">
          <img src="img/brand/white.png"> 
        </b-navbar-brand>  -->
      </div>

     <template>
       <div class="navbar-collapse-header">
         <b-row>

           <b-col cols="6" class="collapse-brand">
             <router-link to="/">
               <img src="">
             </router-link>
           </b-col>
          
           <b-col cols="6" class="collapse-close">
             <button type="button" class="navbar-toggler" @click="showMenu = false">
               <span></span>
               <span></span>
             </button>
           </b-col>
         </b-row>
       </div>
         <b-navbar-nav  class="align-items-lg-center ml-lg-auto">
           <b-nav-item to="/login">
               <i class="ni ni-key-25"></i>
               <span class="nav-link-inner--text">Iniciar Sesión</span>
           </b-nav-item>
           <b-nav-item to="/register">
               <i class="ni ni-circle-08"></i>
               <span class="nav-link-inner--text">Registrarte</span>
           </b-nav-item>
           
       </b-navbar-nav>
     </template>
    </base-nav>

    <div class="main-content">
      <zoom-center-transition
        :duration="pageTransitionDuration"
        mode="out-in"
      >
        <router-view></router-view>
      </zoom-center-transition>
    </div>

    <footer class="py-5" id="footer-main">
      <b-container >
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
      </b-container>
    </footer>
  </div>
</template>
<script>
  import { BaseNav } from '@/components';
  import { ZoomCenterTransition } from 'vue2-transitions';

  export default {
    components: {
      BaseNav,
      ZoomCenterTransition
    },
    props: {
      backgroundColor: {
        type: String,
        default: 'black'
      }
    },
    data() {
      return {
        showMenu: false,
        menuTransitionDuration: 250,
        pageTransitionDuration: 200,
        year: new Date().getFullYear(),
        pageClass: 'login-page'
      };
    },
    computed: {
      title() {
        return `${this.$route.name} Page`;
      }
    },
    methods: {
      toggleNavbar() {
        document.body.classList.toggle('nav-open');
        this.showMenu = !this.showMenu;
      },
      closeMenu() {
        document.body.classList.remove('nav-open');
        this.showMenu = false;
      },
      setBackgroundColor() {
        document.body.classList.add('bg-default');
      },
      removeBackgroundColor() {
        document.body.classList.remove('bg-default');
      },
      updateBackground() {
        if (!this.$route.meta.noBodyBackground) {
          this.setBackgroundColor();
        } else {
          this.removeBackgroundColor()
        }
      }
    },
    beforeDestroy() {
      this.removeBackgroundColor();
    },
    beforeRouteUpdate(to, from, next) {
      // Close the mobile menu first then transition to next page
      if (this.showMenu) {
        this.closeMenu();
        setTimeout(() => {
          next();
        }, this.menuTransitionDuration);
      } else {
        next();
      }
    },
    watch: {
      $route: {
        immediate: true,
        handler: function () {
          this.updateBackground()
        }
      }
    }
  };
</script>
<style lang="scss">
  $scaleSize: 0.8;
  @keyframes zoomIn8 {
    from {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
    100% {
      opacity: 1;
    }
  }

  .main-content .zoomIn {
    animation-name: zoomIn8;
  }

  @keyframes zoomOut8 {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
  }

  .main-content .zoomOut {
    animation-name: zoomOut8;
  }
</style>
