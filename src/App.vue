<template>
  <v-app class="app">
    <template v-if="isInited">
      <snack/>
      <v-app-bar class="" color="primary" app dense dark>
<!--        <coin-icon left/>-->
        <v-icon left>mdi-diamond-stone</v-icon>
        <v-toolbar-title v-if="!isLoggedIn">extraTON</v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-if="isLoggedIn">
          <network-select/>
          <right-corner-menu/>
        </template>
      </v-app-bar>
      <v-main>
        <v-container>
          <global-error/>
          <back-button/>
          <router-view/>
        </v-container>
      </v-main>
    </template>
    <template v-else>
      <div class="app__preloader">
        <v-progress-circular class="app__preloader__item" color="primary" indeterminate/>
      </div>
    </template>
  </v-app>
</template>

<script>
import GlobalError from "@/components/GlobalError";
import BackButton from "@/components/BackButton";
import RightCornerMenu from "@/components/RightCornerMenu";
import NetworkSelect from "@/components/NetworkSelect";
import Snack from "@/components/Snack";
import {mapGetters, mapActions, mapState} from "vuex";
// import CoinIcon from "@/components/CoinIcon";

export default {
  components: {GlobalError, BackButton, RightCornerMenu, NetworkSelect, Snack/*, CoinIcon*/},
  created() {
    this.init();
  },
  computed: {
    ...mapGetters('wallet', [
      'isLoggedIn',
    ]),
    ...mapState('app', [
      'isInited',
    ]),
  },
  methods: {
    ...mapActions('app', [
      'init',
    ]),
  }
};
</script>

<style lang="scss">
html {
  overflow: hidden;
}
.app {
  width: 300px;
  height: 500px;
  //min-width: 300px;
  //min-height: 500px;
  //max-width: 300px;
  //max-height: 500px;

  &__preloader {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;

    &__item {
      margin: 0 auto;
    }
  }
}
</style>
