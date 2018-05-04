<template lang="html">
  <div class="mu-mockups">

    <div class="mu-image" :style="backgroundImage"></div>

    <div class="mu-title">
      <a>{{ data.title }}</a>
    </div>

    <div class="mu-desc">
      by <a>{{ data.author }}</a>
    </div>

    <div class="mu-time">
      {{ $moment(data.timestamp).format('LL') }}
    </div>

  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    backgroundImage () {
      return `background-image: url(${
        require('~/assets/img/default.jpg')
      })`
    }
  }
}
</script>

<style lang="less" scoped>
@css-prefix         : mu-;

.@{css-prefix} {
  &mockups {
    display: inline-block;
    float: left;
    width: 320px;
    margin: 15px;
    overflow: hidden;
    border-radius: 2px;
    background-color: #FFF;
    box-shadow: 0 10px 20px fade(#363E4F, 5%);
    transition: transform 200ms ease, box-shadow 200ms ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px fade(#363E4F, 6%);
    }

    & > * {
      padding: 0 15px;
    }
  }

  &image {
    height: 260px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  &title {
    font-size: 16px;
    font-weight: 600;
    line-height: 40px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    text-transform: capitalize;

    a:hover {
      color: inherit;
      opacity: .8;
    }
  }

  &desc {
    font-size: 14px;
    padding-bottom: 10px;
    a {
      color: #2D8cF0;
      font-weight: 600;
    }
  }

  &time {
    font-size: 12px;
    font-weight: 100;
    margin-bottom: 15px;
  }
}
</style>
