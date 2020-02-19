<template>
  <b-navbar
    :transparent="transparent"
  >
      <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <img
                  src="~/assets/img/nav_logo.png"
                  alt="Mud Bay Lumber Co. | Haines Alaska"
              >
          </b-navbar-item>
      </template>

      <template slot="start">
        <b-navbar-item href="/mainproducts">
          PRODUCTS
        </b-navbar-item>
        <b-navbar-item href="/process">
          PROCESS
        </b-navbar-item>
        <b-navbar-item href="/about">
          PEOPLE
        </b-navbar-item>
        <b-navbar-dropdown label="Tool Chest" hoverable arrowless>
            <b-navbar-item href="/calculator">
                Board Calculator
            </b-navbar-item>
            <b-navbar-item href="/sidinginstall">
                How To Install Siding
            </b-navbar-item>
            <b-navbar-item href="/boardcare">
                How To Care For Your Boards
            </b-navbar-item>
            <b-navbar-item href="/common_questions">
                Common Questions
            </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item href="/quote">
          QUOTE
        </b-navbar-item>
      </template>
  </b-navbar>
</template>

<script>
export default {
  data: () => ({
    transparent: true,
  })
}
</script>

<style lang="css" scoped>
</style>
