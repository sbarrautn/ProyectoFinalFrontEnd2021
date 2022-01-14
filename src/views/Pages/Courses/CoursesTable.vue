<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
         style="min-height: 400px; background-image: url(img/theme/students-in-classroom-792x418.jpg); background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row>
            <b-col lg="12" md="10">
              <h1 class="display-2 text-white">Tus cursos</h1>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <div class="custom-card mr-3 ml-3">
          <card>
            <b-row align-v="center" slot="header">
              <b-col cols="8">
                <h3 class="mb-0">Curso 1</h3>
              </b-col>
              <b-col cols="2">
                <i class="ni ni-bullet-list-67"></i>
              </b-col>
              <b-col cols="2">
                <i class="ni ni-fat-remove"></i>
              </b-col>
            </b-row>

            <b-form @submit.prevent="updateProfile">
              <div class="pl-lg-4">
                <b-row>
                  <b-col lg="12">
                    <img src="img/theme/course-default.png" style="max-width: 200px; padding-right: 15px">
                  </b-col>
                </b-row>
              </div>
            </b-form>
          </card>
        </div>

        <div class="custom-card mr-3 ml-3">
          <card>
            <b-row align-v="center" slot="header">
              <b-col cols="8">
                <h3 class="mb-0">Curso 2</h3>
              </b-col>
              <b-col cols="2">
                <i class="ni ni-bullet-list-67"></i>
              </b-col>
              <b-col cols="2">
                <i class="ni ni-fat-remove"></i>
              </b-col>
            </b-row>

            <b-form @submit.prevent="updateProfile">
              <div class="pl-lg-4">
                <b-row>
                  <b-col lg="12">
                    <img src="img/theme/course-default.png" style="max-width: 200px; padding-right: 15px">
                  </b-col>
                </b-row>
              </div>
            </b-form>
          </card>
        </div>

        <div class="custom-card mr-3 ml-3">
          <a href="#">
            <card>
              <b-row align-v="center" slot="header">
                <b-col cols="8">
                  <h3 class="mb-0">Curso 3</h3>
                </b-col>
                <b-col cols="2">
                  <i class="ni ni-bullet-list-67"></i>
                </b-col>
                <b-col cols="2">
                  <i class="ni ni-fat-remove"></i>
                </b-col>
              </b-row>
              <div class="pl-lg-4">
                <b-row>
                  <b-col lg="12">
                    <img src="img/theme/course-default.png" style="max-width: 200px; padding-right: 15px" alt="course image">
                  </b-col>
                </b-row>
              </div>
            </card>
          </a>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {Table, TableColumn} from "element-ui";
import courses from "../../Tables/coursesData";
import SessionService from "../../../services/SessionService";

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      courses,
      currentPage: 1
    };
  },
  beforeCreate() {
    SessionService.validateSession();
  }
};
</script>
