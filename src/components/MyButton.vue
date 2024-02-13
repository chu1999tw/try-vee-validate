<template>
  <button v-bind="attrs">
    <slot name="front-icon"></slot>
    <slot name="content"></slot>
    <slot name="back-icon"></slot>
  </button>
</template>

<script setup>
import {useAttrs} from 'vue'

const attrs = useAttrs()
</script>

<style scoped lang="scss">
// 按鈕主題色
@function themeColor($theme) {
  @if ($theme == 'primary') {
    @return #057afa;
  } @else if($theme == 'info') {
    @return #ccc;
  }
}
// 按鈕字體顏色
@function fontColor($theme) {
  @if ($theme == 'primary') {
    @return #fff;
  } @else {
    @return #333;
  }
}

%btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: filter 0.3s ease-in-out;
  position: relative;
  font-weight: 700;
  font-size: 16px;

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(80%);
  }

  &:focus {
    &:before {
      content: '';
      position: absolute;
      border-radius: 8px;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
    }
  }

  /* disabled 樣式*/
  &:disabled {
    cursor: not-allowed !important;
    background: #999;

    &:hover {
      filter: unset;
    }

    &:active {
      filter: unset;
    }
  }
}

button {
  @extend %btn;
  background-color: themeColor('primary');
  color: fontColor('primary');

  &:focus {
    &:before {
      border: 2px solid themeColor('primary');
    }
  }
}

button.info {
  @extend %btn;
  background-color: themeColor('info');
  color: fontColor('info');
  &:focus {
    &:before {
      border: 2px solid themeColor('info');
    }
  }
}
</style>
