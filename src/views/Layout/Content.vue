<template>
  <div class="content">
    <FadeTransition :duration="200" mode="out-in">
      <!-- your content here -->
      <router-view :courseId="this.courseId"></router-view>
    </FadeTransition>
  </div>
</template>
<script>
import { FadeTransition } from 'vue2-transitions';
export default {
  props: ['courseId'],
  components: {
    FadeTransition
  }
};
</script>
<style></style>
