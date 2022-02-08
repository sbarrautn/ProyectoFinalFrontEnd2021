<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Tareas Sin Asignar"
                      type="gradient-red"
                      :sub-title="getUnassignedTask() || '0'"
                      icon="ni ni-watch-time"
                      class="mb-4">

            <!-- <template slot="footer">
              <span class="text-success mr-2">3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template> -->
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Tareas Asignadas"
                      type="gradient-green"
                      :sub-title="getAssignedTask() || '0'"
                      icon="ni ni-ruler-pencil"
                      class="mb-4">

            <!-- <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template> -->
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Estudiantes"
                      type="gradient-orange"
                      :sub-title="students.length || '0'"
                      icon="ni ni-single-02"
                      class="mb-4">

            <!-- <template slot="footer">
              <span class="text-danger mr-2">5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template> -->
          </stats-card>

        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Cursos"
                      type="gradient-info"
                      :sub-title="courses.length || '0'"
                      icon="ni ni-hat-3"
                      class="mb-4">

            <!-- <template slot="footer">
              <span class="text-success mr-2">54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template> -->
          </stats-card>
        </b-col>
      </b-row>
    </base-header>

    <!--Charts-->
    <b-container fluid class="mt--7">
      <b-row>
        <b-col xl="12" class="mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">  </h6>
                <h5 class="h3 text-white mb-0">Interacción de los estudiantes</h5>
              </b-col>
              <b-col>
              </b-col>
            </b-row>
            <line-chart
              :height="350"
              ref="bigChart"
              :chart-data="bigLineChart.chartData"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </card>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';

  // Components
  import BaseProgress from '@/components/BaseProgress';
  import StatsCard from '@/components/Cards/StatsCard';

  // Tables
  import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import PageVisitsTable from './Dashboard/PageVisitsTable';
  import router from "../routes/router";

  export default {
    components: {
      LineChart,
      BarChart,
      BaseProgress,
      StatsCard,
      PageVisitsTable,
      SocialTrafficTable
    },
    data() {
      return {
        tasks: [],
        students: [],
        courses:[],
        bigLineChart: {
          allData: [
            [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [
              {
                label: 'Interacciones',
                data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
              }
            ],
            labels: ['Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sept', 'Oct'],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          },
          extraOptions: chartConfigs.blueChartOptions
        }
      };
    },
    methods: {
      initBigChart(index) {
        let chartData = {
          datasets: [
            {
              label: 'Interacciones',
              data: this.bigLineChart.allData[index]
            }
          ],
          labels: ['Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sept', 'Oct'],
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      },
      getAssignedTask(){
        const assignedTasks = this.tasks.filter(task => !!task.group)
        return assignedTasks.length || 0
      },
      getUnassignedTask(){
        const unassignedTasks = this.tasks.filter(task => !task.group)
        console.log(unassignedTasks);
        return unassignedTasks.length || 0
      }
    },
    beforeCreate() {
      let session = localStorage.getItem('session');
      if (!session) {
        session = sessionStorage.getItem('session');
      }
      if (!session) {
        router.push({ name: 'login' });
      }
    },
    mounted() {
      this.initBigChart(0);
      this.$db.collection('tasks').get().then(tasks => {
        console.log(tasks)
        this.tasks = tasks;
      })
      this.$db.collection('students').get().then(students => {
        console.log(students)
        this.students = students;
      })
      this.$db.collection('courses').get().then(courses => {
        console.log(courses)
        this.courses = courses;
      })
    }
  };
</script>
<style>
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;
}
</style>
