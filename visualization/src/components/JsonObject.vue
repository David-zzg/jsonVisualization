<template >
  <div class="object">
    <h4>{{config.name}}</h4>
    <Card >
      <slot></slot>
    </Card>
  </div>
</template>
<script>
export default {
  props:['config'],
}
</script>

