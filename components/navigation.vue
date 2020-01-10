<template>
    <b-navbar>
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
          <b-navbar-item href="/people">
            PEOPLE
          </b-navbar-item>
          <b-navbar-item href="/tool-chest">
            TOOL CHEST
          </b-navbar-item>
          <b-navbar-item href="/quote">
            QUOTE
          </b-navbar-item>
        </template>

        <template slot="end">
          <b-navbar-item href="/">
            MY LIST
          </b-navbar-item>
        </template>
    </b-navbar>
</template>
