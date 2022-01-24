<template>
  <router-view :courseId="courseId" :setCourseId="setCurrentCourseId"></router-view>
</template>

<script>
export default {
  data() {
    return {
      courseId: 0//TODO: Make id to be saved on LocalStorage
    }
  },
  methods: {
    setCurrentCourseId(id) {
      this.courseId = id;
    }
  }
}
</script>
