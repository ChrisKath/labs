<template lang="html">
  <transition name="n-modal">
    <div class="loader-wrapper">

      <div class="n-loader">
        <svg class="n-circular" viewBox="25 25 50 50">
          <circle class="n-path" cx="50" cy="50" r="20" fill="none"
            stroke-width="4"
            stroke-miterlimit="10"
          />
        </svg>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.loader-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 8;
  background-color: hsla(0, 0%, 100%, .8);
  transition: all 240ms ease;
}

.n- {
  &loader {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: auto;
    min-width: 60px;
    min-height: 60px;
    transform: translateY(-50%);
  }

  &circular {
    animation: rotate 2s linear infinite;
    transform-origin: center center;
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
  }

  &path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke: #74B8FB;
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/

.n-modal-enter,
.n-modal-leave-active {
  transform: scale(0.9);
}
</style>
