<template lang="html">
  <transition name="n-modal">
    <div class="modal-mask modal-wrapper">

      <div class="modal-container">
        <slot></slot>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  created () {
    const ROOT = this
    window.addEventListener('keyup', function (event) {
      if (event.key === 'Escape' || event.keyCode === 27) {
        ROOT.$emit('close')
      }
    })
  }
}
</script>
