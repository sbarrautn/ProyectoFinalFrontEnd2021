<template>
  <router-view :courseId="courseId" :setCourseId="setCurrentCourseId"></router-view>
</template>

<script>
export default {
  data() {
    return {
      courseId: 1//FIXME: Make id dynamic
    }
  },
  methods: {
    setCurrentCourseId(id) {
      this.courseId = id;
    }
  }
}
</script>
