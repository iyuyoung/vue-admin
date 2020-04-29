<template>
  <div class="card">
    <div class="card-header">用户统计</div>
    <div class="card-body text">
      <ve-line :data="userData"></ve-line>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  props: {
    userData: {
      
    }
  }
}
</script>